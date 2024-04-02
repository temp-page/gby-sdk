"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketTradeMath = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const vo_1 = require("../../vo/");
class MarketTradeMath {
    static margin(tokenAmount, tokenPrice, decimals) {
        return new bignumber_js_1.default(tokenAmount)
            .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS))
            .multipliedBy(tokenPrice)
            .dividedBy(new bignumber_js_1.default(10).pow(decimals))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    static netTradeValue(tokenAmount, leverage, tokenPrice, decimals) {
        return new bignumber_js_1.default(tokenAmount)
            .multipliedBy(leverage)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .dividedBy(100)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS))
            .multipliedBy(tokenPrice)
            .dividedBy(new bignumber_js_1.default(10).pow(decimals))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    // uint256 openFee = (margin * targetConfig.openFeeRate) / 10 ** CONST.RATIO_DECIMALS;
    static openFee(margin, openFeeRate) {
        return new bignumber_js_1.default(margin)
            .multipliedBy(openFeeRate)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    // uint256 closeFee = (margin * targetConfig.closeFeeRate) / 10 ** CONST.RATIO_DECIMALS;
    static closeFee(margin, closeFeeRate) {
        return new bignumber_js_1.default(margin)
            .multipliedBy(closeFeeRate)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    //margin = margin - openFee - closeFee - targetConfig.execFeeValue;
    static finalMargin(margin, openFee, closeFee, execFeeValue) {
        return new bignumber_js_1.default(margin)
            .minus(openFee)
            .minus(closeFee)
            .minus(execFeeValue)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    static finalNetTradeValue(netTradeValue, execFeeValue, openFee, closeFee) {
        return new bignumber_js_1.default(netTradeValue)
            .minus(execFeeValue)
            .minus(openFee)
            .minus(closeFee)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    //uint256 targetAmount = netTradeValue / targetPrice;
    static targetAmount(netTradeValue, targetPrice) {
        return new bignumber_js_1.default(netTradeValue)
            .dividedBy(targetPrice)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    static takeProfitPrice(isLong, takeProfit, margin, targetAmount, targetPrice) {
        if (isLong) {
            //openPositionArgs.takeProfitPrice =
            //                     ((openTrade.takeProfit - 100 * 10 ** CONST.RATIO_DECIMALS) * margin) /
            //                     (100 * 10 ** CONST.RATIO_DECIMALS) /
            //                     targetAmount +
            //                     targetPrice;
            return new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)).minus(takeProfit).multipliedBy(margin).dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).dividedBy(targetAmount).plus(targetPrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            //takeProfitPrice =
            //                     targetPrice -
            //                     (((openTrade.takeProfit - 100 * 10 ** CONST.RATIO_DECIMALS) * margin) /
            //                         (100 * 10 ** CONST.RATIO_DECIMALS) /
            //                         targetAmount);
            return new bignumber_js_1.default(targetPrice)
                .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)).minus(takeProfit).multipliedBy(margin).dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).dividedBy(targetAmount))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static liquidPrice(isLong, liquidation, margin, targetAmount, targetPrice) {
        if (isLong) {
            //liquidPrice = targetPrice -
            //                     (((100 * 10 ** CONST.RATIO_DECIMALS - openTrade.liquidation) * margin) /
            //                         (100 * 10 ** CONST.RATIO_DECIMALS) /
            //                         targetAmount)
            return new bignumber_js_1.default(targetPrice)
                .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)).minus(liquidation).multipliedBy(margin).dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).dividedBy(targetAmount))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            // liquidPrice =
            //   ((100 * 10 ** CONST.RATIO_DECIMALS - openTrade.liquidation) * margin) /
            //   (100 * 10 ** CONST.RATIO_DECIMALS) /
            //   targetAmount +
            //   targetPrice;
            return new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
                .minus(liquidation)
                .multipliedBy(margin)
                .dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).dividedBy(targetAmount).plus(targetPrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static stopLossPrice(isLong, positionType, stopLossPrice, stopLoss, margin, targetAmount, targetPrice) {
        if (isLong) {
            // if (openPositionArgs.positionType == CONST.POSITION_TYPE_BOOST) {
            //                     openPositionArgs.stopLossPrice = uint256(0);
            //                 } else {
            //                     openPositionArgs.stopLossPrice =
            //                         targetPrice -
            //                         (((100 * 10 ** CONST.RATIO_DECIMALS - openTrade.stopLoss) * margin) /
            //                             (100 * 10 ** CONST.RATIO_DECIMALS) /
            //                             targetAmount);
            //                 }
            if (positionType == vo_1.CONST.POSITION_TYPE_BOOST) {
                return new bignumber_js_1.default(0).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            }
            else {
                return new bignumber_js_1.default(targetPrice)
                    .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
                    .minus(stopLoss).multipliedBy(margin).dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                    .dp(0, bignumber_js_1.default.ROUND_DOWN)
                    .dividedBy(targetAmount)
                    .dp(0, bignumber_js_1.default.ROUND_DOWN)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            }
        }
        else {
            //   if (openPositionArgs.positionType == CONST.POSITION_TYPE_BOOST) {
            //                     openPositionArgs.stopLossPrice = type(uint256).max;
            //                 } else {
            //                     openPositionArgs.stopLossPrice =
            //                         ((100 * 10 ** CONST.RATIO_DECIMALS - openTrade.stopLoss) * margin) /
            //                         (100 * 10 ** CONST.RATIO_DECIMALS) /
            //                         targetAmount +
            //                         targetPrice;
            //                 }
            if (positionType == vo_1.CONST.POSITION_TYPE_BOOST) {
                return new bignumber_js_1.default(2).pow(256).minus(1).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            }
            else {
                return new bignumber_js_1.default(100)
                    .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
                    .minus(stopLoss).multipliedBy(margin)
                    .dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                    .dp(0, bignumber_js_1.default.ROUND_DOWN)
                    .dividedBy(targetAmount)
                    .dp(0, bignumber_js_1.default.ROUND_DOWN)
                    .plus(targetPrice)
                    .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            }
        }
    }
    //  (openPositionArgs.tokenAmount * tokenPrice * (10 ** CONST.QTY_DECIMALS)) / (10 ** decimals)
    static entryValue(tokenAmount, tokenPrice, decimals) {
        return new bignumber_js_1.default(tokenAmount)
            .multipliedBy(tokenPrice)
            .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS))
            .dividedBy(new bignumber_js_1.default(10).pow(decimals))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    static pnl(isLong, targetAmount, openPrice, targetPrice) {
        const targetOpenValue = new bignumber_js_1.default(targetAmount).multipliedBy(openPrice);
        const targetCloseValue = new bignumber_js_1.default(targetAmount).multipliedBy(targetPrice);
        if (isLong) {
            return new bignumber_js_1.default(targetCloseValue).minus(targetOpenValue).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            return new bignumber_js_1.default(targetOpenValue).minus(targetCloseValue).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static tokenAmount(remainValue, tokenPrice, decimals) {
        return new bignumber_js_1.default(remainValue)
            .multipliedBy(new bignumber_js_1.default(10).pow(decimals))
            .dividedBy(tokenPrice)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
}
exports.MarketTradeMath = MarketTradeMath;
