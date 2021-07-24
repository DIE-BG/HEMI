"""
    InflationFunctions

Funciones para computar estimadores muestrales de inflación. 
"""
module InflationFunctions

    using CPIDataBase
    using Statistics
    using StatsBase
    using SparseArrays
    using RecipesBase

    ## Métodos a extender 
    import CPIDataBase: measure_name, measure_tag

    
    ## Media simple interanual 
    export InflationSimpleMean
    include("simple_mean.jl")

    ## Percentiles equiponderados
    export InflationPercentileEq
    include("InflationPercentileEq.jl")

    ## Percentiles ponderados
    export InflationPercentileWeighted
    include("InflationPercentileWeighted.jl")

    ## Variación interanual IPC con cambio de base sintético 
    export InflationTotalRebaseCPI
    include("total_cpi_rebase.jl")

    ## Exclusión Fija de gastos básicos
    export InflationFixedExclusionCPI
    include("InflationFixedExclusionCPI.jl")


    ## Subyacente MAI (muestra ampliada implícitamente)
    export V
    export vposition, renormalize!, renorm_g_glp, renorm_f_flp
    export TransversalDistr, ObservationsDistr, WeightsDistr, AccumulatedDistr
    export MaiG, MaiF
    export InflationCoreMai
    include("mai/TransversalDistr.jl")
    include("mai/renormalize.jl")
    include("mai/InflationCoreMai.jl")

    ## Desarrollo 
    include("dev/totalcpi_methods.jl")

end
