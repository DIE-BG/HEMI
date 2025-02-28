# Función de combinación lineal óptima ABSME 2023

# Definir la subyacente MAI óptima, calibrada con datos hasta 2019
optmai2023_absme = let 
    # Componentes metodologías MAI 
    maifns = [
        InflationCoreMai(MaiFP([0.0, 0.384589, 0.429569, 0.574328, 0.854354, 1.0])),
        InflationCoreMai(MaiF([0.0, 0.170386, 0.401727, 0.845245, 1.0])),
        InflationCoreMai(MaiG([0.0, 0.148357, 0.315087, 0.526742, 0.615879, 0.776466, 1.0])),
    ]

    # Ponderaciones MAI 
    mai_weights = Float32[0.504968, 0.324949, 0.170083]

    # Subyacente óptima MAI por método ABSME 
    optmai = CombinationFunction(
        maifns..., 
        mai_weights, 
        "MAI óptima ABSME 2023", 
        "MAIOPTABSME23",
    )

    optmai
end

# Definir la función de exclusión fija
optfx2023_absme = InflationFixedExclusionCPI{3}((
    [35, 30, 190, 36, 37, 40, 31, 104, 162], 
    [29, 31, 116, 39, 46, 40],
    []
))

# Definir la combinación óptima ABSME 2023, con componentes optimizadas hasta 2019
# y ponderadores ajustados con datos hasta 2021.
optabsme2023 = let 
    # Componentes de inflación subyacente 
    components = [
        InflationPercentileEq(0.7192383f0), 
        InflationPercentileWeighted(0.7022669f0), 
        InflationTrimmedMeanEq(33.4117f0, 93.7347f0), 
        InflationTrimmedMeanWeighted(32.1643f0, 93.2568f0), 
        InflationDynamicExclusion(1.0482f0, 3.4888f0), 
        optfx2023_absme,
        optmai2023_absme 
    ]

    # Ponderaciones de las demás componentes 
    absme_weights = Float32[
        0.112569, 
        0.111832, 
        0.217031, 
        0.137326, 
        0.130302, 
        0,
        0.290957
    ]

    # Subyacente óptima ABSME v2023
    optabsme2023 = CombinationFunction(
        components...,
        absme_weights, 
        "Subyacente óptima ABSME 2023",
        "OPTABSME23"
    )

    optabsme2023
end

# Límites de confianza al 97.5%
optabsme2023_ci = DataFrame(
    period = ["Base 2000", "Transición 2000-2010", "Base 2010"], 
    evalperiod = [GT_EVAL_B00, GT_EVAL_T0010, EvalPeriod(Date(2011, 12), Date(2023,12), "upd23")], 
    inf_limit = Float32[-0.995903, -0.669305, -0.478735], 
    sup_limit = Float32[1.02055, 0.643076, 0.491714]
)

@info "Definición de funciones óptimas ABSME" optmai2023_absme optfx2023_absme optabsme2023 optabsme2023_ci
