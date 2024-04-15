"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const Constant_1 = require("../../Constant");
const QUOTE_TOKEN = "USD";
class TradeEventBus extends wallet_1.EventBus {
    emitAll(eventName, data) {
        super.emit(`${eventName}`, data);
        for (let i = 1; i <= 20; i++) {
            super.emit(`${eventName}_${i}`, data);
        }
    }
    removeAll(eventName) {
        super.resetOff(`${eventName}`);
        for (let i = 1; i <= 20; i++) {
            super.resetOff(`${eventName}_${i}`);
        }
    }
}
exports.TradeEventBus = TradeEventBus;
TradeEventBus.TOPIC_PRE_OPEN_POSITION = "preOpenPosition";
TradeEventBus.TOPIC_PAIR_PRICE = "pairPrice";
TradeEventBus.TOPIC_ALL_PRICE = "allPrice";
TradeEventBus.TOPIC_KLINE = "pairKline";
TradeEventBus.TOPIC_POSITIONS = "TOPIC_POSITIONS";
TradeEventBus.SYS_TOPIC_TICKS_UPDATE = "SYS_TOPIC_TICKS_UPDATE";
TradeEventBus.SYS_TOPIC_POSITIONS = "SYS_TOPIC_POSITIONS";
const tradeEventBus = new TradeEventBus();
const timeIdManger = {
    tickUpdate: undefined,
    positionUpdate: undefined
};
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
        return targets.targetName.map((it, index) => {
            const data = {
                base: it,
                baseLogo: `${addressInfo.baseApiUrl}/static/${it.toLowerCase()}.png`,
                quote: QUOTE_TOKEN,
                quoteLogo: `${addressInfo.baseApiUrl}/static/${QUOTE_TOKEN.toLowerCase()}.png`,
                targetId: targets.assetID[index],
                chainType: chainType,
                priceId: targets.priceID[index]
            };
            return data;
        });
    }
    async targetTicks(chainType) {
        const addressInfo = (0, Constant_1.getCurrentAddressInfo)();
        const targets = await ApiProvider_1.apiProvider.tradeApi().pairs(chainType);
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.base] = it;
            return acc;
        }, {});
        return (await ApiProvider_1.apiProvider.serverApi().ticks()).map(it => {
            const targetsMapElement = targetsMap[it.symbol];
            if (!targetsMapElement) {
                return undefined;
            }
            const targetsTick = {
                base: it.symbol,
                baseLogo: `${addressInfo.baseApiUrl}/static/${it.symbol.toLowerCase()}.png`,
                quote: QUOTE_TOKEN,
                quoteLogo: `${addressInfo.baseApiUrl}/static/${QUOTE_TOKEN.toLowerCase()}.png`,
                open: it.open,
                close: it.close,
                high: it.high,
                low: it.low,
                volume: it.volume,
                priceChangePercent: it.priceChangePercent,
                priceChange: it.priceChange,
                chainType: targetsMapElement.chainType,
                targetId: targetsMapElement.targetId
            };
            return targetsTick;
        }).filter(it => it !== undefined);
    }
    async targetTickMap(chainType) {
        const ticksMaps = (await this.targetTicks(chainType)).reduce((acc, it) => {
            acc[it.base] = it;
            return acc;
        }, {});
        return ticksMaps;
    }
    startTickUpdateEvent(chainType) {
        if (timeIdManger.tickUpdate) {
            clearTimeout(timeIdManger.tickUpdate);
        }
        timeIdManger.tickUpdate = setTimeout(async () => {
            try {
                const targetTicks = await this.targetTickMap(chainType);
                tradeEventBus.emitAll(TradeEventBus.SYS_TOPIC_TICKS_UPDATE, targetTicks);
            }
            finally {
                this.startTickUpdateEvent(chainType);
            }
        }, 1000);
    }
    startPositionEvent() {
        if (timeIdManger.positionUpdate) {
            clearTimeout(timeIdManger.positionUpdate);
        }
        timeIdManger.positionUpdate = setTimeout(() => {
            try {
                tradeEventBus.emitAll(TradeEventBus.SYS_TOPIC_POSITIONS, []);
            }
            finally {
                this.startPositionEvent();
            }
        }, 3000);
    }
    startEvent(chainType) {
        this.startTickUpdateEvent(chainType);
        this.startPositionEvent();
    }
    async tradeInfo(chainType, targetName) {
        this.startEvent(chainType);
        const targetConfig = {
            targetType: "0",
            openFeeRate: "100",
            closeFeeRate: "100",
            execFeeValue: new bignumber_js_1.default("5").multipliedBy(1e17).toFixed(),
            maxOpenInterestLong: new bignumber_js_1.default(1e6).multipliedBy(1e18).toFixed(),
            maxOpenInterestShort: new bignumber_js_1.default(1e6).multipliedBy(1e18).toFixed(),
        };
        const targetTicks = await this.targetTickMap(chainType);
        const targetTick = targetTicks[targetName];
        if (targetTick === undefined) {
            throw new Error("target not found");
        }
        const TOPIC_PRE_OPEN_POSITION_ID = `${TradeEventBus.TOPIC_PRE_OPEN_POSITION}_${targetName}`;
        const TOPIC_PAIR_PRICE_ID = `${TradeEventBus.TOPIC_PAIR_PRICE}_${targetName}`;
        const TOPIC_PAIR_KLINE_ID = `${TradeEventBus.TOPIC_KLINE}_${targetName}`;
        const cache = {
            preOpenPositionParams: undefined,
            topicAccount: undefined,
            currentPositions: undefined,
            period: undefined,
            eventIds: new Set()
        };
        const tradeInfo = {
            topicPreOpenPosition: (eventId, func) => {
                const eventName = `${TOPIC_PRE_OPEN_POSITION_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tradeEventBus.resetOn(eventName, func);
            },
            topicPairPrice: (eventId, func) => {
                const eventName = `${TOPIC_PAIR_PRICE_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tradeEventBus.resetOn(eventName, func);
            },
            topicAllPrice: (eventId, func) => {
                const eventName = `${TradeEventBus.TOPIC_ALL_PRICE}_${eventId}`;
                cache.eventIds.add(eventName);
                tradeEventBus.resetOn(eventName, func);
            },
            topicKline(eventId, func) {
                const eventName = `${TOPIC_PAIR_KLINE_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tradeEventBus.resetOn(eventName, func);
            },
            kline: async (period) => {
                cache.period = period;
                const klineData = await ApiProvider_1.apiProvider.serverApi().klines(targetName, period, 0, 0, 1000);
                return klineData.map(it => {
                    const k = {
                        timestamp: parseInt(it.time),
                        open: parseFloat(it.open),
                        close: parseFloat(it.close),
                        high: parseFloat(it.high),
                        low: parseFloat(it.low),
                        volume: parseFloat(it.volume)
                    };
                    return k;
                });
            },
            topicPositions: (eventId, func) => {
                const eventName = `${TradeEventBus.TOPIC_POSITIONS}_${eventId}`;
                cache.eventIds.add(eventName);
                tradeEventBus.resetOn(eventName, func);
            },
            preOpenPosition: (params) => {
                cache.preOpenPositionParams = params;
                return this.preOpenPosition(params, tradeInfo.targetsTick, targetConfig);
            },
            open: async (connectInfo) => {
                if (cache.preOpenPositionParams === undefined) {
                    throw new Error("preOpenPositionParams is undefined");
                }
                return this.openPosition(connectInfo, cache.preOpenPositionParams, tradeInfo.targetsTick);
            },
            tokens: async (account) => {
                return this.tokens(chainType, account);
            },
            tokenBalance: [],
            klineData: [],
            targetsTick: targetTick,
            targetsTicks: Object.values(targetTicks),
            targetsTickMap: targetTicks,
            approve: async (tokenPriceBalance, connectInfo) => {
                return tokenPriceBalance.balance.approve(connectInfo);
            },
            positionHistories: async (account, page, pageSize) => {
                if (!account) {
                    return {
                        total: 0,
                        list: []
                    };
                }
                const positions = await this.positionHistories(chainType, account, page, pageSize);
                return positions;
            },
            positions: async (account) => {
                cache.topicAccount = account;
                const positions = account ? await this.positions(tradeInfo.targetsTickMap, chainType, account) : [];
                cache.currentPositions = positions;
                return positions;
            },
            closePosition: async (positionHash, connectInfo) => {
                return this.closePosition(positionHash, connectInfo);
            },
            closeTopic() {
                cache.eventIds.forEach(it => {
                    tradeEventBus.resetOff(it);
                });
                tradeEventBus.removeAll(TOPIC_PRE_OPEN_POSITION_ID);
                tradeEventBus.removeAll(TOPIC_PAIR_PRICE_ID);
            }
        };
        const SYS_TOPIC_TICKS_UPDATE = (data) => {
            tradeInfo.targetsTick = data[targetName];
            tradeInfo.targetsTicks = Object.values(data);
            tradeInfo.targetsTickMap = data;
            tradeEventBus.emitAll(TradeEventBus.TOPIC_ALL_PRICE, tradeInfo.targetsTicks);
            tradeEventBus.emitAll(TOPIC_PAIR_PRICE_ID, tradeInfo.targetsTick);
            if (cache.preOpenPositionParams) {
                const preOpenPosition = tradeInfo.preOpenPosition(cache.preOpenPositionParams);
                tradeEventBus.emitAll(TOPIC_PRE_OPEN_POSITION_ID, preOpenPosition);
            }
            if (cache.currentPositions) {
                cache.currentPositions.forEach(it => {
                    this.updatePnl(it, data);
                });
                tradeEventBus.emitAll(TradeEventBus.TOPIC_POSITIONS, cache.currentPositions);
            }
            if (cache.period) {
                tradeInfo.kline(cache.period)
                    .then(klineData => {
                    tradeInfo.klineData = klineData;
                    tradeEventBus.emitAll(TOPIC_PAIR_KLINE_ID, klineData);
                });
            }
        };
        const SYS_TOPIC_POSITIONS = async () => {
            if (cache.topicAccount) {
                await tradeInfo.positions(cache.topicAccount);
                tradeEventBus.emitAll(TradeEventBus.TOPIC_POSITIONS, cache.currentPositions);
            }
        };
        // 订阅处理
        tradeEventBus.resetOn(TradeEventBus.SYS_TOPIC_TICKS_UPDATE, SYS_TOPIC_TICKS_UPDATE);
        tradeEventBus.resetOn(TradeEventBus.SYS_TOPIC_POSITIONS, SYS_TOPIC_POSITIONS);
        const oldClose = tradeInfo.closeTopic;
        tradeInfo.closeTopic = () => {
            oldClose();
            tradeEventBus.off(TradeEventBus.SYS_TOPIC_TICKS_UPDATE, SYS_TOPIC_TICKS_UPDATE);
            tradeEventBus.off(TradeEventBus.SYS_TOPIC_POSITIONS, SYS_TOPIC_POSITIONS);
        };
        return tradeInfo;
    }
    async positionHistories(chainType, userAddress, page = 1, pageSize = 1000) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(abi_1.PositionServiceContract);
        const currentPage = page - 1;
        const [[{ count, positionHistories }], targets] = await Promise.all([
            connectInfo.multiCall().callObj({
                positionHistories: positionServiceContract.multicall_listHistoryPosition(userAddress, currentPage, pageSize),
                count: positionServiceContract.multicall_getHistoryPositionCount(userAddress)
            }),
            ApiProvider_1.apiProvider.tradeApi().pairs(chainType)
        ]);
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.targetId] = it;
            return acc;
        }, {});
        return {
            total: parseInt(count),
            list: positionHistories.map(it => {
                const initialMargin = new bignumber_js_1.default(it.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                const pnl = new bignumber_js_1.default(it.pnl).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                const positionData = this.positionRecordAbiResultToPositionData(it, targetsMap);
                positionData.pnl = pnl;
                positionData.pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
                return positionData;
            }).reverse()
        };
    }
    async positions(tickPrices, chainType, userAddress) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(abi_1.PositionServiceContract);
        const result = [];
        let page = 0;
        const pageSize = 1000;
        const targets = await ApiProvider_1.apiProvider.tradeApi().pairs(chainType);
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.targetId] = it;
            return acc;
        }, {});
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const [{ positionHistories }] = await connectInfo.multiCall().callObj({
                positionHistories: positionServiceContract.multicall_listLivePosition(userAddress, page, pageSize)
            });
            result.push(...positionHistories);
            if (positionHistories.length < pageSize) {
                break;
            }
            page++;
        }
        return result.map(it => {
            const positionData = this.positionRecordAbiResultToPositionData(it, targetsMap);
            this.updatePnl(positionData, tickPrices);
            return positionData;
        }).reverse();
    }
    updatePnl(positionData, tickPrices) {
        const tickPrice = tickPrices[positionData.base];
        const initialMargin = positionData.initialMargin;
        const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.openPrice, new bignumber_js_1.default(tickPrice.close).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
        const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
        positionData.pnl = pnl;
        positionData.pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
        positionData.stopLossPrice = positionData.liqPrice;
    }
    positionRecordAbiResultToPositionData(positionRecordAbiResult, pairs) {
        const target = pairs[positionRecordAbiResult.target];
        const base = target ? target.base : "unknown";
        const initialMargin = new bignumber_js_1.default(positionRecordAbiResult.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
        const positionData = {
            positionHash: positionRecordAbiResult.positionHash,
            base,
            quote: QUOTE_TOKEN,
            leverage: new bignumber_js_1.default(positionRecordAbiResult.leverage).div(1e2).dividedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN),
            isLong: positionRecordAbiResult.isLong,
            initialMargin: initialMargin,
            size: new bignumber_js_1.default(positionRecordAbiResult.targetAmount).multipliedBy(positionRecordAbiResult.openPrice).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(),
            entryPrice: new bignumber_js_1.default(positionRecordAbiResult.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            markPrice: new bignumber_js_1.default(positionRecordAbiResult.openPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            liqPrice: new bignumber_js_1.default(positionRecordAbiResult.liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            pnl: "0",
            pnlRate: "0",
            liquidLostRate: new bignumber_js_1.default(100).minus(new bignumber_js_1.default(vo_1.CONST.LIQUIDATION).div(10 ** vo_1.CONST.RATIO_DECIMALS)).toFixed(),
            fundingFee: new bignumber_js_1.default(positionRecordAbiResult.executionFee).plus(positionRecordAbiResult.openFee).plus(positionRecordAbiResult.closeFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            takeProfitPrice: new bignumber_js_1.default(positionRecordAbiResult.takeProfitPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            stopLossPrice: new bignumber_js_1.default(positionRecordAbiResult.stopLossPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            openTimeStamp: positionRecordAbiResult.openTimeStamp,
            sourceData: positionRecordAbiResult
        };
        return positionData;
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
    async openPosition(connectInfo, preOpenPositionParams, targetTick) {
        const chainInfo = connectInfo.chainInfo();
        const marketTradeServicesContract = connectInfo.create(abi_1.MarketTradeServicesContract);
        const isLong = preOpenPositionParams.isLong;
        const targetId = targetTick.targetId;
        const tokenId = preOpenPositionParams.balance.tokenId;
        const tokenAmount = new bignumber_js_1.default(preOpenPositionParams.inputAmount)
            .multipliedBy(10 ** preOpenPositionParams.balance.balance.token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const leverage = new bignumber_js_1.default(preOpenPositionParams.leverage).multipliedBy(1e2).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const takeProfit = new bignumber_js_1.default(preOpenPositionParams.takeProfit).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const priceFeedsUpdateData = await ApiProvider_1.apiProvider.pythApi().priceFeedsUpdateDataByTokens([
            preOpenPositionParams.balance.balance.token.symbol,
            targetTick.base
        ]);
        const transactionEvent = await marketTradeServicesContract.openBoostTrade(isLong, targetId, tokenId, tokenAmount, leverage, takeProfit, priceFeedsUpdateData);
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
        return;
    }
    async closePosition(positionHash, connectInfo) {
        const chainInfo = connectInfo.chainInfo();
        const marketTradeServicesContract = connectInfo.create(abi_1.MarketTradeServicesContract);
        const positionServiceContract = connectInfo.create(abi_1.PositionServiceContract);
        const [{ priceIds }] = await connectInfo.multiCall().callObj({
            priceIds: positionServiceContract.multicall_getPostionPriceIDs(positionHash),
        });
        const priceFeedsUpdateData = await ApiProvider_1.apiProvider.pythApi().priceFeedsUpdateDataByPriceIds(priceIds);
        const transactionEvent = await marketTradeServicesContract.closeBoostTrade(positionHash, priceFeedsUpdateData);
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
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [[...prices], balances] = await Promise.all([
            connectInfo.multiCall().callObj(...vaultTokens.map(it => {
                return {
                    price: pythApi.priceBySymbol(it.token.symbol)
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
                price: new bignumber_js_1.default(prices[index].price).div(1e8).toFixed(),
                balance: balances[index],
            };
        });
    }
};
exports.TradeApi = TradeApi;
__decorate([
    (0, tool_1.MethodCache)("TradeApi.pairs.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeApi.prototype, "pairs", null);
exports.TradeApi = TradeApi = __decorate([
    (0, tool_1.CacheKey)('TradeApi')
], TradeApi);
