/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class holtWintersNonSeasonal extends baseModal {
    static dialogId = 'holtWintersNonSeasonal'
    static t = baseModal.makeT(holtWintersNonSeasonal.dialogId)

    constructor() {
        var config = {
            id: holtWintersNonSeasonal.dialogId,
            label: holtWintersNonSeasonal.t('title'),
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
                    label: holtWintersNonSeasonal.t('destination'),
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
                    label: holtWintersNonSeasonal.t('firstObservation'),
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
                    label: holtWintersNonSeasonal.t('frequency'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label1: { el: new labelVar(config, { label: holtWintersNonSeasonal.t('label1'), h: 5, style: "mt-1", }) },
            plotSeries: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('plotSeries'), no: "plotSeries", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces:true,
                    label: holtWintersNonSeasonal.t('yaxisLabel'),
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
                    label: holtWintersNonSeasonal.t('mainTitle'),
                    placeholder: "",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label2: { el: new labelVar(config, { label: holtWintersNonSeasonal.t('label2'), h: 5 }) },
            saveFitted: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('saveFitted'), no: "saveFitted", extraction: "Boolean", ml: 4, required: true, dependant_objects: ['fittedValsDatasetName'] }) },
            fittedValsDatasetName: {
                el: new input(config, {
                    no: 'fittedValsDatasetName',
                    label: holtWintersNonSeasonal.t('fittedValsDatasetName'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    ml: 4,
                    value: ""
                })
            },
            oriVsFitted: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('oriVsFitted'), no: "oriVsFitted", newline: true, extraction: "Boolean" }) },
            plotResiduals: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('plotResiduals'), no: "plotResiduals", newline: true, extraction: "Boolean" }) },
            label3: { el: new labelVar(config, { label: holtWintersNonSeasonal.t('label3'), h: 5, style: "mt-3" }) },
            predict: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('predict'), no: "predict", extraction: "Boolean", dependant_objects: ['periodToPredict', 'savePredictedVals', 'plotPredicted', 'correlogram'] }) },
            periodToPredict: {
                el: new inputSpinner(config, {
                    no: 'periodToPredict',
                    label: holtWintersNonSeasonal.t('periodToPredict'),
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
                    label: holtWintersNonSeasonal.t('confInterval'),
                    min: 0,
                    max: 100,
                    step: 5,
                    style: "ml-1",
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            savePredictedVals: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('savePredictedVals'), no: "savePredictedVals", required: true, extraction: "Boolean", dependant_objects: ['predictedValsDatasetName'] }) },
            predictedValsDatasetName: {
                el: new input(config, {
                    no: 'predictedValsDatasetName',
                    label: holtWintersNonSeasonal.t('predictedValsDatasetName'),
                    placeholder: "",
                    ml: 4,
                    type: "character",
                    extraction: "TextAsIs",
                })
            },
            plotPredicted: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('plotPredicted'), no: "plotPredicted", extraction: "Boolean", newline: true }) },
            correlogram: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('correlogram'), no: "correlogram", newline: true, extraction: "Boolean", dependant_objects: ['maxlag', 'Boxtest'] }) },
            maxlag: {
                el: new inputSpinner(config, {
                    no: 'maxlag',
                    label: holtWintersNonSeasonal.t('maxlag'),
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    ml: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Boxtest: { el: new checkbox(config, { label: holtWintersNonSeasonal.t('Boxtest'), no: "Boxtest", extraction: "Boolean", style: "ml-3" }) },
        };
        var holtNonSeasonalOptions = {
            el: new optionsVar(config, {
                no: "plots",
                name: holtWintersNonSeasonal.t('advanced_lbl'),
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
                name: holtWintersNonSeasonal.t('navigation'),
                icon: "icon-hw",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: holtWintersNonSeasonal.t('help.title'),
            r_help: holtWintersNonSeasonal.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: holtWintersNonSeasonal.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new holtWintersNonSeasonal().render()
}
