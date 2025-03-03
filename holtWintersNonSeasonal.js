/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Holt Winters, non seasonal",
        navigation: "Holt Winters, non-seasonal",
        destination: "Variable to predict",
        firstObservation: "Time of first observation e.g.1: enter 1961,1 for January 1961 e.g.2: enter 1961,3 for 3nd  Quarter of 1961, e.g.3: enter 1 for a continuous series",
        frequency: "Number of observations per unit of time e.g.1: enter 12 for one observation for each month of a year, e.g. 2: enter 4 for one observation per quarter, e.g. 3: enter 1 for a  continuous series.",
        label1: "Plots",
        plotSeries: "Plot series",
        yaxisLabel: "Y axis label",
        mainTitle: "Main title",
        label2: "Options for fitted values",
        saveFitted: "Save fitted values",
        fittedValsDatasetName: "Specify dataset name to store fitted values",
        oriVsFitted: "Plot original vs. Fitted",
        plotResiduals: "Plot residuals",
        label3: "Predict using the model",
        predict: "Make predictions using model",
        confInterval: "Specify the confidence interval in percents e.g. 95 for 95%",
        periodToPredict: "Specify the number of intervals to predict",
        savePredictedVals: "Save predicted values",
        predictedValsDatasetName: "Specify dataset name to store predicted values",
        plotPredicted: "Plot predicted values",
        correlogram: "Generate correlogram",
        maxlag: "Enter max lag",
        Boxtest: " Ljung-Box test ",
		advanced_lbl : "Advanced",
        help: {
            title: "Holt Winters, non seasonal",
            r_help: "help(HoltWinters , package=stats)",
            body: `
            <b>Description</b></br>
            BSkyHoltWintersSeasonal is a wrapper function for HoltWinters from package stats.<br/>
Computes Holt-Winters Filtering of a given time series. Unknown parameters are determined by minimizing the squared prediction error. Internally calls HoltWinters with  gamma parameter used for the seasonal component set to FALSE. A non-seasonal model is fitted with gamma = 0/FALSE <br/> 
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyHoltWintersSeasonal(vars,start,frequency,exponential,seasonal ="None",main ,ylab,plotSeries=TRUE,saveFitted=FALSE,plotOriginalandForecast=FALSE,predict=FALSE,savePredictedVals=FALSE,plotPredictedValues=FALSE,correlogram=FALSE,Ljung_Boxtest=FALSE,dataset="Dataset2")
</code> <br/>
Arguments
<ul>
<li>
vars: select a variable to build a model for
</li>
<li>
start: Time of first observation should be entered in the format year,month or year,quarter e.g.( if your data is organized in months the 1992,1 for Jan 1992 or if your data is organized in quarters then 1992,1 refers to the first quarter of 1992.
</li>
<li>
frequency: Number of observations in unit time. Example: for monthly there are 12 observation in a year. For quarterly there are 4 observation in a year.
</li>
<li>
exponential: Determines whether exponential smoothing will be done, value set to FALSE
</li>
<li>
seasonal: a character string  "Non Seasonal"  for a  non seasonal model.  
</li>
<li>
plotSeries: if TRUE a  time series plot will also be generated.
</li>
<li>
saveFitted: if TRUE fit values are saved.
</li>
<li>
plotOriginalandForecast: Plot original and forecasted series
</li>
<li>
predict: if TRUE predicted values  will also be generated.
</li>
<li>
savePredictedVals: predicted values will be saved.
</li>
<li>
plotPredictedValues: predicted values will also be plotted.
</li>
<li>
correlogram: if TRUE a correlogram will be generated.
</li>
<li>
main: main title of the plot
</li>
<li>
ylab: title for the y axis
</li>
<li>
dataset: the name of the dataset from which the variables have been selected
</li>
</ul>
<b>Value</b><br/>
An object of class "HoltWinters", a list with components:<br/>
fitted: A multiple time series with one column for the filtered series as well as for the level, trend and seasonal components, estimated contemporaneously (that is at time t and not at the end of the series).<br/>
x: The original series<br/>
alpha: alpha used for filtering<br/>
beta: beta used for filtering<br/>
gamma: gamma used for filtering<br/>
coefficients: A vector with named components a, b, s1, ..., sp containing the estimated values for the level, trend and seasonal components<br/>
seasonal: The specified seasonal parameter<br/>
SSE: The final sum of squared errors achieved in optimizing<br/>
call: The call used<br/>
<b>Package</b></br>
forecast</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command in the R syntax editor help(HoltWinters , package=stats)
`}
    }
}

