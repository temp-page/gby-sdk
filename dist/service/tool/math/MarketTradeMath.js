"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketTradeMath = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const vo_1 = require("../../vo/");
class MarketTradeMath {
    static margin(tokenAmount, tokenPrice, decimals, execFeeValue) {
        return new bignumber_js_1.default(tokenAmount)
            .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS))
            .multipliedBy(tokenPrice)
            .dividedBy(new bignumber_js_1.default(10).pow(decimals))
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .minus(execFeeValue)
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    static notionalPositionValue(margin, leverage) {
        return new bignumber_js_1.default(margin)
            .multipliedBy(leverage)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS).multipliedBy(100))
            .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    //uint256 executeFeeByTokenAmount = ((targetConfig.execFeeValue) * (10 ** decimals)) /
    //             tokenPrice /
    //             (10 ** CONST.QTY_DECIMALS);
    static executeFeeByTokenAmount(execFeeValue, decimals, tokenPrice) {
        return new bignumber_js_1.default(execFeeValue)
            .multipliedBy(new bignumber_js_1.default(10).pow(decimals))
            .dividedBy(tokenPrice)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS)).dp(0, bignumber_js_1.default.ROUND_DOWN).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
    }
    //  ((openFee + closeFee) * (10 ** decimals)) / tokenPrice / (10 ** CONSTANT.QTY_DECIMALS);
    static feeByTokenAmount(openFee, closeFee, decimals, tokenPrice) {
        return new bignumber_js_1.default(openFee)
            .plus(closeFee)
            .multipliedBy(new bignumber_js_1.default(10).pow(decimals))
            .dividedBy(tokenPrice)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS)).dp(0, bignumber_js_1.default.ROUND_DOWN).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
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
            // takeProfitPrice =
            //   ((takeProfitRate - 100 * 10 ** CONSTANT.RATIO_DECIMALS) * margin) /
            //   (100 * 10 ** CONSTANT.RATIO_DECIMALS) /
            //   targetAmount +
            //   targetPrice;
            return new bignumber_js_1.default(takeProfit).minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).multipliedBy(margin).dividedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).dividedBy(targetAmount)
                .plus(targetPrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            // takeProfitPrice =
            //   targetPrice -
            //   (((takeProfitRate - 100 * 10 ** CONSTANT.RATIO_DECIMALS) * margin) / (100 * 10 ** CONSTANT.RATIO_DECIMALS) / targetAmount);
            return new bignumber_js_1.default(targetPrice)
                .minus(new bignumber_js_1.default(takeProfit).minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))).multipliedBy(margin)
                .div(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(targetAmount)
                .dp(0, bignumber_js_1.default.ROUND_DOWN))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static takeProfit(isLong, takeProfitPrice, margin, targetAmount, targetPrice) {
        if (isLong) {
            // takeProfitPrice =
            //   ((takeProfitRate - 100 * 10 ** CONSTANT.RATIO_DECIMALS) * margin) /
            //   (100 * 10 ** CONSTANT.RATIO_DECIMALS) /
            //   targetAmount +
            //   targetPrice;
            return new bignumber_js_1.default(takeProfitPrice).minus(targetPrice).multipliedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)).multipliedBy(targetAmount))
                .div(margin)
                .plus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .toFixed();
        }
        else {
            // takeProfitPrice =
            //   targetPrice -
            //   (((takeProfitRate - 100 * 10 ** CONSTANT.RATIO_DECIMALS) * margin) / (100 * 10 ** CONSTANT.RATIO_DECIMALS) / targetAmount);
            return new bignumber_js_1.default(targetPrice).minus(takeProfitPrice).multipliedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)).multipliedBy(targetAmount))
                .div(margin)
                .plus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .toFixed();
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
    static stopLossPrice(isLong, stopLoss, margin, targetAmount, targetPrice) {
        if (isLong) {
            // stopLossPrice =
            //                     targetPrice -
            //                     (((100 * 10 ** CONSTANT.RATIO_DECIMALS - stopLoseRate) * margin) / (100 * 10 ** CONSTANT.RATIO_DECIMALS) / targetAmount);
            return new bignumber_js_1.default(targetPrice)
                .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
                .minus(stopLoss).multipliedBy(margin)
                .div(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .dividedBy(targetAmount)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            //       stopLossPrice =
            //                     ((100 * 10 ** CONSTANT.RATIO_DECIMALS - stopLoseRate) * margin) /
            //                     (100 * 10 ** CONSTANT.RATIO_DECIMALS) /
            //                     targetAmount +
            //                     targetPrice;
            return new bignumber_js_1.default(100)
                .multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS))
                .minus(stopLoss).multipliedBy(margin)
                .div(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(targetAmount)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .plus(targetPrice)
                .toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static stopLossRate(isLong, stopLossPrice, margin, targetAmount, targetPrice) {
        if (isLong) {
            return new bignumber_js_1.default(targetPrice)
                .minus(stopLossPrice)
                .multipliedBy(targetAmount)
                .multipliedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .div(margin)
                .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .multipliedBy(-1)
                .toFixed();
        }
        else {
            return new bignumber_js_1.default(stopLossPrice)
                .minus(targetPrice)
                .multipliedBy(targetAmount)
                .multipliedBy(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .div(margin)
                .minus(new bignumber_js_1.default(100).multipliedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS)))
                .multipliedBy(-1)
                .toFixed();
        }
    }
    static pnl(isLong, targetAmount, openPrice, targetPrice, marginAmount) {
        const targetOpenValue = new bignumber_js_1.default(targetAmount).multipliedBy(openPrice);
        const targetCloseValue = new bignumber_js_1.default(targetAmount).multipliedBy(targetPrice);
        let pnl;
        if (isLong) {
            pnl = new bignumber_js_1.default(targetCloseValue).minus(targetOpenValue).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            pnl = new bignumber_js_1.default(targetOpenValue).minus(targetCloseValue).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        /*if (new BigNumber(pnl).plus(marginAmount).comparedTo("0") > 0){
          return pnl
        }else {
          return new BigNumber(marginAmount).negated().toFixed();
        }*/
        return pnl;
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
    static initTargetFundingFeeRate(targetTick, getTargetConfig) {
        //fundingFeePerBlockTimeP * 1e18 * 1 * 60 * 60  / 1e10 / 1e18
        const delta = new bignumber_js_1.default(targetTick.longAmount).minus(new bignumber_js_1.default(targetTick.shortAmount)).multipliedBy(1e10).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        let fundingFeeRate = new bignumber_js_1.default(delta).multipliedBy(getTargetConfig.fundingFeePerBlockP).div(1e10).dp(0, bignumber_js_1.default.ROUND_DOWN).toFixed();
        fundingFeeRate = bignumber_js_1.default.min(getTargetConfig.maxFundingFeeRate, bignumber_js_1.default.max(getTargetConfig.minFundingFeeRate, fundingFeeRate)).toFixed();
        const fundingRateLong = new bignumber_js_1.default(targetTick.longOI).eq("0") ? "0" : new bignumber_js_1.default(delta).multipliedBy(fundingFeeRate)
            .multipliedBy(3600)
            .div(1e18).div(new bignumber_js_1.default(targetTick.longOI)).multipliedBy(100).multipliedBy(-1).toFixed();
        //  fundingRateShort =fundingRate  *  （ShortOI  - LongOI） / ShortOI
        const fundingRateShort = new bignumber_js_1.default(targetTick.shortOI).eq("0") ? "0" : new bignumber_js_1.default(delta).multipliedBy(fundingFeeRate)
            .multipliedBy(3600)
            .div(1e18).div(new bignumber_js_1.default(targetTick.shortOI)).multipliedBy(100).toFixed();
        targetTick.fundingRateLong = fundingRateLong;
        targetTick.fundingRateShort = fundingRateShort;
    }
    static calculatePriceThresholdRatio(margin, targetAmount, targetOpenPrice, takeProfitPrice, stopLossPrice, liquidPrice) {
        const ONE_HUNDRED = new bignumber_js_1.default(100);
        const DECIMAL_FACTOR = new bignumber_js_1.default(10).pow(vo_1.CONST.RATIO_DECIMALS);
        let takeProfitRate, stopLoseRate, liquidationRate;
        if (new bignumber_js_1.default(takeProfitPrice).comparedTo(targetOpenPrice) > 0) {
            takeProfitRate = new bignumber_js_1.default(takeProfitPrice)
                .minus(targetOpenPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP)
                .plus(ONE_HUNDRED.multipliedBy(DECIMAL_FACTOR));
        }
        else {
            takeProfitRate = new bignumber_js_1.default(targetOpenPrice)
                .minus(takeProfitPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP)
                .plus(ONE_HUNDRED.multipliedBy(DECIMAL_FACTOR));
        }
        if (new bignumber_js_1.default(stopLossPrice).comparedTo(targetOpenPrice) > 0) {
            stopLoseRate = ONE_HUNDRED
                .multipliedBy(DECIMAL_FACTOR)
                .minus(new bignumber_js_1.default(stopLossPrice)
                .minus(targetOpenPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP));
        }
        else {
            stopLoseRate = ONE_HUNDRED
                .multipliedBy(DECIMAL_FACTOR)
                .minus(new bignumber_js_1.default(targetOpenPrice)
                .minus(stopLossPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP));
        }
        if (new bignumber_js_1.default(liquidPrice).comparedTo(targetOpenPrice) > 0) {
            liquidationRate = ONE_HUNDRED
                .multipliedBy(DECIMAL_FACTOR)
                .minus(new bignumber_js_1.default(liquidPrice)
                .minus(targetOpenPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP));
        }
        else {
            liquidationRate = ONE_HUNDRED
                .multipliedBy(DECIMAL_FACTOR)
                .minus(new bignumber_js_1.default(targetOpenPrice)
                .minus(liquidPrice)
                .multipliedBy(ONE_HUNDRED)
                .multipliedBy(DECIMAL_FACTOR)
                .multipliedBy(targetAmount)
                .div(margin)
                .dp(0, bignumber_js_1.default.ROUND_HALF_UP));
        }
        return {
            takeProfitRate: takeProfitRate.toFixed(0, bignumber_js_1.default.ROUND_DOWN),
            stopLoseRate: stopLoseRate.toFixed(0, bignumber_js_1.default.ROUND_DOWN),
            liquidationRate: liquidationRate.toFixed(0, bignumber_js_1.default.ROUND_DOWN)
        };
    }
}
exports.MarketTradeMath = MarketTradeMath;
