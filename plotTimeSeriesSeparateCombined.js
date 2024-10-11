

class plotTimeSeriesSeparateCombined extends baseModal {
    static dialogId = 'plotTimeSeriesSeparateCombined'
    static t = baseModal.makeT(plotTimeSeriesSeparateCombined.dialogId)

    constructor() {
        var config = {
            id: plotTimeSeriesSeparateCombined.dialogId,
            label: plotTimeSeriesSeparateCombined.t('title'),
            modalType: "two",
            RCode: `
BSkyPlotTimeSeries(vars =c({{selected.destination | safe}}), start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} ,plot.type="{{selected.groupbox1 | safe}}", naturalLogYaxis ={{selected.chkboxForTransform | safe}}, main ='{{selected.mainTitle | safe}}', ylab='{{selected.yaxisLabel | safe}}', dataset="{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariableList(config, {
                    label: plotTimeSeriesSeparateCombined.t('destination'),
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
                    label: plotTimeSeriesSeparateCombined.t('firstObservation'),
                    placeholder: "",
                    required:true,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    allow_spaces:true,
                    type:"numeric",
                    required:true,
                    label: plotTimeSeriesSeparateCombined.t('frequency'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label0: { el: new labelVar(config, { label: plotTimeSeriesSeparateCombined.t('label0'), h: 5,  style: "mt-1", }) },
            separately: { el: new radioButton(config, { label: plotTimeSeriesSeparateCombined.t('separately'), no: "groupbox1", increment: "separately", value: "multiple", state: "checked", extraction: "ValueAsIs" }) },
            combine: { el: new radioButton(config, { label: plotTimeSeriesSeparateCombined.t('combine'), no: "groupbox1", increment: "combine", value: "single", state: "", extraction: "ValueAsIs" }) },
            label1: { el: new labelVar(config, { label: plotTimeSeriesSeparateCombined.t('label1'), h: 5,  style: "mt-1", }) },
            chkboxForTransform: { el: new checkbox(config, { label: plotTimeSeriesSeparateCombined.t('chkboxForTransform'), no: "chkboxForTransform", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces: true,
                    label: plotTimeSeriesSeparateCombined.t('yaxisLabel'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    label: plotTimeSeriesSeparateCombined.t('mainTitle'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "Time Series"
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.label0.el.content, objects.separately.el.content, objects.combine.el.content, objects.label1.el.content, objects.chkboxForTransform.el.content, objects.yaxisLabel.el.content, objects.mainTitle.el.content],
            nav: {
                name: plotTimeSeriesSeparateCombined.t('navigation'),
                icon: "icon-time_series",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: plotTimeSeriesSeparateCombined.t('help.title'),
            r_help: "help(data,package='utils')",
            body: plotTimeSeriesSeparateCombined.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new plotTimeSeriesSeparateCombined().render()
}
