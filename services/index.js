const TradingView = require('@mathieuc/tradingview')

module.exports = class TradingViewService {

    // User info
    user
    // Client
    client

    chart

    async login() {
        this.user = await TradingView.loginUser('TPT1028', 'TPT@102811')
    }

    async init() {
        // chờ đăng nhập
        await this.login()
        this.client = new TradingView.Client({
            token: this.user.session,
        });

        this.chart = new this.client.Session.Chart();
    }

    setMarket(symbol, options = {}) {
        this.chart.setMarket(`BINANCE:${symbol}`, options)
    }

    /**
     * Lấy thông tin của một khoảng thời gian
     * @param { String } indicator
     * @requires indicator
     */
    async setIndicator(indicator) {
        await TradingView.getIndicator(indicator)
    }
}
