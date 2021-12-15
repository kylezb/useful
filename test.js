function test(){
    const url = 'https://steamcommunity.com/market/';
    return new Promise((resolve, reject) => {
        this.request.get({
            url,
        }, (err, resp, body) => {
            if (err) {
                reject(err);
                return;
            }
            // if (!this._checkHttpErrorSync(err, resp)) {
            //     reject(new Error('查询在售单失败'));
            //     return;
            // }
            const $ = Cheerio.load(body);
            const orderNodes = $('.my_listing_section .market_listing_row');
            const orders = [];
            for (let i = 0; i < orderNodes.length; i++) {
                const nodeId = orderNodes[i].attribs.id;
                if (!_.isEmpty(nodeId) && nodeId.indexOf('mylisting_') !== -1) {
                    const listingid = _.split(nodeId, '_')[1];
                    const paymentText = $(`#${nodeId} .market_listing_price span span`).first().text().trim();
                    // const payment = Math.round(parseFloat(_.replace(paymentText, /[¥ |,]/g, '')) * 100);  // 原始只匹配人民币
                    var payment = Math.round(parseFloat(_.replace(paymentText, /\D/g, '')));
                    const priceNoFeeText = $(`#${nodeId} .market_listing_price span span`).last().text().trim();
                    // const priceNoFee = Math.round(parseFloat(_.replace(priceNoFeeText, /[\(¥ |,|)]/g, '')) * 100);  // 原始只匹配人民币
                    var priceNoFee = Math.round(parseFloat(_.replace(priceNoFeeText, /\D/g, '')));
                    // 判断价格字符串长度, 用来确定短的那个是否需要乘100
                    const paymentlength = payment.toString().length
                    const priceNoFeelength = priceNoFee.toString().length
                    if (paymentlength > priceNoFeelength) {
                        payment = payment
                        priceNoFee = priceNoFee * 100
                    } else if (priceNoFeelength > paymentlength) {
                        payment = payment * 100
                        priceNoFee = priceNoFee
                    } else if (paymentlength === priceNoFeelength) {
                        payment = payment
                        priceNoFee = priceNoFee
                    }
                    const fee = (payment - priceNoFee);
                    const href = $(`#${nodeId} .market_listing_cancel_button a`).attr('href');
                    const pattern = /javascript:(\w+)\('mylisting', '(\d+)', (\d+), '(\d+)', '(\d+)'\)/;
                    const hrefMatch = href.match(pattern);
                    if (hrefMatch) {
                        const onSell = hrefMatch[1] === 'RemoveMarketListing';
                        const appid = hrefMatch[3];
                        const assetid = hrefMatch[5];
                        const order = {
                            listingid,
                            appid,
                            assetid,
                            payment,
                            fee,
                            onSell,
                        };
                        orders.push(order);
                    }
                }
            }
            this.logger.info(this.botid, `[SteamStore] Bot ${this.steamID} get sell orders: ${JSON.stringify(orders)}`);
            resolve(orders);
            return;
        });
    });
};