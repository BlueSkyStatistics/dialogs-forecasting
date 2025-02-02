


class exponentialSmoothing extends baseModal {
    static dialogId = 'exponentialSmoothing'
    static t = baseModal.makeT(exponentialSmoothing.dialogId)

    constructor() {
        var config = {
            id: exponentialSmoothing.dialogId,
            label: exponentialSmoothing.t('title'),
            modalType: "two",
            RCode: `
BSkyRes <-BSkyHoltWintersSeasonal(vars ={{selected.destination | safe}}, start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} , exponential =TRUE, seasonal ="None",main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}",  plotSeries={{selected.plotSeries | safe}},saveFitted={{selected.saveFitted | safe}}, fittedValsDatasetName="{{selected.fittedValsDatasetName | safe}}", plotOriginalandForecast={{selected.oriVsFitted | safe}},predict={{selected.predict | safe}}, periodToPredict={{selected.periodToPredict | safe}}, savePredictedVals={{selected.savePredictedVals | safe}}, predictedValsDatasetName="{{selected.predictedValsDatasetName | safe}}",plotPredictedValues={{selected.plotPredicted | safe}}, correlogram={{selected.correlogram | safe}},lag.max={{selected.maxlag | safe}},Ljung_Boxtest={{selected.Boxtest | safe}},dataset="{{dataset.name}}")
BSkyFormat(BSkyRes)
{{if (options.selected.fittedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.fittedValsDatasetName | safe}}")\n{{/if}}
{{if (options.selected.predictedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.predictedValsDatasetName | safe}}"){{/if}}
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariable(config, {
                    label: exponentialSmoothing.t('destination'),
                    no: "destination",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    label: exponentialSmoothing.t('firstObservation'),
                    allow_spaces:true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    label: exponentialSmoothing.t('frequency'),
                    allow_spaces:true,
                    type: "numeric",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: exponentialSmoothing.t('label1'), h: 5, style: "mt-1", }) },
            plotSeries: { el: new checkbox(config, { label: exponentialSmoothing.t('plotSeries'), no: "plotSeries", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces:true,
                    label: exponentialSmoothing.t('yaxisLabel'),
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
                    label: exponentialSmoothing.t('mainTitle'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label2: { el: new labelVar(config, { label: exponentialSmoothing.t('label2'), h: 5 }) },
            saveFitted: { el: new checkbox(config, { label: exponentialSmoothing.t('saveFitted'), no: "saveFitted", extraction: "Boolean", ml: 4, required: true, dependant_objects: ['fittedValsDatasetName'] }) },
            fittedValsDatasetName: {
                el: new input(config, {
                    no: 'fittedValsDatasetName',
                    label: exponentialSmoothing.t('fittedValsDatasetName'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    ml: 4,
                    value: ""
                })
            },
            oriVsFitted: { el: new checkbox(config, { label: exponentialSmoothing.t('oriVsFitted'), no: "oriVsFitted", newline: true, extraction: "Boolean" }) },
            plotResiduals: { el: new checkbox(config, { label: exponentialSmoothing.t('plotResiduals'), no: "plotResiduals", newline: true, extraction: "Boolean" }) },
            label3: { el: new labelVar(config, { label: exponentialSmoothing.t('label3'), h: 5, style: "mt-3" }) },
            predict: { el: new checkbox(config, { label: exponentialSmoothing.t('predict'), no: "predict", extraction: "Boolean", dependant_objects: ['periodToPredict', 'savePredictedVals', 'plotPredicted', 'correlogram'] }) },
            periodToPredict: {
                el: new inputSpinner(config, {
                    no: 'periodToPredict',
                    label: exponentialSmoothing.t('periodToPredict'),
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
                    label: exponentialSmoothing.t('confInterval'),
                    min: 0,
                    max: 100,
                    step: 5,
                    style: "ml-1",
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            savePredictedVals: { el: new checkbox(config, { label: exponentialSmoothing.t('savePredictedVals'), no: "savePredictedVals", required: true, extraction: "Boolean", dependant_objects: ['predictedValsDatasetName'] }) },
            predictedValsDatasetName: {
                el: new input(config, {
                    no: 'predictedValsDatasetName',
                    label: exponentialSmoothing.t('predictedValsDatasetName'),
                    placeholder: "",
                    ml: 4,
                    type: "character",
                    extraction: "TextAsIs",
                })
            },
            plotPredicted: { el: new checkbox(config, { label: exponentialSmoothing.t('plotPredicted'), no: "plotPredicted", extraction: "Boolean", newline: true }) },
            correlogram: { el: new checkbox(config, { label: exponentialSmoothing.t('correlogram'), no: "correlogram", newline: true, extraction: "Boolean", dependant_objects: ['maxlag', 'Boxtest'] }) },
            maxlag: {
                el: new inputSpinner(config, {
                    no: 'maxlag',
                    label: exponentialSmoothing.t('maxlag'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    ml: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Boxtest: { el: new checkbox(config, { label: exponentialSmoothing.t('Boxtest'), no: "Boxtest", extraction: "Boolean", style: "ml-3" }) }
        };
        var expoOptions = {
            el: new optionsVar(config, {
                no: "plots",
                name: exponentialSmoothing.t('advanced_lbl'),
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
            bottom: [expoOptions.el.content],
            nav: {
                name: exponentialSmoothing.t('navigation'),
                icon: "icon-es",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: exponentialSmoothing.t('help.title'),
            r_help: exponentialSmoothing.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: exponentialSmoothing.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new exponentialSmoothing().render()
}