class holtWintersNonSeasonal extends baseModal {
    constructor() {
        var config = {
            id: "holtWintersNonSeasonal",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(forecast)
BSkyRes <-BSkyHoltWintersSeasonal(vars =c({{selected.destination | safe}}), start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} ,  seasonal ="Non Seasonal",main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}",  plotSeries={{selected.plotSeries | safe}},saveFitted={{selected.saveFitted | safe}}, fittedValsDatasetName="{{selected.fittedValsDatasetName | safe}}", plotOriginalandForecast={{selected.oriVsFitted | safe}},predict={{selected.predict | safe}}, periodToPredict={{selected.periodToPredict | safe}}, savePredictedVals={{selected.savePredictedVals | safe}}, predictedValsDatasetName="{{selected.predictedValsDatasetName | safe}}",plotPredictedValues={{selected.plotPredicted | safe}}, correlogram={{selected.correlogram | safe}},lag.max={{selected.maxlag | safe}},Ljung_Boxtest={{selected.Boxtest | safe}},dataset="{{dataset.name}}")
BSkyFormat(BSkyRes)
{{if (options.selected.fittedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.fittedValsDatasetName | safe}}")\n{{/if}}
{{if (options.selected.predictedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.predictedValsDatasetName | safe}}"){{/if}}
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariable(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "Numeric|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    allow_spaces:true,
                    label: localization.en.firstObservation,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    allow_spaces:true,
                    type: "numeric",
                    label: localization.en.frequency,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5, style: "mt-1", }) },
            plotSeries: { el: new checkbox(config, { label: localization.en.plotSeries, no: "plotSeries", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces:true,
                    label: localization.en.yaxisLabel,
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    allow_spaces:true,
                    label: localization.en.mainTitle,
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 5 }) },
            saveFitted: { el: new checkbox(config, { label: localization.en.saveFitted, no: "saveFitted", extraction: "Boolean", ml: 4, required: true, dependant_objects: ['fittedValsDatasetName'] }) },
            fittedValsDatasetName: {
                el: new input(config, {
                    no: 'fittedValsDatasetName',
                    label: localization.en.fittedValsDatasetName,
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    ml: 4,
                    value: ""
                })
            },
            oriVsFitted: { el: new checkbox(config, { label: localization.en.oriVsFitted, no: "oriVsFitted", newline: true, extraction: "Boolean" }) },
            plotResiduals: { el: new checkbox(config, { label: localization.en.plotResiduals, no: "plotResiduals", newline: true, extraction: "Boolean" }) },
            label3: { el: new labelVar(config, { label: localization.en.label3, h: 5, style: "mt-3" }) },
            predict: { el: new checkbox(config, { label: localization.en.predict, no: "predict", extraction: "Boolean", dependant_objects: ['periodToPredict', 'savePredictedVals', 'plotPredicted', 'correlogram'] }) },
            periodToPredict: {
                el: new inputSpinner(config, {
                    no: 'periodToPredict',
                    label: localization.en.periodToPredict,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "ml-5",
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: localization.en.confInterval,
                    min: 0,
                    max: 100,
                    step: 5,
                    style: "ml-1",
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            savePredictedVals: { el: new checkbox(config, { label: localization.en.savePredictedVals, no: "savePredictedVals", required: true, extraction: "Boolean", dependant_objects: ['predictedValsDatasetName'] }) },
            predictedValsDatasetName: {
                el: new input(config, {
                    no: 'predictedValsDatasetName',
                    label: localization.en.predictedValsDatasetName,
                    placeholder: "",
                    ml: 4,
                    type: "character",
                    extraction: "TextAsIs",
                })
            },
            plotPredicted: { el: new checkbox(config, { label: localization.en.plotPredicted, no: "plotPredicted", extraction: "Boolean", newline: true }) },
            correlogram: { el: new checkbox(config, { label: localization.en.correlogram, no: "correlogram", newline: true, extraction: "Boolean", dependant_objects: ['maxlag', 'Boxtest'] }) },
            maxlag: {
                el: new inputSpinner(config, {
                    no: 'maxlag',
                    label: localization.en.maxlag,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    ml: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Boxtest: { el: new checkbox(config, { label: localization.en.Boxtest, no: "Boxtest", extraction: "Boolean", style: "ml-3" }) },
        };
        var holtNonSeasonalOptions = {
            el: new optionsVar(config, {
                no: "plots",
                name: localization.en.advanced_lbl,
                content: [
                    objects.label2.el,
                    objects.saveFitted.el,
                    objects.fittedValsDatasetName.el,
                    objects.oriVsFitted.el,
                    objects.plotResiduals.el,
                    objects.label3.el,
                    objects.predict.el,
                    objects.periodToPredict.el,
                    objects.confInterval.el,
                    objects.savePredictedVals.el,
                    objects.predictedValsDatasetName.el,
                    objects.plotPredicted.el,
                    objects.correlogram.el,
                    objects.maxlag.el,
                    objects.Boxtest.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.label1.el.content, objects.plotSeries.el.content, objects.yaxisLabel.el.content, objects.mainTitle.el.content],
            bottom: [holtNonSeasonalOptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-hw",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new holtWintersNonSeasonal().render()