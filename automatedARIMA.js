


class automatedARIMA extends baseModal {
    static dialogId = 'automatedARIMA'
    static t = baseModal.makeT(automatedARIMA.dialogId)

    constructor() {
        var config = {
            id: automatedARIMA.dialogId,
            label: automatedARIMA.t('title'),
            modalType: "two",
            RCode: `
require(forecast)
BSkyRes <-BSkyAutoArima (vars ={{selected.destination | safe}}, start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} , main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}",ic="{{selected.criteria | safe}}",plotSeries={{selected.plotSeries | safe}},plotResiduals ={{selected.plotResiduals | safe}},predict={{selected.predict | safe}},{{if (options.selected.periodToPredict !="")}}periodToPredict={{selected.periodToPredict | safe}},{{/if}} confInterval ={{selected.confInterval | safe}}, savePredictedVals={{selected.savePredictedVals | safe}}, predictedValsDatasetName="{{selected.predictedValsDatasetName | safe}}",plotPredictedValues={{selected.plotPredicted | safe}}, plotOriginalandForecast={{selected.oriVsFitted | safe}}, saveFitted={{selected.saveFitted | safe}},fittedValsDatasetName="{{selected.fittedValsDatasetName | safe}}",correlogram={{selected.correlogram | safe}},{{if (options.selected.maxlag != "")}}lag.max={{selected.maxlag | safe}},{{/if}}Ljung_Boxtest={{selected.Boxtest | safe}},dataset="{{dataset.name}}")
BSkyFormat(BSkyRes)
{{if (options.selected.fittedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.fittedValsDatasetName | safe}}")\n{{/if}}
{{if (options.selected.predictedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.predictedValsDatasetName | safe}}"){{/if}}
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariable(config, {
                    label: automatedARIMA.t('destination'),
                    no: "destination",
                    required:true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    required: true,
                    allow_spaces:true,
                    label: automatedARIMA.t('firstObservation'),
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
                    label: automatedARIMA.t('frequency'),
                    placeholder: "",
                    required: true,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            criteria: {
                el: new comboBox(config, {
                    no: 'criteria',
                    label: automatedARIMA.t('criteria'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: ["bic", "aic", "aicc",],
                    default: "bic"
                })
            },
            label1: { el: new labelVar(config, { label: automatedARIMA.t('label1'), h: 5 }) },
            plotSeries: { el: new checkbox(config, { label: automatedARIMA.t('plotSeries'), no: "plotSeries", extraction: "Boolean", required: true }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    label: automatedARIMA.t('yaxisLabel'),
                    placeholder: "",
                    allow_spaces:true,
                    type: "character",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    label: automatedARIMA.t('mainTitle'),
                    allow_spaces:true,
                    type: "character",
                    placeholder: "",
                    style: "ml-4 mb-2",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label2: { el: new labelVar(config, { label: automatedARIMA.t('label2'), h: 5 }) },
            saveFitted: { el: new checkbox(config, { label: automatedARIMA.t('saveFitted'), no: "saveFitted", extraction: "boolean", ml: 4, required: true, dependant_objects: ['fittedValsDatasetName'] }) },
            fittedValsDatasetName: {
                el: new input(config, {
                    no: 'fittedValsDatasetName',
                    label: automatedARIMA.t('fittedValsDatasetName'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    style: "ml-4 mb-2",
                    value: ""
                })
            },
            oriVsFitted: { el: new checkbox(config, { label: automatedARIMA.t('oriVsFitted'), no: "oriVsFitted", newline: true, extraction: "Boolean" }) },
            plotResiduals: { el: new checkbox(config, { label: automatedARIMA.t('plotResiduals'), no: "plotResiduals", newline: true, extraction: "Boolean" }) },
            label3: { el: new labelVar(config, { label: automatedARIMA.t('label3'), h: 5, style: "mt-3" }) },
            predict: { el: new checkbox(config, { label: automatedARIMA.t('predict'), no: "predict", extraction: "boolean", required:true,dependant_objects: ['periodToPredict', 'savePredictedVals', 'plotPredicted', 'correlogram'] }) },
            periodToPredict: {
                el: new inputSpinner(config, {
                    no: 'periodToPredict',
                    label: automatedARIMA.t('periodToPredict'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "ml-5 mb-2",
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: automatedARIMA.t('confInterval'),
                    min: 0,
                    max: 100,
                    step: 5,
                    style: "ml-1",
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            savePredictedVals: { el: new checkbox(config, { label: automatedARIMA.t('savePredictedVals'), no: "savePredictedVals", required: true, extraction: "Boolean", dependant_objects: ['predictedValsDatasetName'] }) },
            predictedValsDatasetName: {
                el: new input(config, {
                    no: 'predictedValsDatasetName',
                    label: automatedARIMA.t('predictedValsDatasetName'),
                    placeholder: "",
                    style: "ml-4 mb-2",
                    type: "character",
                    extraction: "TextAsIs",
                })
            },
            plotPredicted: { el: new checkbox(config, { label: automatedARIMA.t('plotPredicted'), no: "plotPredicted", extraction: "Boolean", newline: true }) },
            correlogram: { el: new checkbox(config, { label: automatedARIMA.t('correlogram'), no: "correlogram", newline: true, required:true,extraction: "boolean", dependant_objects: ['maxlag', 'Boxtest'] }) },
            maxlag: {
                el: new inputSpinner(config, {
                    no: 'maxlag',
                    label: automatedARIMA.t('maxlag'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    ml: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Boxtest: { el: new checkbox(config, { label: automatedARIMA.t('Boxtest'), no: "Boxtest", extraction: "Boolean", style: "ml-3" }) },
        };
        var arimaOptions = {
            el: new optionsVar(config, {
                no: "plots",
                name: automatedARIMA.t('advanced_lbl'),
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
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.criteria.el.content, objects.label1.el.content, objects.plotSeries.el.content, objects.yaxisLabel.el.content, objects.mainTitle.el.content],
            bottom: [arimaOptions.el.content],
            nav: {
                name: automatedARIMA.t('navigation'),
                icon: "icon-ar",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: automatedARIMA.t('help.title'),
            r_help: "help(data,package='utils')",
            body: automatedARIMA.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new automatedARIMA().render()
}
