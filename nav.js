let t = getT('menutoolbar')
const nav = () => ({
    "name": t('forecasting_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "forecasting",
    "buttons": [
        "./automatedARIMA",
        "./exponentialSmoothing",
        "./holtWintersNonSeasonal",
        "./holtWintersSeasonal",
        "./plotTimeSeriesSeparateCombined",
        "./plotTimeSeriesCorrelations"
    ]
})

module.exports = {
    nav: nav(),
    render: () => nav()
}

