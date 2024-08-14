"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuySellTokenBalance = void 0;
const Types_1 = require("../Types");
class BuySellTokenBalance extends Types_1.Balance {
    constructor(token, user, balance, buyFee, sellFee) {
        super(token, user, balance);
        this.buyFee = buyFee;
        this.sellFee = sellFee;
    }
    static availableData(balance, buyFee, sellFee) {
        return new BuySellTokenBalance(balance.token, balance.user, balance.balance, buyFee, sellFee);
    }
    static unavailableData(token, buyFee, sellFee) {
        return new BuySellTokenBalance(token, '', '0', buyFee, sellFee);
    }
}
exports.BuySellTokenBalance = BuySellTokenBalance;
