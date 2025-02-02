


class plotTimeSeriesCorrelations extends baseModal {
    static dialogId = 'plotTimeSeriesCorrelations'
    static t = baseModal.makeT(plotTimeSeriesCorrelations.dialogId)

    constructor() {
        var config = {
            id: plotTimeSeriesCorrelations.dialogId,
            label: plotTimeSeriesCorrelations.t('title'),
            modalType: "two",
            RCode: `
require(forecast)
BSkyPlotSeriesWithCorrelations(vars =c({{selected.destination | safe}}), start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} ,autocorrelation={{selected.autocorrelations | safe}},autocovariance={{selected.autocovariance | safe}}, partialautocorrelations={{selected.partialcorrelations | safe}}, main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}", dataset="{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariableList(config, {
                    label: plotTimeSeriesCorrelations.t('destination'),
                    no: "destination",
                    filter: "Numeric|Scale",
                    required:true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    allow_spaces:true,
                    required:true,
                    label: plotTimeSeriesCorrelations.t('firstObservation'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    label: plotTimeSeriesCorrelations.t('frequency'),
                    allow_spaces:true,
                    required:true,
                    type:"numeric",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label0: { el: new labelVar(config, { label: plotTimeSeriesCorrelations.t('label0'), h: 5,  style: "mt-1", }) },
            autocorrelations: { el: new checkbox(config, { label: plotTimeSeriesCorrelations.t('autocorrelations'), no: "autocorrelations", extraction: "Boolean" }) },
            autocovariance: { el: new checkbox(config, { label: plotTimeSeriesCorrelations.t('autocovariance'), no: "autocovariance", extraction: "Boolean" }) },
            partialcorrelations: { el: new checkbox(config, { label: plotTimeSeriesCorrelations.t('partialcorrelations'), no: "partialcorrelations", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces:true,
                    label: plotTimeSeriesCorrelations.t('yaxisLabel'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    allow_spaces:true,
                    label: plotTimeSeriesCorrelations.t('mainTitle'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "Time Series"
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.label0.el.content, objects.autocorrelations.el.content, objects.autocovariance.el.content, objects.partialcorrelations.el.content, objects.mainTitle.el.content, objects.yaxisLabel.el.content],
            nav: {
                name: plotTimeSeriesCorrelations.t('navigation'),
                icon: " icon-time_series_r",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: plotTimeSeriesCorrelations.t('help.title'),
            r_help: plotTimeSeriesCorrelations.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: plotTimeSeriesCorrelations.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new plotTimeSeriesCorrelations().render()
}
