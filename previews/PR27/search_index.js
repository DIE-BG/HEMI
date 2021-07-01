var documenterSearchIndex = {"docs":
[{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"CurrentModule = HEMI","category":"page"},{"location":"modules/HEMI/#HEMI","page":"HEMI","title":"HEMI","text":"","category":"section"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"Modules = [HEMI]","category":"page"},{"location":"modules/HEMI/#HEMI.HEMI","page":"HEMI","title":"HEMI.HEMI","text":"HEMI\n\nMódulo envolvente que carga los paquetes y datos utilizados en todo el proyecto.\n\n\n\n\n\n","category":"module"},{"location":"modules/HEMI/#Utilización-en-scripts-de-evaluación","page":"HEMI","title":"Utilización en scripts de evaluación","text":"","category":"section"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"Este módulo se utiliza para cargar los paquetes principales utilizados en la evaluación de medidas de inflación. ","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"Si ya se ha ejecutado el script de carga de datos scripts/load_data.jl, este módulo carga los datos del IPC de Guatemala en el objeto gtdata, el cual es un objeto de tipo UniformCountryStructure. Provee además los objetos gt00 y gt10, los cuales son de tipo VarCPIBase. ","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"Como se describe en la documentación de DrWatson, existen proyectos en los que se deben cargar datos y funciones al inicio de cualquier archivo del proyecto. La estructura del proyecto en Julia permite englobar los paquetes más importantes en un módulo con el mismo nombre del proyecto. Por lo tanto, podemos utilizar el siguiente código al inicio de cada script para activar el proyecto y cargar los paquetes principales: ","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"using DrWatson \n@quickactivate :HEMI\n\n## Script de evaluación o pruebas\n# ...","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"el cual es equivalente a ","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"using DrWatson \n@quickactivate \"HEMI\"\nusing HEMI\n\n## Script de evaluación o pruebas\n# ...","category":"page"},{"location":"modules/HEMI/#Ejemplo-para-computar-trayectoria-de-inflación","page":"HEMI","title":"Ejemplo para computar trayectoria de inflación","text":"","category":"section"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"Ejecutar el archivo scripts/load_data.jl para generar el archivo binario de datos en formato JLD2. \nCrear un archivo de prueba en scripts llamado testHEMI.jl e incluir el siguiente código para computar la variación interanual del IPC.","category":"page"},{"location":"modules/HEMI/","page":"HEMI","title":"HEMI","text":"## Activar el entorno del proyecto y cargar los datos\nusing DrWatson\n@quickactivate :HEMI\n\n## Utilizar la función de inflación InflationTotalCPI sobre gtdata\ntotalfn = InflationTotalCPI()\ntraj_infl = totalfn(gtdata)","category":"page"},{"location":"Inicio/#Inicio","page":"Inicio","title":"Inicio","text":"","category":"section"},{"location":"Inicio/","page":"Inicio","title":"Inicio","text":"Para empezar a utilizar este proyecto, se debe clonar el repositorio e instanciar el proyecto. Para esto, debemos abrir un REPL de Julia y ejecutar: ","category":"page"},{"location":"Inicio/","page":"Inicio","title":"Inicio","text":"julia> using Pkg\njulia> Pkg.add(\"DrWatson\") \njulia> Pkg.activate(\"ruta/hacia/el/proyecto\")\njulia> Pkg.instantiate()","category":"page"},{"location":"Inicio/","page":"Inicio","title":"Inicio","text":"Notar que esto instala DrWatson en el entorno global de Julia, lo que permite utilizar la macro @quickactivate para activar el entorno del proyecto. ","category":"page"},{"location":"Inicio/","page":"Inicio","title":"Inicio","text":"Una vez el proyecto se haya instanciado correctamente, podemos ejecutar un script de prueba. Por ejemplo, podemos ejecutar el archivo scripts/intro.jl o bien, crear uno nuevo siguiendo las instrucciones en Ejemplo para computar trayectoria de inflación.","category":"page"},{"location":"modules/InflationEvalTools/","page":"InflationEvalTools","title":"InflationEvalTools","text":"CurrentModule = InflationEvalTools","category":"page"},{"location":"modules/InflationEvalTools/#InflationEvalTools","page":"InflationEvalTools","title":"InflationEvalTools","text":"","category":"section"},{"location":"modules/InflationEvalTools/","page":"InflationEvalTools","title":"InflationEvalTools","text":"Modules = [InflationEvalTools]","category":"page"},{"location":"modules/InflationEvalTools/","page":"InflationEvalTools","title":"InflationEvalTools","text":"Modules = [InflationEvalTools]","category":"page"},{"location":"modules/InflationEvalTools/#InflationEvalTools.InflationEvalTools","page":"InflationEvalTools","title":"InflationEvalTools.InflationEvalTools","text":"InflationEvalTools\n\nTipos, funciones y demás utilidades de simulación para evaluación de medidas inflación.\n\n\n\n\n\n","category":"module"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ResampleFunction","page":"InflationEvalTools","title":"InflationEvalTools.ResampleFunction","text":"abstract type ResampleFunction <: Function end\n\nTipo abstracto para funciones de remuestreo. Cada función debe extender como  mínimo el método\n\nresamplefn(vmat::AbstractMatrix, rng)::Matrix \n\npara remuestrear un CountryStructure con las funciones definidas arriba. \n\nOpcionalmente, si se desea modificar el comportamiento específico de cada función de remuestreo, se deben extender los siguientes métodos: \n\nfunction (resamplefn::ResampleFunction)(cs::CountryStructure, rng = Random.GLOBAL_RNG)\nfunction (resamplefn::ResampleFunction)(base::VarCPIBase, rng = Random.GLOBAL_RNG)\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ResampleFunction-2","page":"InflationEvalTools","title":"InflationEvalTools.ResampleFunction","text":"function (resamplefn::ResampleFunction)(base::VarCPIBase, rng = Random.GLOBAL_RNG)\n\nDefine el comportamiento general de función de remuestreo sobre VarCPIBase.  Este método requiere una implementación específica del método sobre el par (AbstractMatrix, rng).  Considera que el método de remuestreo podría extender los períodos de la serie de tiempo y  ajusta las fechas apropiadamente.\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ResampleFunction-3","page":"InflationEvalTools","title":"InflationEvalTools.ResampleFunction","text":"function (resamplefn::ResampleFunction)(cs::CountryStructure, rng = Random.GLOBAL_RNG)\n\nDefine el comportamiento general de función de remuestreo sobre CountryStructure.  Se remuestrea cada una de las bases del campo base utilizando el método para objetos VarCPIBase y se devuelve un nuevo CountryStructure.\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ResampleScrambleVarMonths","page":"InflationEvalTools","title":"InflationEvalTools.ResampleScrambleVarMonths","text":"ResampleScrambleVarMonths\n\nAlias para InflationEvalTools.ScrambleVarMonths\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ResampleScrambleVarMonths-2","page":"InflationEvalTools","title":"InflationEvalTools.ResampleScrambleVarMonths","text":"scramblevar(vmat::AbstractMatrix, rng = Random.GLOBAL_RNG)\n\nDefine cómo remuestrear matrices con las series de tiempo en las columnas. Utiliza  la función interna scramblevar.\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.ScrambleVarMonths","page":"InflationEvalTools","title":"InflationEvalTools.ScrambleVarMonths","text":"struct ScrambleVarMonths <: ResampleFunction end\n\nDefine una función de remuestreo para remuestrear las series de tiempo por los mismos meses de ocurrencia. El muestreo se realiza de manera independiente para  serie de tiempo en las columnas de una matriz. \n\n\n\n\n\n","category":"type"},{"location":"modules/InflationEvalTools/#InflationEvalTools.apply_trend-Tuple{CountryStructure, AbstractVector{T} where T}","page":"InflationEvalTools","title":"InflationEvalTools.apply_trend","text":"apply_trend(cs::CountryStructure, trend::AbstractVector)\n\nFunción de aplicación de tendencia sobre las bases VarCPIBase del CountryStructure. El vector trend debe ser por lo menos del largo de periods(cs). \n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.get_param_function-Tuple{InflationEvalTools.ResampleFunction}","page":"InflationEvalTools","title":"InflationEvalTools.get_param_function","text":"get_param_function(::ResampleFunction)\n\nFunción para obtener de una función de remuestreo la función que permite obtener las variaciones intermensuales promedio (o paramétricas), que finalmente sirven para construir la trayectoria paramétrica de inflación de la metodología de remuestreo. \n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.method_name-Tuple{InflationEvalTools.ResampleFunction}","page":"InflationEvalTools","title":"InflationEvalTools.method_name","text":"method_name(resamplefn::ResampleFunction)\n\nFunción para obtener el nombre del método de remuestreo.\n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.param_gsbb_mod-Tuple{CountryStructure}","page":"InflationEvalTools","title":"InflationEvalTools.param_gsbb_mod","text":"param_gsbb_mod(cs::CountryStructure)\n\nObtiene un CountryStructure paramétrico. \n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.param_gsbb_mod-Tuple{VarCPIBase}","page":"InflationEvalTools","title":"InflationEvalTools.param_gsbb_mod","text":"param_gsbb_mod(base::VarCPIBase)\n\nObtiene la matriz de variaciones intermensuales paramétricas para la metodología de remuestreo de Generalized Seasonal Block Bootstrap modificada que extiende las observaciones a 300 períodos. Devuelve una base de tipo VarCPIBase con las variaciones intermensuales paramétricas. Actualmente funciona solamente si base tiene 120 observaciones.\n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.param_sbb-Tuple{CountryStructure}","page":"InflationEvalTools","title":"InflationEvalTools.param_sbb","text":"param_sbb(cs::CountryStructure)\n\nObtiene un CountryStructure paramétrico.  Véase también param_sbb.\n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.param_sbb-Tuple{VarCPIBase}","page":"InflationEvalTools","title":"InflationEvalTools.param_sbb","text":"param_sbb(base::VarCPIBase)\n\nObtiene la matriz de variaciones intermensuales paramétricas para la metodología de remuestreo de Stationary Block Bootstrap. Devuelve una base de tipo VarCPIBase con las variaciones intermensuales promedio de los mismos meses de ocurrencia (también llamadas variaciones intermensuales paramétricas). \n\nEsta definición también aplica a otras metodologías que utilicen como variaciones  intermensuales paramétricas los promedios en los mismos meses de ocurrencia. \n\n\n\n\n\n","category":"method"},{"location":"modules/InflationEvalTools/#InflationEvalTools.scramblevar","page":"InflationEvalTools","title":"InflationEvalTools.scramblevar","text":"scramblevar(vmat::AbstractMatrix, rng = Random.GLOBAL_RNG)\n\nCopy and scramble every column of matrix vmat by months.\n\n\n\n\n\n","category":"function"},{"location":"modules/InflationEvalTools/#InflationEvalTools.scramblevar!","page":"InflationEvalTools","title":"InflationEvalTools.scramblevar!","text":"scramblevar!(vmat::AbstractMatrix, rng = Random.GLOBAL_RNG)\n\nSamples in-place every column of matrix vmat by months.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/","page":"CPIDataBase","title":"CPIDataBase","text":"CurrentModule = CPIDataBase","category":"page"},{"location":"modules/CPIDataBase/#CPIDataBase","page":"CPIDataBase","title":"CPIDataBase","text":"","category":"section"},{"location":"modules/CPIDataBase/","page":"CPIDataBase","title":"CPIDataBase","text":"Modules = [CPIDataBase, CPIDataBase.TestHelpers]","category":"page"},{"location":"modules/CPIDataBase/","page":"CPIDataBase","title":"CPIDataBase","text":"Modules = [CPIDataBase, CPIDataBase.TestHelpers]","category":"page"},{"location":"modules/CPIDataBase/#CPIDataBase.CPIDataBase","page":"CPIDataBase","title":"CPIDataBase.CPIDataBase","text":"CPIDataBase\n\nLibrería base para tipos y funcionalidad básica para manejo de datos del IPC a nivel desagregado de gastos básicos\n\n\n\n\n\n","category":"module"},{"location":"modules/CPIDataBase/#CPIDataBase.CountryStructure","page":"CPIDataBase","title":"CPIDataBase.CountryStructure","text":"CountryStructure{N, T <: AbstractFloat}\n\nTipo abstracto que representa el conjunto de bases del IPC de un país.\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.FullCPIBase","page":"CPIDataBase","title":"CPIDataBase.FullCPIBase","text":"FullCPIBase{T, B} <: AbstractCPIBase{T}\n\nContenedor completo para datos del IPC de un país. Se representa por:\n\nMatriz de índices de precios ipc que incluye la fila con los índices del númbero base. \nMatriz de variaciones intermensuales v. En las filas contiene los períodos y en las columnas contiene los gastos básicos.\nVector de ponderaciones w de los gastos básicos.\nFechas correspondientes fechas (por meses).\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.FullCPIBase-Tuple{DataFrames.DataFrame, DataFrames.DataFrame}","page":"CPIDataBase","title":"CPIDataBase.FullCPIBase","text":"FullCPIBase(df::DataFrame, gb::DataFrame)\n\nEste constructor devuelve una estructura FullCPIBase a partir del DataFrame  de índices de precios df, que contiene en las columnas las categorías o gastos  básicos del IPC y en las filas los períodos por meses. Las ponderaciones se obtienen  de la estructura gb, en la columna denominada :Ponderacion.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.IndexCPIBase","page":"CPIDataBase","title":"CPIDataBase.IndexCPIBase","text":"IndexCPIBase{T, B} <: AbstractCPIBase{T}\n\nContenedor genérico de índices de precios del IPC de un país. Se representa por:\n\nMatriz de índices de precios ipc que incluye la fila con los índices del númbero base. \nVector de ponderaciones w de los gastos básicos.\nFechas correspondientes fechas (por meses).\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.IndexCPIBase-Tuple{DataFrames.DataFrame, DataFrames.DataFrame}","page":"CPIDataBase","title":"CPIDataBase.IndexCPIBase","text":"IndexCPIBase(df::DataFrame, gb::DataFrame)\n\nEste constructor devuelve una estructura IndexCPIBase a partir del DataFrame  de índices de precios df, que contiene en las columnas las categorías o gastos  básicos del IPC y en las filas los períodos por meses. Las ponderaciones se obtienen  de la estructura gb, en la columna denominada :Ponderacion.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.MixedCountryStructure","page":"CPIDataBase","title":"CPIDataBase.MixedCountryStructure","text":"MixedCountryStructure{N, T} <: CountryStructure{N, T}\n\nEstructura que representa el conjunto de bases del IPC de un país,  posee el campo base, que es una tupla de la estructura VarCPIBase, cada una  con su propio tipo de índices base B. Este tipo es una colección de un tipo abstracto.\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.UniformCountryStructure","page":"CPIDataBase","title":"CPIDataBase.UniformCountryStructure","text":"UniformCountryStructure{N, T, B} <: CountryStructure{N, T}\n\nEstructura que representa el conjunto de bases del IPC de un país,  posee el campo base, que es una tupla de la estructura VarCPIBase. Todas las bases deben tener el mismo tipo de índice base.\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.VarCPIBase","page":"CPIDataBase","title":"CPIDataBase.VarCPIBase","text":"VarCPIBase{T, B} <: AbstractCPIBase{T}\n\nContenedor genérico para de variaciones intermensuales de índices de precios del IPC de un país. Se representa por:\n\nMatriz de variaciones intermensuales v. En las filas contiene los períodos y en las columnas contiene los gastos básicos.\nVector de ponderaciones w de los gastos básicos.\nFechas correspondientes fechas (por meses).\n\n\n\n\n\n","category":"type"},{"location":"modules/CPIDataBase/#CPIDataBase.VarCPIBase-Tuple{DataFrames.DataFrame, DataFrames.DataFrame}","page":"CPIDataBase","title":"CPIDataBase.VarCPIBase","text":"VarCPIBase(df::DataFrame, gb::DataFrame)\n\nEste constructor devuelve una estructura VarCPIBase a partir del DataFrame  de índices de precios df, que contiene en las columnas las categorías o gastos  básicos del IPC y en las filas los períodos por meses. Las ponderaciones se obtienen  de la estructura gb, en la columna denominada :Ponderacion.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#Base.eltype-Union{Tuple{CountryStructure{N, T}}, Tuple{T}, Tuple{N}} where {N, T}","page":"CPIDataBase","title":"Base.eltype","text":"eltype(::CountryStructure{N, T})\n\nTipo de dato de punto flotante del contenedor de la estructura de país CountryStructure.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#Base.getindex-Tuple{CountryStructure, Date, Date}","page":"CPIDataBase","title":"Base.getindex","text":"getindex(cst::CountryStructure, startdate::Date, finaldate::Date)\n\nDevuelve una copia del CountryStructure con las bases modificadas para tener observaciones entre las fechas indicada por startdate y finaldate.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#Base.getindex-Tuple{CountryStructure, Date}","page":"CPIDataBase","title":"Base.getindex","text":"getindex(cst::CountryStructure, finaldate::Date)\n\nDevuelve una copia del CountryStructure hasta la fecha indicada por finaldate.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#Base.getindex-Tuple{CountryStructure, Int64}","page":"CPIDataBase","title":"Base.getindex","text":"getindex(cst::CountryStructure, i::Int)\n\nDevuelve la base número i de un contenedor CountryStructure.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize","page":"CPIDataBase","title":"CPIDataBase.capitalize","text":"capitalize(v::AbstractVector, base_index::Real = 100)\n\nFunction to chain a vector of price changes with an index starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize-2","page":"CPIDataBase","title":"CPIDataBase.capitalize","text":"capitalize(vmat::AbstractMatrix, base_index::Real = 100)\n\nFunction to chain a matrix of price changes with an index starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize!","page":"CPIDataBase","title":"CPIDataBase.capitalize!","text":"capitalize!(vmat::AbstractMatrix, base_index = 100)\n\nFunction to chain a matrix of price changes in place with an index starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize!-Tuple{AbstractVector{T} where T, AbstractVector{T} where T, Real}","page":"CPIDataBase","title":"CPIDataBase.capitalize!","text":"capitalize!(idx:: AbstractVector, v::AbstractVector, base_index::Real)\n\nFunction to chain a vector of price changes in vector idx with an index starting with base_index.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize-Tuple{AbstractMatrix{T} where T, AbstractVector{T} where T}","page":"CPIDataBase","title":"CPIDataBase.capitalize","text":"capitalize(vmat::AbstractMatrix, base_index::AbstractVector)\n\nFunction to chain a matrix of price changes with an index vector starting with base_index. base_index needs to have the same number of elements as the columns of vmat.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize-Tuple{VarCPIBase}","page":"CPIDataBase","title":"CPIDataBase.capitalize","text":"capitalize(base::VarCPIBase)\n\nThis returns a new instance (copy) of type IndexCPIBase from a VarCPIBase.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.capitalize_addbase","page":"CPIDataBase","title":"CPIDataBase.capitalize_addbase","text":"capitalize_addbase(vmat::AbstractMatrix, base_index = 100)\n\nFunction to chain a matrix of price changes with an index starting with base_index. This function adds the base index as the first row of the returned matrix.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.getdates-Tuple{Date, AbstractMatrix{T} where T}","page":"CPIDataBase","title":"CPIDataBase.getdates","text":"getdates(startdate::Date, vmat::AbstractMatrix)\n\nObtiene un rango de fechas a partir de una fecha inicial startdate y la cantidad de períodos en la matriz de variaciones intermensuales vmat.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.getdates-Tuple{Date, Int64}","page":"CPIDataBase","title":"CPIDataBase.getdates","text":"getdates(startdate::Date, periods::Int)\n\nObtiene un rango de fechas a partir de una fecha inicial startdate y la cantidad de períodos de una matriz de variaciones intermensuales \n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.getunionalltype-Tuple{MixedCountryStructure}","page":"CPIDataBase","title":"CPIDataBase.getunionalltype","text":"getunionalltype(::MixedCountryStructure)\n\nDevuelve el tipo MixedCountryStructure. Utilizado al llamar getunionalltype sobre un CountryStructure para obtener el tipo concreto UnionAll.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.getunionalltype-Tuple{UniformCountryStructure}","page":"CPIDataBase","title":"CPIDataBase.getunionalltype","text":"getunionalltype(::UniformCountryStructure)\n\nDevuelve el tipo UniformCountryStructure. Utilizado al llamar getunionalltype sobre un CountryStructure para obtener el tipo concreto UnionAll. \n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.infl_dates-Tuple{CountryStructure}","page":"CPIDataBase","title":"CPIDataBase.infl_dates","text":"infl_periods(cst::CountryStructure)\n\nFechas correspondientes a la trayectorias de inflación computadas a partir un CountryStructure.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.infl_periods-Tuple{CountryStructure}","page":"CPIDataBase","title":"CPIDataBase.infl_periods","text":"infl_periods(cst::CountryStructure)\n\nComputa el número de períodos de inflación de la estructura de país. Corresponde al número de observaciones intermensuales menos las primeras 11 observaciones de la primera base del IPC.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.periods-Tuple{CountryStructure}","page":"CPIDataBase","title":"CPIDataBase.periods","text":"periods(cst::CountryStructure)\n\nComputa el número de períodos (meses) en las bases de variaciones intermensuales de la estructura de país. \n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.periods-Tuple{VarCPIBase}","page":"CPIDataBase","title":"CPIDataBase.periods","text":"periods(base::VarCPIBase)\n\nComputa el número de períodos (meses) en las base de variaciones intermensuales. \n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.varinteran","page":"CPIDataBase","title":"CPIDataBase.varinteran","text":"varinteran(idx::AbstractVector, base_index::Real = 100)\n\nFunction to get a vector of annual price changes from a price index vector starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinteran-2","page":"CPIDataBase","title":"CPIDataBase.varinteran","text":"varinteran(cpimat::AbstractMatrix, base_index::Real = 100)\n\nFunction to get a matrix of annual price changes from a price index matrix starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinteran!","page":"CPIDataBase","title":"CPIDataBase.varinteran!","text":"varinteran!(idx, base_index::Real = 100)\n\nCompute annual price changes of idx index vector in place, using base_index as starting point. Fills observations 1 to 11 with NaN values.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinteran!-2","page":"CPIDataBase","title":"CPIDataBase.varinteran!","text":"varinteran!(v, idx, base_index::Real = 100)\n\nFill v vector of annual price changes of idx index vector using base_index as starting point. Usually v has 11 observations less than idx.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinteran-Tuple{AbstractMatrix{T} where T, AbstractVector{T} where T}","page":"CPIDataBase","title":"CPIDataBase.varinteran","text":"varinteran(cpimat::AbstractMatrix, base_index::AbstractVector)\n\nFunction to get a matrix of annual price changes from a price index matrix starting with vector base_index.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm","page":"CPIDataBase","title":"CPIDataBase.varinterm","text":"varinterm(idx::AbstractVector, base_index::Real = 100)\n\nFunction to get a vector of price changes from a price index vector starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm-2","page":"CPIDataBase","title":"CPIDataBase.varinterm","text":"varinterm(cpimat::AbstractMatrix, base_index::Real = 100)\n\nFunction to get a matrix of price changes from a price index matrix starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm!","page":"CPIDataBase","title":"CPIDataBase.varinterm!","text":"varinterm!(v, idx, base_index::Real = 100)\n\nFill v vector of price changes of idx vector using base_index as starting point.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm!-2","page":"CPIDataBase","title":"CPIDataBase.varinterm!","text":"varinterm!(cpimat::AbstractMatrix, base_index::Real = 100)\n\nFunction to get a matrix of price changes from a price index matrix starting with base_index.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm-Tuple{AbstractMatrix{T} where T, AbstractVector{T} where T}","page":"CPIDataBase","title":"CPIDataBase.varinterm","text":"varinterm(cpimat::AbstractMatrix, base_index::AbstractVector)\n\nFunction to get a matrix of price changes from a price index matrix starting with vector base_index.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.varinterm-Tuple{IndexCPIBase}","page":"CPIDataBase","title":"CPIDataBase.varinterm","text":"varinterm(base::IndexCPIBase)\n\nThis returns a new instance (copy) of type VarCPIBase from an IndexCPIBase.\n\n\n\n\n\n","category":"method"},{"location":"modules/CPIDataBase/#CPIDataBase.TestHelpers.getbasedates","page":"CPIDataBase","title":"CPIDataBase.TestHelpers.getbasedates","text":"getbasedates(vmat, startdate=Date(2000, 12))\n\nFunción para generar fechas a partir de matriz de variaciones intermensuales\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.TestHelpers.getrandomweights","page":"CPIDataBase","title":"CPIDataBase.TestHelpers.getrandomweights","text":"getrandomweights(T=Float32, G=218)\n\nFunción para generar pesos aleatorios \n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.TestHelpers.getzerobase","page":"CPIDataBase","title":"CPIDataBase.TestHelpers.getzerobase","text":"get_zero_base(T_type=Float32, G=218, T_periods=120, startdate=Date(2001,1), baseindex=100*one(T_type))\n\nFunción para obtener base de tipo VarCPIBase con variaciones intermensuales iguales a cero.\n\n\n\n\n\n","category":"function"},{"location":"modules/CPIDataBase/#CPIDataBase.TestHelpers.getzerocountryst","page":"CPIDataBase","title":"CPIDataBase.TestHelpers.getzerocountryst","text":"getzerocountryst(T_type=Float32)\n\nObtiene un UniformCountryStructure cuyas variaciones intermensuales son todas iguales a cero en la configuración de períodos del IPC de Guatemala.\n\n\n\n\n\n","category":"function"},{"location":"guides/Guia-rapida/#Guía-rápida","page":"Guía rápida","title":"Guía rápida","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"En esta sección se documentan instrucciones generales para utilizar el proyecto y agregar nuevas funcionalidades. ","category":"page"},{"location":"guides/Guia-rapida/#Cómo-instanciar-el-proyecto-en-mi-computadora","page":"Guía rápida","title":"Cómo instanciar el proyecto en mi computadora","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Seguir las instrucciones en Inicio. Al abrir el directorio HEMI/ en Visual Studio Code, el proyecto se activa automáticamente, por lo que solamente es necesario instanciar el proyecto y cargar los datos para empezar a trabajar. ","category":"page"},{"location":"guides/Guia-rapida/#Qué-son-los-módulos","page":"Guía rápida","title":"Qué son los módulos","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Los módulos permiten empaquetar funciones y datos para ser cargados en un archivo con la instrucción using de Julia. En este proyecto, los módulos más importantes son: ","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"HEMI: es un módulo envolvente (wrapper), que carga los paquetes más utilizados en el proyecto. Actualmente carga y reexporta los paquetes Dates, CPIDataBase, Statistics y JLD2. Además, carga y exporta los datos del IPC en las variables gt00, gt10 y gtdata. Revisar el archivo src/HEMI.jl.\nCPIDataBase: este módulo provee los tipos y su funcionalidad básica para manejar los datos del IPC. También define la interfaz principal para extender y crear nuevas funciones de inflación. \nInflationFunctions: este módulo extiende la funcionalidad de CPIDataBase y exporta nuevas metodologías de cómputo de inflación interanual. \nInflationEvalTools: este módulo contiene los tipos y funciones necesarias para definir los ejercicios de simulación y evaluación estadística de las medidas de inflación. ","category":"page"},{"location":"guides/Guia-rapida/#Cómo-cargar-los-datos","page":"Guía rápida","title":"Cómo cargar los datos","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Ejecutar el archivo scripts/load_data.jl para generar el archivo binario de datos en formato JLD2. Este programa se debe ejecutar una sola vez o cada vez que se desean actualizar los datos. Este programa genera los archivos gtdata.jld2 y gtdata32.jld2. El último corresponde a los datos con precisión de punto flotante de 32 bits, cuya precisión es suficiente para representar los valores de las medidas de inflación y ayuda a generar los cálculos más rápidamente. ","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"El archivo gtdata32.jld2 es cargado automáticamente al utilizar el módulo HEMI, ejecutando las siguientes instrucciones: ","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"## Activar el entorno del proyecto y ejecuta `using HEMI` para cargar los datos\nusing DrWatson\n@quickactivate :HEMI\n\n# Variables exportadas por el módulo HEMI para utilizar en el script\ngtdata\ngt00\ngt10","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Este módulo carga los datos del IPC de Guatemala en el objeto gtdata, el cual es un objeto de tipo UniformCountryStructure. Provee además los objetos gt00 y gt10, los cuales son de tipo VarCPIBase.","category":"page"},{"location":"guides/Guia-rapida/#Cómo-generar-un-nuevo-script-para-jugar-con-el-proyecto","page":"Guía rápida","title":"Cómo generar un nuevo script para jugar con el proyecto","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Se debe crear un script en el directorio scripts. Por ejemplo, scripts/test_funcionalidad.jl. \nActivar el proyecto y cargar los datos. Véase la sección Utilización en scripts de evaluación.","category":"page"},{"location":"guides/Guia-rapida/#Cómo-computar-una-trayectoria-de-inflación-con-los-datos","page":"Guía rápida","title":"Cómo computar una trayectoria de inflación con los datos","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Crear un archivo de prueba en scripts llamado testHEMI.jl e incluir el siguiente código para computar la variación interanual del IPC.","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"## Activar el entorno del proyecto y cargar los datos\nusing DrWatson\n@quickactivate :HEMI\n\n## Utilizar la función de inflación InflationTotalCPI sobre gtdata\ntotalfn = InflationTotalCPI()\ntraj_infl = totalfn(gtdata)","category":"page"},{"location":"guides/Guia-rapida/#Cómo-crear-una-función-de-inflación","page":"Guía rápida","title":"Cómo crear una función de inflación","text":"","category":"section"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Para crear una nueva función de inflación en InflationFunctions: ","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Crear un tipo concreto que sea subtipo de InflationFunction. Como convención, hemos escogido utilizar el prefijo Inflation como parte del nombre del tipo y escribir este en inglés. Por ejemplo InflationNewMethodology.\nExtender el método measure_name para el nuevo tipo.\nExtender el método que opera sobre objetos VarCPIBase. \nDependiendo de la medida de la cual se trate, podría ser necesario redefinir el comportamiento del método con argumentos (::CountryStructure, ::CPIVarInterm). Esto podría ser necesario si la función de inflación utiliza sus parámetros de manera diferente para cada base de tipo VarCPIBase, por ejemplo, en la medida de inflación subyacente MAI o en la medida de exclusión fija de gastos básicos. \nSe debe incluir el archivo de código fuente con la nueva función de inflación y agregar la sentencia export en el archivo principal del módulo: InflationFunctions.jl.","category":"page"},{"location":"guides/Guia-rapida/","page":"Guía rápida","title":"Guía rápida","text":"Para agregar las pruebas sobre el nuevo tipo, el script principal se encuentra en InflationFunctions/test/runtests.jl. Ver el ejemplo con la función InflationSimpleMean.","category":"page"},{"location":"modules/API/#API","page":"API","title":"API","text":"","category":"section"},{"location":"modules/API/","page":"API","title":"API","text":"A continuación se encuentra la lista de funciones de los paquetes principales utilizados para evaluar medidas de inflación. ","category":"page"},{"location":"modules/API/","page":"API","title":"API","text":"Modules = [CPIDataBase, CPIDataBase.TestHelpers, InflationFunctions, InflationEvalTools]","category":"page"},{"location":"modules/InflationFunctions/","page":"InflationFunctions","title":"InflationFunctions","text":"CurrentModule = InflationFunctions","category":"page"},{"location":"modules/InflationFunctions/#InflationFunctions","page":"InflationFunctions","title":"InflationFunctions","text":"","category":"section"},{"location":"modules/InflationFunctions/","page":"InflationFunctions","title":"InflationFunctions","text":"Modules = [InflationFunctions]","category":"page"},{"location":"modules/InflationFunctions/","page":"InflationFunctions","title":"InflationFunctions","text":"Modules = [InflationFunctions]","category":"page"},{"location":"modules/InflationFunctions/#InflationFunctions.InflationFunctions","page":"InflationFunctions","title":"InflationFunctions.InflationFunctions","text":"InflationFunctions\n\nFunciones para computar estimadores muestrales de inflación. \n\n\n\n\n\n","category":"module"},{"location":"modules/InflationFunctions/#InflationFunctions.InflationSimpleMean","page":"InflationFunctions","title":"InflationFunctions.InflationSimpleMean","text":"InflationSimpleMean <: InflationFunction\n\nFunción de inflación para computar la media simple.\n\n\n\n\n\n","category":"type"},{"location":"modules/InflationFunctions/#InflationFunctions.InflationSimpleMean-Tuple{VarCPIBase}","page":"InflationFunctions","title":"InflationFunctions.InflationSimpleMean","text":"(inflfn::InflationSimpleMean)(base::VarCPIBase)\n\nDefine cómo opera InflationSimpleMean sobre un objeto de tipo VarCPIBase.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Acerca","title":"Acerca","text":"CurrentModule = HEMI","category":"page"},{"location":"#HEMI","page":"Acerca","title":"HEMI","text":"","category":"section"},{"location":"","page":"Acerca","title":"Acerca","text":"Documentación de la herramienta de evaluación estadística de medidas de inflación (HEMI) utilizando el lenguaje de programación Julia. Este trabajo consiste en evaluar a través de simulación, la eficiencia de diferentes procedimientos o métodos que resulten en una medida de ritmo inflacionario interanual, desde un punto de vista de estas medidas como estimadores muestrales de la inflación generalizada no observable.","category":"page"}]
}
