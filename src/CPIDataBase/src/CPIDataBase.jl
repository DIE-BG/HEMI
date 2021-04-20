"""
    CPIDataBase

Librería base para tipos y funcionalidad básica para manejo de datos del IPC a nivel desagregado de gastos básicos
"""
module CPIDataBase

    using Dates
    using DataFrames

    # Export types
    export IndexCPIBase, VarCPIBase, FullCPIBase, CountryStructure

    # Export functions
    export capitalize, varinterm, varinteran, 
        capitalize!, varinterm!, varinteran!, 
        periods

    # Export types for implement new inflation functions
    export InflationFunction, EnsembleInflationFunction
    export EnsembleFunction, CombinationFunction
    export num_measures, weights, measure_names

    # Export types needed to specify results
    export CPIIndex, CPIVarInterm

    # Basic inflation function
    export TotalCPI

    # Definición de tipos para bases del IPC
    include("types.jl")

    # Basic operations
    include("capitalize.jl")
    include("varinterm.jl")
    include("varinteran.jl")

    # Basic inflation measures structure
    include("inflation.jl")
    include("ensemble.jl")

    # Resample functions
    include("resample.jl")

end # module
