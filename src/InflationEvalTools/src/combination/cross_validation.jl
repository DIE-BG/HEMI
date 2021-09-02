## Función para obtener error de validación cruzada utilizando CrossEvalConfig 

# crossvaldata es un diccionario de resultados producido por makesim para un CrossEvalConfig. Se hace de esta forma para que las trayectorias de inflación estén precomputadas, ya que sería muy costoso generarlas al vuelo.
function crossvalidate(crossvaldata::Dict{String}, config::CrossEvalConfig, weightsfunction; 
    show_status::Bool = true,
    print_weights::Bool = true, 
    return_weights::Bool = false,
    metrics::Vector{Symbol} = [:mse], 
    train_start_period::Date = Date(2000, 12), 
    components_mask = Colon()) 

    local w
    folds = length(config.evalperiods)
    cv_results = zeros(Float32, folds, length(metrics))

    # Obtener parámetro de inflación 
    for (i, evalperiod) in enumerate(config.evalperiods)
    
        @debug "Ejecutando iteración $i de validación cruzada" evalperiod 

        # Obtener los datos de entrenamiento y validación 
        traindate = evalperiod.startdate - Month(1)
        cvdate = evalperiod.finaldate
        
        train_tray_infl = crossvaldata[_getkey("infl", traindate)]
        train_tray_infl_param = crossvaldata[_getkey("param", traindate)]
        train_dates = crossvaldata[_getkey("dates", traindate)]
        cv_tray_infl = crossvaldata[_getkey("infl", cvdate)]
        cv_tray_infl_param = crossvaldata[_getkey("param", cvdate)]
        cv_dates = crossvaldata[_getkey("dates", cvdate)]

        # Máscara de períodos para ajustar los ponderadores. Los ponderadores se ajustan a partir de train_start_period
        weights_train_mask = train_dates .> train_start_period

        # Obtener ponderadores de combinación lineal con weightsfunction 
        w = @views weightsfunction(
            train_tray_infl[weights_train_mask, components_mask, :], 
            train_tray_infl_param[weights_train_mask])

        # Máscara de períodos de evaluación 
        mask = evalperiod.startdate .<= cv_dates .<= evalperiod.finaldate

        # Obtener métrica de evaluación en subperíodo de CV 
        cv_metrics = @views combination_metrics(
            cv_tray_infl[mask, components_mask, :], 
            cv_tray_infl_param[mask], 
            w)
        cv_results[i, :] = get.(Ref(cv_metrics), metrics, 0)

        show_status && @info "Evaluación ($i/$folds):" train_start_period evalperiod traindate cv_results[i]
        print_weights && println(w)
    
    end

    # Retornar ponderaciones si es seleccionado 
    return_weights && return cv_results, w
    # Retornar métricas de validación cruzada
    cv_results
end


function _getkey(prefix, date) 
    fmt = dateformat"yy" 
    prefix * "_" * Dates.format(date, fmt)
end