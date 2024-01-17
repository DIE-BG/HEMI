using DrWatson
@quickactivate "HEMI" 

using HEMI 

## Parallel processing
using Distributed
nprocs() < 5 && addprocs(4, exeflags="--project")
@everywhere using HEMI 

## Otras librerías
using DataFrames, Chain

# incluimos scripts auxiliares
include(scriptsdir("TOOLS","INFLFNS","rank.jl"))

# DEFINIMOS PATHS
loadpath = datadir("results","optim_comb_no_trans_2024","tray_infl","corr")

combination_savepath  = datadir("results","optim_comb_no_trans_2024","optim_combination","corr")

# DATOS A EVALUAR
data_loadpath = datadir("results", "no_trans", "data", "NOT_data.jld2")
NOT_GTDATA = load(data_loadpath, "NOT_GTDATA")
gtdata_eval = NOT_GTDATA[Date(2022, 12)]

# CARGAMOS Y ORDENAMOS DATAFRAMES SEGUN LA MEDIDA DE INFLACION
df_results = collect_results(loadpath)

#Ordenamos por medida de Inflacion
df_results.rank = rank.(df_results.inflfn)
sort!(df_results, :rank)

# PATHS DE TRAYECTORIAS
df_results.tray_path = map(
    x->joinpath(
        loadpath,
        "tray_infl",
        basename(x)
    ),
    df_results.path
)

# TRAYECTORIAS
tray_infl = mapreduce(hcat, df_results.tray_path) do path
    load(path, "tray_infl")
end

# DEFINIMOS "EL" PARAMETRO
resamplefn = df_results.resamplefn[1]
trendfn = df_results.trendfn[1]
paramfn = df_results.paramfn[1] #InflationTotalRebaseCPI(36, 3)
param = InflationParameter(paramfn, resamplefn, trendfn)
tray_infl_pob = param(gtdata_eval)



# FILTRAMOS EXCLUSION FIJA Y MAI
#functions = df_results.inflfn
#components_mask = [!(fn.f[1] isa InflationFixedExclusionCPI || fn.f[1] isa  InflationCoreMai) for fn in functions] 

# FILTRAMOS EXCLUSION FIJA para base 10 Y MAI para ambas bases
functions = df_results.inflfn
components_mask_b00 = [!(fn.f[1] isa  InflationCoreMai) for fn in functions] 
components_mask_b10 = [!(fn.f[1] isa InflationFixedExclusionCPI || fn.f[1] isa  InflationCoreMai) for fn in functions] 

#####################################
### COMBINACION OPTIMA BASE 2000 y 2010

# DEFINIMOS PERIODOS DE COMBINACION
combine_period_00 =  GT_EVAL_B00 
combine_period_10 =  GT_EVAL_B10

periods_filter_00 = eval_periods(gtdata_eval, combine_period_00)
periods_filter_10 = eval_periods(gtdata_eval, combine_period_10)

# CALCULAMOS LOS PESOS OPTIMOS
a_optim_00 =  metric_combination_weights(
    tray_infl[periods_filter_00, components_mask_b00, :],
    tray_infl_pob[periods_filter_00],
    metric = :corr,
    #w_start = [ 0.0001, 0.0, 0.9999, 0.0, 0.0, 0.0001] 
)
#a_optim_00 = [0.0256201, 0.157065, 0.372671, 0.216616,  0.192648, 0.0353789]


a_optim_10 =  metric_combination_weights(
    tray_infl[periods_filter_10, components_mask_b10, :],
    tray_infl_pob[periods_filter_10],
    metric = :corr,
    w_start = [ 0.01, 0.0, 0.99, 0.0, 0.0] 
)

# Insertamos el 0 en el vector de pesos en el lugar correspondiente a exclusion fija
#insert!(a_optim_00, findall(.!components_mask)[1],0)
insert!(a_optim_10, findall(.!components_mask_b10)[1],0)

###############################################################

#  tray_w = sum(a_optim_10' .*  tray_infl[periods_filter_10,:, :],dims=2)
#  metrics = eval_metrics(tray_w, tray_infl_pob[periods_filter_10])

#  trays_opts = collect_results(joinpath(combination_loadpath,"tray_infl")).tray_infl[1]

#  metrics2 = eval_metrics(trays_opts[periods_filter_10,:,:], tray_infl_pob[periods_filter_10])


###############################################################

# CREAMOS SUBYACENTES OPTIMAS PARA CADA BASE
optcorrb00 = CombinationFunction(
    functions[1:6]...,
    a_optim_00, 
    "Subyacente óptima CORR base 2000 No Transable",
    "SubOptCORR_NoTrans_B00"
)

optcorrb10 = CombinationFunction(
    functions[1:6]...,
    a_optim_10, 
    "Subyacente óptima CORR base 2010",
    "SubOptCorr_NoTrans_B10"
)

# EMPALMAMOS LA FUNCION PARA CREAR UNA SUBYACENTE OPTIMA
optcorr2024 = Splice(
    optcorrb00, 
    optcorrb10; 
    name = "Subyacente Óptima CORR 2024 No Transable",
    tag  = "SubOptCORR2024_NoTrans"
)


using PrettyTables
pretty_table(components(optcorr2024))
# ┌───────────────────────────────────────────────┬──────────────────────────┬─────────────────────────────────────────────┬──────────────────────────┐
# │ Subyacente óptima CORR base 2000 No Transable │ SubOptCORR_NoTrans_B00_w │            Subyacente óptima CORR base 2010 │ SubOptCorr_NoTrans_B10_w │
# │                                           Any │                      Any │                                         Any │                      Any │
# ├───────────────────────────────────────────────┼──────────────────────────┼─────────────────────────────────────────────┼──────────────────────────┤
# │                  Percentil equiponderado 89.0 │                0.0256201 │                Percentil equiponderado 86.0 │                 0.111993 │
# │                      Percentil ponderado 82.0 │                 0.157065 │                    Percentil ponderado 88.0 │                0.0520926 │
# │     Media Truncada Equiponderada (63.0, 96.0) │                 0.372671 │   Media Truncada Equiponderada (77.0, 93.0) │                 0.649841 │
# │         Media Truncada Ponderada (52.0, 97.0) │                 0.216616 │       Media Truncada Ponderada (78.0, 97.0) │                0.0312274 │
# │    Inflación de exclusión dinámica (0.8, 2.4) │                 0.192648 │  Inflación de exclusión dinámica (0.5, 1.7) │                 0.154828 │
# │   Exclusión fija de gastos básicos IPC (1, 2) │                0.0353789 │ Exclusión fija de gastos básicos IPC (1, 2) │                      0.0 │
# └───────────────────────────────────────────────┴──────────────────────────┴─────────────────────────────────────────────┴──────────────────────────┘




## GENERAMOS TRAYECTORIAS DE LA COMBINACION OPTIMA

# Creamos periodo de evaluacion para medidas hasta Dic 2020.
GT_EVAL_B2020 = EvalPeriod(Date(2011, 12), Date(2020, 12), "gt_b2020")

config = Dict(
    :paramfn => paramfn,
    :resamplefn => resamplefn,
    :trendfn => trendfn,
    :traindate => Date(2022, 12),
    :nsim => 125_000,
    :evalperiods => (CompletePeriod(), GT_EVAL_B00, GT_EVAL_B10, GT_EVAL_T0010, GT_EVAL_B2020),
    :inflfn => optcorr2024
)|> dict_list

run_batch(gtdata_eval, config, combination_savepath; savetrajectories = true)

