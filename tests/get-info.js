const TradingView = require('@mathieuc/tradingview')

async function getInfo() {
    const user = await TradingView.loginUser('TPT1028', 'TPT@102811')

    const client = new TradingView.Client({
        token: user.session,
    });

    const chart = new client.Session.Chart(); // Init a Chart session

    // console.log(`[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`);

    // USER;0091598734f647d48c7dd3378f19baf4 => Order Blocks chỉ trả về màu, khối màu
    // STD;Supertrend


    chart.setMarket('BINANCE:BTCUSD', {
        timeframe: 'M'
    });

    TradingView.getIndicator('STD;Supertrend').then(async (indic) => {
        console.log(`Loading '${indic.description}' study...`);
        const SUPER_TREND = new chart.Study(indic)

        SUPER_TREND.onUpdate(() => {
            console.log('Prices periods:', chart.periods);
            console.log('Study periods:', SUPER_TREND.periods);
            client.end();
        });
    });

}

getInfo()
