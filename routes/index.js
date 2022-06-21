const express = require('express');
const TradingView = require("@mathieuc/tradingview");
const router = express.Router();
const moment = require('moment')

/* GET home page. */
router.get('/', async (req, res, next) => {

    if (!req.query.symbol) {
        return res.render('index', {
            title: 'Express',
            symbol: '',
        });
    }

    const user = await TradingView.loginUser('TPT1028', 'TPT@102811')

    const client = new TradingView.Client({
        token: user.session,
    });

    const chart = new client.Session.Chart(); // Init a Chart session

    // console.log(`[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`);


    chart.setMarket(`BINANCE:${req.query.symbol}`, {
        timeframe: req.query.timeframe
    });

    await TradingView.getIndicator('PUB;a02143ac7305490e9d0ac6d7c48e8493').then(async (indic) => {
        console.log(`Loading '${indic.description}' study...`);
        const SUPER_TREND = new chart.Study(indic);

        SUPER_TREND.onUpdate(() => {
            console.log('Prices periods:', chart.periods);
            console.log('Study periods:', SUPER_TREND.periods)
            client.end().then(() => {
                return res.render('index', {
                    title: 'Express',
                    info: chart.infos,
                    price_periods: chart.periods,
                    study_periods: SUPER_TREND.periods,
                    symbol: req.query.symbol,
                    timeframe: req.query.timeframe,
                    moment
                })
            })
        });
    });
});

module.exports = router;
