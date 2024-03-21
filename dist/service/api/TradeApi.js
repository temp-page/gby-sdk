"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeApi = exports.TradeEventBus = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const ApiProvider_1 = require("./provider/ApiProvider");
const abi_1 = require("../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const TargetServiceContract_1 = require("../abi/TargetServiceContract");
const wallet_1 = require("../../wallet");
const BasicException_1 = require("../../BasicException");
const ethers5_1 = require("ethers5");
const QUOTE_TOKEN = "USD";
class TradeEventBus extends wallet_1.EventBus {
    emitAll(eventName, data) {
        for (let i = 1; i <= 20; i++) {
            super.emit(`${eventName}_${i}`, data);
        }
    }
}
exports.TradeEventBus = TradeEventBus;
TradeEventBus.TOPIC_PRE_OPEN_POSITION = "preOpenPosition";
TradeEventBus.TOPIC_PAIR_PRICE = "pairPrice";
TradeEventBus.TOPIC_ALL_PRICE = "allPrice";
TradeEventBus.TOPIC_TICKS_UPDATE = "TICKS_UPDATE";
TradeEventBus.TOPIC_POSITIONS = "TOPIC_POSITIONS";
TradeEventBus.TOPIC_POSITIONS_HISTORIES = "TOPIC_POSITIONS_HISTORIES";
const tradeEventBus = new TradeEventBus();
let timeId = undefined;
let TradeApi = class TradeApi {
    async pairs(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const targetServiceContract = connectInfo.create(TargetServiceContract_1.TargetServiceContract);
        const [{ targets }] = await connectInfo.multiCall()
            .callObj({
            targets: targetServiceContract.multicall_listTarget()
        });
        return targets[0].map((it, index) => {
            return {
                base: it,
                quote: QUOTE_TOKEN,
                targetId: targets[1][index],
                chainType: chainType
            };
        });
    }
    async targetTicks() {
        return (await ApiProvider_1.apiProvider.serverApi().ticks()).map(it => {
            const targetsTick = {
                base: it.symbol,
                quote: QUOTE_TOKEN,
                open: it.open,
                close: it.close,
                high: it.high,
                low: it.low,
                volume: "0",
                priceChangePercent: it.priceChangePercent,
                priceChange: it.priceChange,
            };
            return targetsTick;
        });
    }
    startTickUpdateEvent() {
        if (timeId) {
            clearTimeout(timeId);
            timeId = undefined;
        }
        timeId = setTimeout(async () => {
            try {
                const targetTicks = await this.targetTicks();
                tradeEventBus.emit(TradeEventBus.TOPIC_TICKS_UPDATE, targetTicks);
            }
            finally {
                this.startTickUpdateEvent();
            }
        }, 3000);
    }
    async tradeInfo(target) {
        this.startTickUpdateEvent();
        // const chainType = target.chainType
        // const addressInfo = BASE_API.address();
        // const chainInfo = addressInfo.getChainInfo(chainType);
        // const connectInfo = BASE_API.connectInfo(chainInfo);
        // const targetServiceContract = connectInfo.create(TargetServiceContract);
        const targetConfig = {
            targetType: "0",
            openFeeRate: "100",
            closeFeeRate: "100",
            execFeeValue: new bignumber_js_1.default("5").multipliedBy(1e17).toFixed(),
            maxOpenInterestLong: new bignumber_js_1.default(1e6).multipliedBy(1e18).toFixed(),
            maxOpenInterestShort: new bignumber_js_1.default(1e6).multipliedBy(1e18).toFixed(),
        };
        const targetTicks = await this.targetTicks();
        const targetTick = targetTicks.find(it => it.base === target.base);
        if (targetTick === undefined) {
            throw new Error("target not found");
        }
        const TOPIC_PRE_OPEN_POSITION_ID = `${TradeEventBus.TOPIC_PRE_OPEN_POSITION}_${target.base}`;
        const TOPIC_PAIR_PRICE_ID = `${TradeEventBus.TOPIC_PAIR_PRICE}_${target.base}`;
        let preOpenPositionParams = undefined;
        const tradeInfo = {
            topicPreOpenPosition: (eventId, func) => {
                tradeEventBus.resetOn(`${TOPIC_PRE_OPEN_POSITION_ID}_${target.base}_${eventId}`, func);
            },
            topicPairPrice: (eventId, func) => {
                tradeEventBus.resetOn(`${TOPIC_PAIR_PRICE_ID}_${eventId}`, func);
            },
            topicAllPrice: (eventId, func) => {
                tradeEventBus.resetOn(`${TradeEventBus.TOPIC_ALL_PRICE}_${eventId}`, func);
            },
            preOpenPosition: (params) => {
                preOpenPositionParams = params;
                return this.preOpenPosition(params, tradeInfo.targetsTick, targetConfig);
            },
            open: async (connectInfo) => {
                if (preOpenPositionParams === undefined) {
                    throw new Error("preOpenPositionParams is undefined");
                }
                return this.openPosition(preOpenPositionParams, target, connectInfo);
            },
            tokens: async (account) => {
                return this.tokens(target.chainType, account);
            },
            tokenBalance: [],
            targetsTick: targetTick,
            targetsTicks: targetTicks,
            approve: async (tokenPriceBalance, connectInfo) => {
                return tokenPriceBalance.balance.approve(connectInfo);
            },
            positionHistories: [],
            positions: [],
            topicPositions: (eventId, func) => {
                tradeEventBus.resetOn(`${TradeEventBus.TOPIC_POSITIONS}_${eventId}`, func);
            },
            topicPositionHistories(eventId, func) {
                tradeEventBus.resetOn(`${TradeEventBus.TOPIC_POSITIONS_HISTORIES}_${eventId}`, func);
            },
            closePosition: async (positionHash, connectInfo) => {
                return this.closePosition(positionHash, connectInfo);
            }
        };
        // 订阅处理
        tradeEventBus.resetOn(TradeEventBus.TOPIC_TICKS_UPDATE, (data) => {
            tradeInfo.targetsTick = targetTicks.find(it => it.base === target.base);
            tradeInfo.targetsTicks = data;
            tradeEventBus.emitAll(TradeEventBus.TOPIC_ALL_PRICE, tradeInfo.targetsTicks);
            tradeEventBus.emitAll(TOPIC_PAIR_PRICE_ID, tradeInfo.targetsTick);
            if (preOpenPositionParams) {
                const preOpenPosition = tradeInfo.preOpenPosition(preOpenPositionParams);
                tradeEventBus.emitAll(TOPIC_PRE_OPEN_POSITION_ID, preOpenPosition);
            }
        });
        return tradeInfo;
    }
    async positionHistories(chainType, userAddress, page = 1, pageSize = 1000) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(abi_1.PositionServiceContract);
        const result = await connectInfo.multiCall().callObj({
            // positionHistories: positionServiceContract.multicall_listHistoryPositionByPage(userAddress, page, pageSize)
            positionHistories: positionServiceContract.multicall_listHistoryPositionByAccount(userAddress)
        });
        return result[0].positionHistories.map(it => {
            const base = ethers5_1.ethers.utils.parseBytes32String(it.target);
            const initialMargin = new bignumber_js_1.default(it.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed();
            const pnl = new bignumber_js_1.default(it.pnl).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed();
            const positionData = {
                positionHash: it.positionHash,
                base,
                quote: QUOTE_TOKEN,
                leverage: new bignumber_js_1.default(it.leverage).div(1e2).dividedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN),
                isLong: it.isLong,
                initialMargin: initialMargin,
                size: new bignumber_js_1.default(it.tokenAmount).multipliedBy(it.openPrice).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed(),
                entryPrice: new bignumber_js_1.default(it.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                markPrice: new bignumber_js_1.default(it.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                liqPrice: new bignumber_js_1.default(it.liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                pnl: pnl,
                pnlRate: pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN),
                liquidLostRate: new bignumber_js_1.default(100).minus(new bignumber_js_1.default(vo_1.CONST.LIQUIDATION).div(10 ** vo_1.CONST.RATIO_DECIMALS)).multipliedBy(100).toFixed(),
                fundingFee: new bignumber_js_1.default(it.executionFee).plus(it.openFee).plus(it.closeFee).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                takeProfitPrice: new bignumber_js_1.default(it.takeProfitPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                stopLossPrice: new bignumber_js_1.default(it.stopLossPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                openTimeStamp: it.openTimeStamp,
            };
            return positionData;
        });
    }
    async positions(tickPrice, chainType, userAddress, page = 1, pageSize = 1000) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(abi_1.PositionServiceContract);
        const [{ positionHistories }] = await connectInfo.multiCall().callObj({
            // positionHistories: positionServiceContract.multicall_listLivePositionByPage(userAddress, page, pageSize)
            positionHistories: positionServiceContract.multicall_listLivePositionByAccount(userAddress)
        });
        return positionHistories.map(it => {
            const base = ethers5_1.ethers.utils.parseBytes32String(it.target);
            const initialMargin = new bignumber_js_1.default(it.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed();
            const pnl = new bignumber_js_1.default(it.pnl).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed();
            const positionData = {
                positionHash: it.positionHash,
                base,
                quote: QUOTE_TOKEN,
                leverage: new bignumber_js_1.default(it.leverage).div(1e2).dividedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN),
                isLong: it.isLong,
                initialMargin: initialMargin,
                size: new bignumber_js_1.default(it.tokenAmount).multipliedBy(it.openPrice).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed(),
                entryPrice: new bignumber_js_1.default(it.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                markPrice: new bignumber_js_1.default(it.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                liqPrice: new bignumber_js_1.default(it.liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                pnl: pnl,
                pnlRate: pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN),
                liquidLostRate: new bignumber_js_1.default(100).minus(new bignumber_js_1.default(vo_1.CONST.LIQUIDATION).div(10 ** vo_1.CONST.RATIO_DECIMALS)).multipliedBy(100).toFixed(),
                fundingFee: new bignumber_js_1.default(it.executionFee).plus(it.openFee).plus(it.closeFee).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                takeProfitPrice: new bignumber_js_1.default(it.takeProfitPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                stopLossPrice: new bignumber_js_1.default(it.stopLossPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                openTimeStamp: it.openTimeStamp,
            };
            return positionData;
        });
    }
    preOpenPosition(preOpenPositionParams, tick, targetConfig) {
        const entryPrice = tick.close;
        const liquidation = vo_1.CONST.LIQUIDATION;
        const isLong = preOpenPositionParams.isLong;
        const targetPrice = new bignumber_js_1.default(entryPrice).multipliedBy(1e8).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const tokenPrice = new bignumber_js_1.default(preOpenPositionParams.balance.price).multipliedBy(1e8).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const tokenAmount = new bignumber_js_1.default(preOpenPositionParams.inputAmount).multipliedBy(10 ** preOpenPositionParams.balance.balance.token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const leverage = new bignumber_js_1.default(preOpenPositionParams.leverage).multipliedBy(1e2).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const margin = tool_1.MarketTradeMath.margin(tokenAmount, tokenPrice, preOpenPositionParams.balance.balance.token.decimals);
        const netTradeValue = tool_1.MarketTradeMath.netTradeValue(tokenAmount, leverage, tokenPrice, preOpenPositionParams.balance.balance.token.decimals);
        const openFee = tool_1.MarketTradeMath.openFee(margin, targetConfig.openFeeRate);
        const closeFee = tool_1.MarketTradeMath.closeFee(margin, targetConfig.closeFeeRate);
        // margin
        const finalMargin = tool_1.MarketTradeMath.finalMargin(margin, openFee, closeFee, targetConfig.execFeeValue);
        const finalNetTradeValue = tool_1.MarketTradeMath.finalNetTradeValue(netTradeValue, targetConfig.execFeeValue, openFee, closeFee);
        const targetAmount = tool_1.MarketTradeMath.targetAmount(finalNetTradeValue, targetPrice);
        const liquidPrice = tool_1.MarketTradeMath.liquidPrice(isLong, liquidation, margin, targetAmount, targetPrice);
        const liqPrice = new bignumber_js_1.default(liquidPrice).div(1e8).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        const openPosition = {
            entryPrice: entryPrice,
            liqPrice: liqPrice
        };
        return openPosition;
    }
    async openPosition(preOpenPositionParams, target, connectInfo) {
        const chainInfo = connectInfo.chainInfo();
        const addressInfo = connectInfo.addressInfo;
        const marketTradeServicesContract = connectInfo.create(abi_1.MarketTradeServicesContract);
        const isLong = preOpenPositionParams.isLong;
        const targetId = target.targetId;
        const tokenId = preOpenPositionParams.balance.tokenId;
        const tokenAmount = new bignumber_js_1.default(preOpenPositionParams.inputAmount)
            .multipliedBy(10 ** preOpenPositionParams.balance.balance.token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const leverage = new bignumber_js_1.default(preOpenPositionParams.leverage).multipliedBy(1e2).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const takeProfit = new bignumber_js_1.default(preOpenPositionParams.takeProfit).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const transactionCount = await addressInfo.readonlyConnectInfo(chainInfo).provider.getTransactionCount(connectInfo.account, "latest");
        const transactionEvent = await marketTradeServicesContract.openBoostTrade(isLong, targetId, tokenId, tokenAmount, leverage, takeProfit, new bignumber_js_1.default(transactionCount).toFixed());
        const openPositionEvent = {
            transactionEvent: transactionEvent,
            step1: async (txHash) => {
                const tx = new vo_1.TransactionEvent(connectInfo, txHash);
                await tx.confirm();
            },
            step2: async (txHash) => {
                await this.checkTradeState(txHash, chainInfo);
            }
        };
        return openPositionEvent;
    }
    async checkTradeState(txHash, chainInfo) {
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const tx = new vo_1.TransactionEvent(connectInfo, txHash);
        const transactionReceipt = await tx.confirm();
        let count = 200;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const tradeHash = transactionReceipt.logs[0].topics[1];
            const tradeEventDtos = await ApiProvider_1.apiProvider.serverApi().tradeEvents(tradeHash, chainInfo.chainName, 'TradeState');
            const tradeEventDto = tradeEventDtos.find(it => it.state === 1 || it.state === 2);
            if (tradeEventDto) {
                if (tradeEventDto.state === 2) {
                    throw new BasicException_1.BasicException("open position failed");
                }
                break;
            }
            else {
                await (0, tool_1.sleep)(2000);
                count--;
                if (count <= 0) {
                    throw new BasicException_1.BasicException("open position timeout");
                }
            }
        }
    }
    async closePosition(positionHash, connectInfo) {
        const chainInfo = connectInfo.chainInfo();
        const addressInfo = connectInfo.addressInfo;
        const marketTradeServicesContract = connectInfo.create(abi_1.MarketTradeServicesContract);
        const transactionCount = await addressInfo.readonlyConnectInfo(chainInfo).provider.getTransactionCount(connectInfo.account, "latest");
        const transactionEvent = await marketTradeServicesContract.closeBoostTrade(positionHash, new bignumber_js_1.default(transactionCount).toFixed());
        const closePositionEvent = {
            transactionEvent: transactionEvent,
            step1: async (txHash) => {
                const tx = new vo_1.TransactionEvent(connectInfo, txHash);
                await tx.confirm();
            },
            step2: async (txHash) => {
                await this.checkTradeState(txHash, chainInfo);
            }
        };
        return closePositionEvent;
    }
    async tokens(chainType, account = undefined) {
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const portalContract = connectInfo.create(abi_1.PortalContract);
        const [[...prices], balances] = await Promise.all([
            connectInfo.multiCall().callObj(...vaultTokens.map(it => {
                return {
                    price: portalContract.multicall_getPrice(it.assetID),
                };
            })),
            (async () => {
                if (account) {
                    const balances = await BaseApi_1.BASE_API.connectInfo(chainInfo).erc20().batchGetBalanceAndAllowance(account, chainInfo.GBU, vaultTokens.map(it => it.token));
                    return vaultTokens.map(it => balances[it.token.address]);
                }
                else {
                    return vaultTokens.map(it => vo_1.BalanceAndAllowance.unavailable(it.token));
                }
            })()
        ]);
        return vaultTokens.map((it, index) => {
            return {
                tokenId: it.assetID,
                price: new bignumber_js_1.default(prices[index].price[0]).div(1e8).toFixed(),
                balance: balances[index],
            };
        });
    }
};
exports.TradeApi = TradeApi;
exports.TradeApi = TradeApi = __decorate([
    (0, tool_1.CacheKey)('TradeApi')
], TradeApi);
