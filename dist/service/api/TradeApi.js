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
var TradeApi_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeApi = exports.BOOST = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const ApiProvider_1 = require("./provider/ApiProvider");
const contract_1 = require("../contract");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const Constant_1 = require("../../Constant");
const ServiceWs_1 = require("./ServiceWs");
const ethers6_1 = require("ethers6");
const QUOTE_TOKEN = "USD";
const timeIdManger = {
    tickUpdate: undefined,
    positionUpdate: undefined
};
exports.BOOST = 'BOOST';
let TradeApi = TradeApi_1 = class TradeApi {
    async pairs(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const targetServiceContract = connectInfo.create(contract_1.TargetServiceContract);
        const [{ targets }] = await connectInfo.multiCall()
            .callObj({
            targets: targetServiceContract.multicall.listTarget()
        });
        return targets.targetName.map((it, index) => {
            const baseAsset = it.replace(exports.BOOST, '');
            const data = {
                base: it,
                baseAsset: baseAsset,
                boost: it.lastIndexOf(exports.BOOST) > -1,
                baseLogo: `${addressInfo.baseApiUrl}/static/${baseAsset.toLowerCase()}.png`,
                quote: QUOTE_TOKEN,
                quoteLogo: `${addressInfo.baseApiUrl}/static/${QUOTE_TOKEN.toLowerCase()}.png`,
                targetId: targets.assetID[index],
                chainType: chainType,
                priceId: targets.priceID[index]
            };
            return data;
        });
    }
    async noCachePairs(chainType) {
        return this.pairs(chainType);
    }
    async targetTicks(chainType, all = true) {
        const addressInfo = (0, Constant_1.getCurrentAddressInfo)();
        const targets = await ApiProvider_1.apiProvider.tradeApi().pairs(chainType);
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.base] = it;
            return acc;
        }, {});
        return (await ApiProvider_1.apiProvider.serverApi().ticks(all)).map(it => {
            const targetsMapElement = targetsMap[it.symbol];
            if (!targetsMapElement) {
                return undefined;
            }
            const targetsTick = {
                boost: it.boost,
                base: it.symbol,
                baseAsset: it.base,
                baseLogo: `${addressInfo.baseApiUrl}/static/${it.base.toLowerCase()}.png`,
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
                targetId: targetsMapElement.targetId,
                longOI: it.longOI,
                shortOI: it.shortOI,
                longAmount: it.longAmount,
                shortAmount: it.shortAmount,
                fundingRateLong: "0",
                fundingRateShort: "0",
                up: it.up,
            };
            return targetsTick;
        }).filter(it => it !== undefined);
    }
    async targetTickMap(chainType) {
        return (await this.targetTicks(chainType)).reduce((acc, it) => {
            acc[it.base] = it;
            return acc;
        }, {});
    }
    startTickUpdateEvent() {
        ServiceWs_1.serviceWs.connect();
    }
    startPositionEvent() {
        if (timeIdManger.positionUpdate) {
            clearTimeout(timeIdManger.positionUpdate);
        }
        timeIdManger.positionUpdate = setTimeout(() => {
            try {
                tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.SYS_TOPIC_POSITIONS, []);
            }
            finally {
                this.startPositionEvent();
            }
        }, 3000);
    }
    startEvent() {
        this.startTickUpdateEvent();
        this.startPositionEvent();
    }
    async tradeInfo(chainType, targetName, referralCode) {
        this.startEvent();
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const targetServiceContract = connectInfo.create(contract_1.TargetServiceContract);
        const referralServiceContract = connectInfo.create(contract_1.ReferralServiceContract);
        const [vaultTokens, targets, targetTicks] = await Promise.all([
            ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType),
            ApiProvider_1.apiProvider.tradeApi().pairs(chainType),
            this.targetTickMap(chainType)
        ]);
        const target = targets.find(it => it.base === targetName);
        if (!target) {
            throw new Error("target not found");
        }
        const referralId = ethers6_1.ethers.keccak256(ethers6_1.ethers.AbiCoder.defaultAbiCoder().encode(["string"], [referralCode || ""]));
        const [{ getTargetConfig, referralAddress, supportedTokens, }] = await connectInfo.multiCall().callObj({
            getTargetConfig: targetServiceContract.multicall.getTargetConfig(target.targetId),
            supportedTokens: targetServiceContract.multicall.listSupportedToken(target.targetId),
            referralAddress: referralServiceContract.multicall.getReferrerAddressByReferralID(referralId),
        });
        if (referralAddress === tool_1.ZERO_ADDRESS) {
            referralCode = undefined;
        }
        const targetConfig = {
            targetType: getTargetConfig.targetType,
            openFeeRate: getTargetConfig.openFeeRate,
            closeFeeRate: getTargetConfig.closeFeeRate,
            execFeeValue: getTargetConfig.execFeeValue,
            maxOpenInterestLong: getTargetConfig.maxOpenInterestLong,
            maxOpenInterestShort: getTargetConfig.maxOpenInterestShort,
            maxFundingFeeRate: getTargetConfig.maxFundingFeeRate,
            minFundingFeeRate: getTargetConfig.minFundingFeeRate,
            fundingFeePerBlockP: getTargetConfig.fundingFeePerBlockP,
        };
        const targetTick = targetTicks[targetName];
        if (targetTick === undefined) {
            throw new Error("target not found");
        }
        tool_1.MarketTradeMath.initTargetFundingFeeRate(targetTick, targetConfig);
        const TOPIC_PRE_OPEN_POSITION_ID = `${tool_1.TradeEventBus.TOPIC_PRE_OPEN_POSITION}_${targetName}`;
        const TOPIC_PAIR_PRICE_ID = `${tool_1.TradeEventBus.TOPIC_PAIR_PRICE}_${targetName}`;
        const TOPIC_PAIR_KLINE_ID = `${tool_1.TradeEventBus.TOPIC_KLINE}_${targetName}`;
        const cache = {
            preOpenPositionParams: undefined,
            topicAccount: undefined,
            currentPositions: undefined,
            period: undefined,
            eventIds: new Set()
        };
        async function getKlineData(period, topic) {
            const klineData = await ApiProvider_1.apiProvider.serverApi().klines(targetTick.baseAsset, period, 0, 0, topic ? 1 : 1000);
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
        }
        cache.eventIds.add(tool_1.TradeEventBus.SYS_TOPIC_TICK_DATA_UPDATE);
        tool_1.tradeEventBus.resetOn(tool_1.TradeEventBus.SYS_TOPIC_TICK_DATA_UPDATE, (tickData) => {
            for (const it of tickData) {
                if (targetTicks[it.symbol]) {
                    targetTicks[it.symbol] = {
                        ...targetTicks[it.symbol],
                        base: it.symbol,
                        open: it.open,
                        close: it.close,
                        high: it.high,
                        low: it.low,
                        volume: it.volume,
                        priceChangePercent: it.priceChangePercent,
                        priceChange: it.priceChange,
                        longOI: it.longOI,
                        shortOI: it.shortOI,
                        longAmount: it.longAmount,
                        shortAmount: it.shortAmount,
                        up: it.up,
                    };
                }
            }
            tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.SYS_TOPIC_TICKS_UPDATE, targetTicks);
        });
        const MarketLeverageConfig = {
            "MNT": 50
        };
        const BoostLeverageConfig = {};
        const tradeInfo = {
            boostLeverage: BoostLeverageConfig[target.base] || [250, 500, 750, 1000],
            marketLeverage: MarketLeverageConfig[target.base] || 250,
            topicPreOpenPosition: (eventId, func) => {
                const eventName = `${TOPIC_PRE_OPEN_POSITION_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tool_1.tradeEventBus.resetOn(eventName, func);
            },
            topicPairPrice: (eventId, func) => {
                const eventName = `${TOPIC_PAIR_PRICE_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tool_1.tradeEventBus.resetOn(eventName, func);
            },
            topicAllPrice: (eventId, func) => {
                const eventName = `${tool_1.TradeEventBus.TOPIC_ALL_PRICE}_${eventId}`;
                cache.eventIds.add(eventName);
                tool_1.tradeEventBus.resetOn(eventName, func);
            },
            topicKline(eventId, func) {
                const eventName = `${TOPIC_PAIR_KLINE_ID}_${eventId}`;
                cache.eventIds.add(eventName);
                tool_1.tradeEventBus.resetOn(eventName, func);
            },
            kline: async (period) => {
                cache.period = period;
                return await getKlineData(period, false);
            },
            topicPositions: (eventId, func) => {
                const eventName = `${tool_1.TradeEventBus.TOPIC_POSITIONS}_${eventId}`;
                cache.eventIds.add(eventName);
                tool_1.tradeEventBus.resetOn(eventName, func);
            },
            preOpenPosition: (params) => {
                cache.preOpenPositionParams = params;
                return this.preOpenPosition(params, tradeInfo.targetsTick, targetConfig);
            },
            open: async (connectInfo) => {
                if (cache.preOpenPositionParams === undefined) {
                    throw new Error("preOpenPositionParams is undefined");
                }
                const openPosition = this.preOpenPosition(cache.preOpenPositionParams, tradeInfo.targetsTick, targetConfig);
                return this.openPosition(connectInfo, openPosition, tradeInfo.targetsTick, referralCode);
            },
            tokens: async (account) => {
                return this.tokens(chainType, supportedTokens, account);
            },
            tokenBalance: [],
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
                const positions = await this.positionHistories(chainType, vaultTokens, targets, account, page, pageSize);
                return positions;
            },
            positions: async (account) => {
                cache.topicAccount = account;
                const positions = account ? await this.positions(tradeInfo.targetsTickMap, vaultTokens, targets, chainType, account) : [];
                cache.currentPositions = positions;
                return positions;
            },
            closePosition: async (positionHash, connectInfo) => {
                const positionData = cache.currentPositions.find(it => it.positionHash === positionHash);
                if (positionData === undefined) {
                    throw new Error("positionData is undefined");
                }
                return this.closePosition(positionHash, positionData.sourceData.positionType, connectInfo);
            },
            closeTopic() {
                cache.eventIds.forEach(it => {
                    tool_1.tradeEventBus.resetOff(it);
                });
                tool_1.tradeEventBus.removeAll(TOPIC_PRE_OPEN_POSITION_ID);
                tool_1.tradeEventBus.removeAll(TOPIC_PAIR_PRICE_ID);
            },
            addMarginInfo: async (positionHash) => {
                const positionData = cache.currentPositions.find(it => it.positionHash === positionHash);
                if (positionData === undefined) {
                    throw new Error("positionData is undefined");
                }
                return this.addMarginInfo(chainType, positionData);
            },
            TPSLInfo: async (positionHash) => {
                const positionData = cache.currentPositions.find(it => it.positionHash === positionHash);
                if (positionData === undefined) {
                    throw new Error("positionData is undefined");
                }
                return this.TPSLInfo(tradeInfo, positionData);
            }
        };
        const SYS_TOPIC_TICKS_UPDATE = (data) => {
            tradeInfo.targetsTick = data[targetName];
            tradeInfo.targetsTicks = Object.values(data);
            tradeInfo.targetsTickMap = data;
            tool_1.MarketTradeMath.initTargetFundingFeeRate(tradeInfo.targetsTick, targetConfig);
            tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.TOPIC_ALL_PRICE, tradeInfo.targetsTicks);
            tool_1.tradeEventBus.emitAll(TOPIC_PAIR_PRICE_ID, tradeInfo.targetsTick);
            if (cache.preOpenPositionParams) {
                const preOpenPosition = tradeInfo.preOpenPosition(cache.preOpenPositionParams);
                tool_1.tradeEventBus.emitAll(TOPIC_PRE_OPEN_POSITION_ID, preOpenPosition);
            }
            if (cache.currentPositions) {
                cache.currentPositions.forEach(it => {
                    this.updatePnl(it, data);
                });
                tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.TOPIC_POSITIONS, cache.currentPositions);
            }
            if (cache.period) {
                getKlineData(cache.period, true)
                    .then(klineData => {
                    tool_1.tradeEventBus.emitAll(TOPIC_PAIR_KLINE_ID, klineData);
                });
            }
        };
        const SYS_TOPIC_POSITIONS = async () => {
            if (cache.topicAccount) {
                await tradeInfo.positions(cache.topicAccount);
                tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.TOPIC_POSITIONS, cache.currentPositions);
            }
        };
        // 订阅处理
        tool_1.tradeEventBus.resetOn(tool_1.TradeEventBus.SYS_TOPIC_TICKS_UPDATE, SYS_TOPIC_TICKS_UPDATE);
        tool_1.tradeEventBus.resetOn(tool_1.TradeEventBus.SYS_TOPIC_POSITIONS, SYS_TOPIC_POSITIONS);
        const oldClose = tradeInfo.closeTopic;
        tradeInfo.closeTopic = () => {
            oldClose();
            tool_1.tradeEventBus.off(tool_1.TradeEventBus.SYS_TOPIC_TICKS_UPDATE, SYS_TOPIC_TICKS_UPDATE);
            tool_1.tradeEventBus.off(tool_1.TradeEventBus.SYS_TOPIC_POSITIONS, SYS_TOPIC_POSITIONS);
            if (timeIdManger.tickUpdate) {
                clearTimeout(timeIdManger.tickUpdate);
            }
            if (timeIdManger.positionUpdate) {
                clearTimeout(timeIdManger.positionUpdate);
            }
            ServiceWs_1.serviceWs.disconnect();
        };
        return tradeInfo;
    }
    async positionHistories(chainType, vaultTokens, targets, userAddress, page = 1, pageSize = 1000) {
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.targetId] = it;
            return acc;
        }, {});
        const vaultTokenMap = vaultTokens.reduce((acc, it) => {
            acc[it.assetID] = it;
            return acc;
        }, {});
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(contract_1.PositionServiceContract);
        const currentPage = page - 1;
        const [[{ count, positionHistories }]] = await Promise.all([
            connectInfo.multiCall().callObj({
                positionHistories: positionServiceContract.multicall.listHistoryPosition(userAddress, Number(currentPage).toFixed(), Number(pageSize).toFixed()),
                count: positionServiceContract.multicall.getHistoryPositionCount(userAddress)
            }),
        ]);
        return {
            total: parseInt(count),
            list: positionHistories.map(it => {
                const initialMargin = new bignumber_js_1.default(it.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                const pnl = new bignumber_js_1.default(it.pnl).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                const positionData = this.positionRecordAbiResultToPositionData(it, targetsMap, vaultTokenMap);
                let pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
                positionData.pnlRate = new bignumber_js_1.default(pnlRate).comparedTo("-100") < 0 ? "-100" : pnlRate;
                positionData.pnl = new bignumber_js_1.default(pnlRate).comparedTo("-100") < 0 ? new bignumber_js_1.default(initialMargin).negated().toFixed() : pnl;
                return positionData;
            }).reverse()
        };
    }
    async positions(tickPrices, vaultTokens, targets, chainType, userAddress) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const positionServiceContract = connectInfo.create(contract_1.PositionServiceContract);
        const targetServiceContract = connectInfo.create(contract_1.TargetServiceContract);
        const multiCallContract = connectInfo.create(contract_1.Multicall2Contract);
        const result = [];
        let page = 0;
        const pageSize = 1000;
        const shapeWithLabels = targets.map((it) => {
            return {
                key: it.base,
                fundingFeeRate: targetServiceContract.multicall.getFundingFeeRate(it.targetId),
                openInterest: targetServiceContract.multicall.getOpenInterest(it.targetId),
            };
        });
        const [{ blockTime }, ...targetConfigs] = await connectInfo.multiCall().callObj({
            blockTime: multiCallContract.multicall.getCurrentBlockTimestamp(),
        }, ...shapeWithLabels);
        const targetConfigMap = targetConfigs.reduce((acc, it) => {
            acc[it.key] = it;
            return acc;
        }, {});
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const [{ positionHistories }] = await connectInfo.multiCall().callObj({
                positionHistories: positionServiceContract.multicall.listLivePosition(userAddress, Number(page).toFixed(), Number(pageSize).toFixed())
            });
            result.push(...positionHistories);
            if (positionHistories.length < pageSize) {
                break;
            }
            page++;
        }
        const targetsMap = targets.reduce((acc, it) => {
            acc[it.targetId] = it;
            return acc;
        }, {});
        const vaultTokenMap = vaultTokens.reduce((acc, it) => {
            acc[it.assetID] = it;
            return acc;
        }, {});
        return result.map(it => {
            const positionData = this.positionRecordAbiResultToPositionData(it, targetsMap, vaultTokenMap);
            this.updatePnl(positionData, tickPrices);
            this.updateFundingFee(positionData, blockTime, targetConfigMap);
            return positionData;
        }).reverse();
    }
    updateFundingFee(positionData, blockTime, targetConfigMap) {
        //    uint256 timeStamp = block.timestamp;
        //         if (openInterest.lastetFundingFeeCaculateTimeStamp == 0) {
        //             openInterest.lastetFundingFeeCaculateTimeStamp = timeStamp;
        //         }
        //         uint256 period = timeStamp - openInterest.lastetFundingFeeCaculateTimeStamp;
        //         if (period > 0) {
        //             int256 fundingFeeRate = getFundingFeeRate(targetID);
        //             openInterest.accFundingFeeLong = openInterest.accFundingFeeLong + fundingFeeRate * int256(period);
        //             openInterest.lastetFundingFeeCaculateTimeStamp = timeStamp;
        //         }
        const timeStamp = new bignumber_js_1.default(blockTime);
        const targetConfigMapElement = targetConfigMap[positionData.base] || {
            openInterest: {
                lastetFundingFeeCaculateTimeStamp: "0",
                accFundingFeeLong: "0",
                amountLong: "0",
                amountShort: "0",
            },
            fundingFeeRate: "0",
            lastetFundingFeeCaculateTimeStamp: "0",
        };
        const openInterest = targetConfigMapElement.openInterest;
        let lastetFundingFeeCaculateTimeStamp = openInterest.lastetFundingFeeCaculateTimeStamp;
        if (new bignumber_js_1.default(lastetFundingFeeCaculateTimeStamp).eq("0")) {
            lastetFundingFeeCaculateTimeStamp = timeStamp.toFixed();
        }
        const period = new bignumber_js_1.default(timeStamp).minus(lastetFundingFeeCaculateTimeStamp);
        let accFundingFeeLong = openInterest.accFundingFeeLong;
        if (period.gt("0")) {
            const fundingFeeRate = new bignumber_js_1.default(targetConfigMapElement.fundingFeeRate);
            const newAccFundingFeeLong = new bignumber_js_1.default(accFundingFeeLong).plus(new bignumber_js_1.default(openInterest.amountLong).multipliedBy(fundingFeeRate).multipliedBy(period));
            accFundingFeeLong = newAccFundingFeeLong.toFixed();
        }
        // OpenInterest storage openInterest = repo().openInterest[targetID];
        //         int256 fundingFee = int256(targetAmount) * openInterest.accFundingFeeLong;
        //         if (isLong) {
        //             if (openInterest.amountLong == 0) {
        //                 fundingFee = 0;
        //             } else {
        //                 fundingFee = fundingFee / int256(openInterest.amountLong);
        //             }
        //         } else {
        //             if (openInterest.amountShort == 0) {
        //                 fundingFee = 0;
        //             } else {
        //                 fundingFee = (fundingFee * -1) / int256(openInterest.amountShort);
        //             }
        //         }
        const targetAmount = positionData.sourceData.targetAmount;
        const isLong = positionData.sourceData.isLong;
        let fundingFee = new bignumber_js_1.default(targetAmount).multipliedBy(accFundingFeeLong);
        if (isLong) {
            if (new bignumber_js_1.default(openInterest.amountLong).eq("0")) {
                fundingFee = new bignumber_js_1.default("0");
            }
            else {
                fundingFee = fundingFee.div(openInterest.amountLong);
            }
        }
        else {
            if (new bignumber_js_1.default(openInterest.amountShort).eq("0")) {
                fundingFee = new bignumber_js_1.default("0");
            }
            else {
                fundingFee = fundingFee.multipliedBy("-1").div(openInterest.amountShort);
            }
        }
        positionData.fundingFee = new bignumber_js_1.default(fundingFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).multipliedBy(-1).toFixed();
    }
    updatePnl(positionData, tickPrices) {
        const tickPrice = tickPrices[positionData.base];
        const initialMargin = positionData.initialMargin;
        let closePrice = tickPrice?.close ?? "0";
        const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, new bignumber_js_1.default(closePrice).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
        const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
        positionData.pnl = pnl;
        positionData.pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
        if (new bignumber_js_1.default(positionData.stopLossPrice).eq("0") || new bignumber_js_1.default(positionData.stopLossPrice).eq(new bignumber_js_1.default(tool_1.MAXIMUM_U256).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN))) {
            positionData.stopLossPrice = "none";
        }
        positionData.markPrice = closePrice;
        positionData.qty = new bignumber_js_1.default(positionData.size).multipliedBy(closePrice).toFixed();
    }
    positionRecordAbiResultToPositionData(positionRecordAbiResult, pairs, tokens) {
        const target = pairs[positionRecordAbiResult.target];
        const token = tokens[positionRecordAbiResult.token];
        const base = target ? target.base : "unknown";
        const baseAsset = target ? target.baseAsset : "unknown";
        const boost = target ? target.boost : false;
        // const quote = target ? target.quote : "unknown"
        const initialMargin = new bignumber_js_1.default(positionRecordAbiResult.margin).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
        //    uint8 public constant POSITION_EXIT_REASON_NULL = 0;
        //     uint8 public constant POSITION_EXIT_REASON_USER_CLOSE = 1;
        //     uint8 public constant POSITION_EXIT_REASON_TP = 2;
        //     uint8 public constant POSITION_EXIT_REASON_SL = 3;
        //     uint8 public constant POSITION_EXIT_REASON_LQ = 4;
        const typeMap = {
            "0": "Open",
            "1": "Close",
            "2": "TP Close",
            "3": "SL Close",
            "4": "Liquidated"
        };
        const positionData = {
            positionHash: positionRecordAbiResult.positionHash,
            base,
            baseAsset,
            boost,
            target: target,
            quote: QUOTE_TOKEN,
            leverage: new bignumber_js_1.default(positionRecordAbiResult.leverage).div(1e2).dividedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN),
            isLong: positionRecordAbiResult.isLong,
            initialMargin: initialMargin,
            size: new bignumber_js_1.default(positionRecordAbiResult.targetAmount).div(10 ** vo_1.CONST.QTY_DECIMALS).toFixed(),
            qty: new bignumber_js_1.default(positionRecordAbiResult.targetAmount).multipliedBy(positionRecordAbiResult.targetClosePrice).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(),
            entryPrice: new bignumber_js_1.default(positionRecordAbiResult.targetOpenPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            markPrice: new bignumber_js_1.default(positionRecordAbiResult.targetOpenPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            liqPrice: new bignumber_js_1.default(positionRecordAbiResult.liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            pnl: "0",
            pnlRate: "0",
            type: typeMap[positionRecordAbiResult.exitReason],
            liquidLostRate: new bignumber_js_1.default(100).minus(new bignumber_js_1.default(vo_1.CONST.LIQUIDATION).div(10 ** vo_1.CONST.RATIO_DECIMALS)).toFixed(),
            fundingFee: new bignumber_js_1.default(positionRecordAbiResult.fundingFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).multipliedBy(-1).toFixed(),
            takeProfitPrice: new bignumber_js_1.default(positionRecordAbiResult.takeProfitPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            stopLossPrice: new bignumber_js_1.default(positionRecordAbiResult.stopLossPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            closePrice: new bignumber_js_1.default(positionRecordAbiResult.targetClosePrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            openTimeStamp: positionRecordAbiResult.openTimeStamp,
            closeTimeStamp: positionRecordAbiResult.closeTimeStamp,
            sourceData: positionRecordAbiResult,
            openFee: new bignumber_js_1.default(positionRecordAbiResult.openFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            openFeeToken: new bignumber_js_1.default(positionRecordAbiResult.openFee)
                .multipliedBy(10 ** token.token.decimals)
                .div(positionRecordAbiResult.tokenOpenPrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** vo_1.CONST.QTY_DECIMALS)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** token.token.decimals)
                .toFixed(),
            closeFee: new bignumber_js_1.default(positionRecordAbiResult.closeFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            closeFeeToken: new bignumber_js_1.default(positionRecordAbiResult.closeFee).multipliedBy(10 ** token.token.decimals)
                .div(positionRecordAbiResult.tokenOpenPrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** vo_1.CONST.QTY_DECIMALS)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** token.token.decimals)
                .toFixed(),
            execFee: new bignumber_js_1.default(positionRecordAbiResult.executionFee)
                .multipliedBy(10 ** vo_1.CONST.QTY_DECIMALS)
                .multipliedBy(positionRecordAbiResult.tokenOpenPrice)
                .div(10 ** token.token.decimals)
                .div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
            execFeeToken: new bignumber_js_1.default(positionRecordAbiResult.executionFee)
                .div(10 ** token.token.decimals)
                .toFixed(),
            duration: new bignumber_js_1.default(positionRecordAbiResult.closeTimeStamp).eq("0") ? new bignumber_js_1.default(new Date().getTime() / 1000).minus(new bignumber_js_1.default(positionRecordAbiResult.openTimeStamp)).toFixed() :
                "0",
            token: token.token,
            netProfit: new bignumber_js_1.default(positionRecordAbiResult.tokenClosePrice).eq("0") ? "0" : new bignumber_js_1.default(positionRecordAbiResult.pnl)
                .div(10 ** vo_1.CONST.QTY_DECIMALS)
                .div(10 ** vo_1.CONST.PRICE_DECIMALS)
                .toFixed(),
            netProfitToken: new bignumber_js_1.default(positionRecordAbiResult.tokenClosePrice).eq("0") ? "0" : new bignumber_js_1.default(positionRecordAbiResult.pnl).multipliedBy(10 ** token.token.decimals)
                .div(positionRecordAbiResult.tokenClosePrice)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** vo_1.CONST.QTY_DECIMALS)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .div(10 ** token.token.decimals)
                .toFixed(),
        };
        //Net Profit = Realized PNL - Open Fee - Execution Fee - Close Fee
        positionData.netProfit = new bignumber_js_1.default(positionData.netProfit).minus(positionData.openFee).minus(positionData.execFee).minus(positionData.closeFee).toFixed();
        positionData.netProfitToken = new bignumber_js_1.default(positionData.netProfitToken).minus(positionData.openFeeToken).minus(positionData.execFeeToken).minus(positionData.closeFeeToken).toFixed();
        if (new bignumber_js_1.default(positionData.stopLossPrice).eq("0") || new bignumber_js_1.default(positionData.stopLossPrice).eq(new bignumber_js_1.default(tool_1.MAXIMUM_U256).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN))) {
            positionData.stopLossPrice = "none";
        }
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
        const margin = tool_1.MarketTradeMath.margin(tokenAmount, tokenPrice, preOpenPositionParams.balance.balance.token.decimals, targetConfig.execFeeValue);
        const notionalPositionValue = tool_1.MarketTradeMath.notionalPositionValue(margin, leverage);
        let openFee = "0";
        // const closeFee = "0"
        if (!tick.boost) {
            openFee = new bignumber_js_1.default(notionalPositionValue)
                .multipliedBy(targetConfig.openFeeRate)
                .div(10 ** vo_1.CONST.RATIO_DECIMALS)
                .dp(0, bignumber_js_1.default.ROUND_DOWN)
                .toFixed();
        }
        const executeFeeByTokenAmount = tool_1.MarketTradeMath.executeFeeByTokenAmount(targetConfig.execFeeValue, preOpenPositionParams.balance.balance.token.decimals, tokenPrice);
        const targetAmount = tool_1.MarketTradeMath.targetAmount(notionalPositionValue, targetPrice);
        const liquidPrice = tool_1.MarketTradeMath.liquidPrice(isLong, liquidation, margin, targetAmount, targetPrice);
        const liqPrice = new bignumber_js_1.default(liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        const openFeeAmount = new bignumber_js_1.default(openFee)
            .multipliedBy(new bignumber_js_1.default(10).pow(preOpenPositionParams.balance.balance.token.decimals))
            .dividedBy(tokenPrice)
            .dividedBy(new bignumber_js_1.default(10).pow(vo_1.CONST.QTY_DECIMALS)).dp(0, bignumber_js_1.default.ROUND_DOWN)
            .div(10 ** preOpenPositionParams.balance.balance.token.decimals)
            .toFixed();
        const execFeeAmount = new bignumber_js_1.default(executeFeeByTokenAmount).div(10 ** preOpenPositionParams.balance.balance.token.decimals)
            .toFixed();
        const openFeeUSD = new bignumber_js_1.default(openFee).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        const execFeeUSD = new bignumber_js_1.default(targetConfig.execFeeValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        const tp = {
            error: false,
            price: "",
            rate: ""
        };
        const sl = {
            error: false,
            price: "",
            rate: ""
        };
        TradeApi_1.checkTpError(tp, isLong, tick.close, preOpenPositionParams.takeProfit, {
            margin,
            targetAmount,
            targetPrice
        });
        TradeApi_1.checkSlError(sl, isLong, tick.close, preOpenPositionParams.stopLoss, {
            margin,
            targetAmount,
            targetPrice
        });
        const openPosition = {
            entryPrice: entryPrice,
            liqPrice: liqPrice,
            openFee: openFeeAmount,
            execFee: execFeeAmount,
            openFeeUSD: new bignumber_js_1.default(openFeeUSD).toFixed(2, bignumber_js_1.default.ROUND_HALF_UP),
            execFeeUSD: new bignumber_js_1.default(execFeeUSD).toFixed(2, bignumber_js_1.default.ROUND_HALF_UP),
            tp,
            sl,
            openParams: preOpenPositionParams
        };
        return openPosition;
    }
    async openPosition(connectInfo, openPosition, targetTick, referralCode) {
        if (openPosition.tp.error) {
            throw new Error("TP Error");
        }
        if (openPosition.sl.error) {
            throw new Error("SL Error");
        }
        const referralServiceContract = connectInfo.create(contract_1.ReferralServiceContract);
        const preOpenPositionParams = openPosition.openParams;
        const isLong = preOpenPositionParams.isLong;
        const targetId = targetTick.targetId;
        const tokenId = preOpenPositionParams.balance.tokenId;
        const tokenAmount = new bignumber_js_1.default(preOpenPositionParams.inputAmount)
            .multipliedBy(10 ** preOpenPositionParams.balance.balance.token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const leverage = new bignumber_js_1.default(preOpenPositionParams.leverage).multipliedBy(1e2).multipliedBy(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const takeProfit = new bignumber_js_1.default(openPosition.tp.rate).multipliedBy(1e4).plus(1e6).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const stopLoss = new bignumber_js_1.default(1e6).minus(new bignumber_js_1.default(openPosition.sl.rate).multipliedBy(1e4)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(connectInfo.chainInfo().chainType);
        const priceFeedsUpdateData = await pythApi.priceFeedsUpdateDataByTokens([
            preOpenPositionParams.balance.balance.token.symbol,
            targetTick.base
        ]);
        let referralID = undefined;
        if (referralCode) {
            referralID = ethers6_1.ethers.keccak256(ethers6_1.ethers.AbiCoder.defaultAbiCoder().encode(["string"], [referralCode]));
            // 判断自己是否绑定邀请码
            const [{ referralIDByAccountAddress }] = await connectInfo.multiCall().callObj({
                referralIDByAccountAddress: referralServiceContract.multicall.getReferralIDByAccountAddress(connectInfo.account),
            });
            if (referralIDByAccountAddress !== tool_1.ZERO_BYTE32) {
                referralID = undefined;
            }
        }
        const pythContract = connectInfo.create(contract_1.IpythContract);
        const value = new bignumber_js_1.default(await pythContract.getUpdateFee(priceFeedsUpdateData)).multipliedBy(2).toFixed();
        let transactionEvent;
        if (targetTick.boost) {
            const boostTradeServicesContract = connectInfo.create(contract_1.BoostTradeServicesContract);
            transactionEvent = await boostTradeServicesContract.openBoostTrade(isLong, targetId, tokenId, tokenAmount, leverage, takeProfit, priceFeedsUpdateData, referralID, value);
        }
        else {
            const marketTradeServicesContract = connectInfo.create(contract_1.MarketTradeServicesContract);
            transactionEvent = await marketTradeServicesContract.openMarketTrade(isLong, targetId, tokenId, tokenAmount, leverage, takeProfit, stopLoss, priceFeedsUpdateData, referralID, value);
        }
        const openPositionEvent = {
            transactionEvent: transactionEvent,
            step1: async (txHash) => {
                const tx = new vo_1.TransactionEvent(connectInfo, txHash);
                await tx.confirm();
            },
            step2: async () => {
            }
        };
        return openPositionEvent;
    }
    async closePosition(positionHash, positionType, connectInfo) {
        const positionServiceContract = connectInfo.create(contract_1.PositionServiceContract);
        const [{ priceIds }] = await connectInfo.multiCall().callObj({
            priceIds: positionServiceContract.multicall.getPostionPriceIDs(positionHash),
        });
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(connectInfo.chainInfo().chainType);
        const priceFeedsUpdateData = await pythApi.priceFeedsUpdateDataByPriceIds(priceIds);
        let transactionEvent;
        if (parseInt(positionType) === vo_1.CONST.POSITION_TYPE_MARKET) {
            const marketTradeServicesContract = connectInfo.create(contract_1.MarketTradeServicesContract);
            transactionEvent = await marketTradeServicesContract.closeMarketTrade(positionHash, priceFeedsUpdateData);
        }
        else {
            const boostTradeServicesContract = connectInfo.create(contract_1.BoostTradeServicesContract);
            transactionEvent = await boostTradeServicesContract.closeBoostTrade(positionHash, priceFeedsUpdateData);
        }
        const closePositionEvent = {
            transactionEvent: transactionEvent,
            step1: async (txHash) => {
                const tx = new vo_1.TransactionEvent(connectInfo, txHash);
                await tx.confirm();
            },
            step2: async () => {
            }
        };
        return closePositionEvent;
    }
    async tokens(chainType, supportedTokens, account = undefined) {
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const supportedTokenSet = new Set(supportedTokens.map(it => it.toLowerCase()));
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
        const tokenPriceBalances = vaultTokens.map((it, index) => {
            return {
                tokenId: it.assetID,
                price: new bignumber_js_1.default(prices[index].price).div(1e8).toFixed(),
                balance: balances[index],
            };
        }).filter(it => supportedTokenSet.has(it.balance.token.address.toLowerCase()));
        return tokenPriceBalances;
    }
    async addMarginInfo(chainType, positionData) {
        const positionHash = positionData.sourceData.positionHash;
        const account = positionData.sourceData.account;
        const tokenAddress = positionData.sourceData.token;
        const initialMargin = positionData.sourceData.margin;
        const supportedTokens = [];
        {
            const addressInfo = BaseApi_1.BASE_API.address();
            const chainInfo = addressInfo.getChainInfo(chainType);
            const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
            const targetServiceContract = connectInfo.create(contract_1.TargetServiceContract);
            const [{ supportedTokenList, }] = await BaseApi_1.BASE_API.connectInfo(chainInfo).multiCall().callObj({
                supportedTokenList: targetServiceContract.multicall.listSupportedToken(positionData.target.targetId),
            });
            supportedTokens.push(...supportedTokenList);
        }
        const tokenPriceBalances = await this.tokens(chainType, supportedTokens, account);
        const balance = tokenPriceBalances.find(it => (0, tool_1.eqAddress)(it.tokenId, tokenAddress));
        const addMarginInfo = {
            balance: balance.balance,
            async addMargin(amount, connectInfo) {
                const priceFeedsUpdateData = await ApiProvider_1.apiProvider.pythApi().priceFeedsUpdateDataByTokens([
                    balance.balance.token.symbol
                ]);
                const positionServiceContract = connectInfo.create(contract_1.PositionServiceContract);
                return positionServiceContract.addPositionMargin(positionHash, new bignumber_js_1.default(amount).multipliedBy(10 ** balance.balance.token.decimals).toFixed(), priceFeedsUpdateData);
            },
            preAddMargin(amount) {
                //((tokenAmount * 10 ** CONSTANT.QTY_DECIMALS) * tokenPrice) / 10 ** decimals;
                const tokenAmount = new bignumber_js_1.default(amount).multipliedBy(10 ** balance.balance.token.decimals).toFixed();
                const marginValueToAdd = new bignumber_js_1.default(tokenAmount).multipliedBy(10 ** vo_1.CONST.QTY_DECIMALS).multipliedBy(balance.price).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).div(10 ** balance.balance.token.decimals).toFixed();
                const newMargin = new bignumber_js_1.default(initialMargin).plus(marginValueToAdd).toFixed();
                const calculatePriceThresholdRatio = tool_1.MarketTradeMath.calculatePriceThresholdRatio(positionData.sourceData.margin, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, positionData.sourceData.takeProfitPrice, positionData.sourceData.stopLossPrice, positionData.sourceData.liquidPrice);
                const liquidPrice = tool_1.MarketTradeMath.liquidPrice(positionData.isLong, calculatePriceThresholdRatio.liquidationRate, newMargin, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice);
                const liquidationPrice = bignumber_js_1.default.max(new bignumber_js_1.default(liquidPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS), "0").toFixed(8, bignumber_js_1.default.ROUND_DOWN);
                const margin = new bignumber_js_1.default(newMargin).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                return {
                    margin,
                    liquidationPrice,
                };
            }
        };
        return addMarginInfo;
    }
    async TPSLInfo(tradeInfo, positionData) {
        const positionHash = positionData.sourceData.positionHash;
        const calculatePriceThresholdRatio = tool_1.MarketTradeMath.calculatePriceThresholdRatio(positionData.sourceData.margin, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, positionData.sourceData.takeProfitPrice, positionData.sourceData.stopLossPrice, positionData.sourceData.liquidPrice);
        let sourceTP;
        {
            const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, new bignumber_js_1.default(positionData.takeProfitPrice).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
            const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            sourceTP = {
                error: false,
                rate: new bignumber_js_1.default(calculatePriceThresholdRatio.takeProfitRate).minus(1e6).div(1e4).toFixed(),
                price: new bignumber_js_1.default(positionData.sourceData.takeProfitPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                pnl,
                pnlRate: pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(positionData.initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN),
            };
        }
        let sourceSL;
        {
            const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, new bignumber_js_1.default(positionData.stopLossPrice).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
            const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            sourceSL = {
                error: false,
                rate: new bignumber_js_1.default(1e6).minus(calculatePriceThresholdRatio.stopLoseRate).div(1e4).toFixed(),
                price: new bignumber_js_1.default(positionData.sourceData.stopLossPrice).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN),
                pnl,
                pnlRate: pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(positionData.initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN)
            };
        }
        const TPSLInfo = {
            sourceTP,
            sourceSL,
            preUpdate(tpParams, slParams) {
                let targetTick = tradeInfo.targetsTickMap[positionData.base];
                const tp = {
                    error: false,
                    price: "",
                    rate: "",
                    pnl: "",
                    pnlRate: "",
                };
                TradeApi_1.checkTpError(tp, positionData.isLong, targetTick.close, tpParams, {
                    margin: positionData.sourceData.margin,
                    targetAmount: positionData.sourceData.targetAmount,
                    targetPrice: positionData.sourceData.targetOpenPrice,
                });
                if (!tp.error) {
                    const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, new bignumber_js_1.default(tp.price).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
                    const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                    tp.pnl = pnl;
                    tp.pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(positionData.initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
                }
                const sl = {
                    error: false,
                    price: "",
                    rate: "",
                    pnl: "",
                    pnlRate: "",
                };
                TradeApi_1.checkSlError(sl, positionData.isLong, targetTick.close, slParams, {
                    margin: positionData.sourceData.margin,
                    targetAmount: positionData.sourceData.targetAmount,
                    targetPrice: positionData.sourceData.targetOpenPrice,
                });
                if (!sl.error) {
                    const pnlValue = tool_1.MarketTradeMath.pnl(positionData.sourceData.isLong, positionData.sourceData.targetAmount, positionData.sourceData.targetOpenPrice, new bignumber_js_1.default(sl.price).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), positionData.sourceData.margin);
                    const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
                    sl.pnl = pnl;
                    sl.pnlRate = pnl === "0" ? "0" : new bignumber_js_1.default(pnl).div(positionData.initialMargin).multipliedBy(100).toFixed(2, bignumber_js_1.default.ROUND_DOWN);
                }
                return {
                    tp,
                    sl
                };
            },
            update(tp, sl, connectInfo) {
                const result = this.preUpdate(tp, sl);
                if (result.sl.error) {
                    throw new Error("SL Error");
                }
                if (result.tp.error) {
                    throw new Error("TP Error");
                }
                const positionServiceContract = connectInfo.create(contract_1.PositionServiceContract);
                return positionServiceContract.updataPosition(positionHash, new bignumber_js_1.default(result.tp.rate).multipliedBy(1e4).plus(1e6).toFixed(), new bignumber_js_1.default(1e6).minus(new bignumber_js_1.default(result.sl.rate).multipliedBy(1e4)).toFixed());
            }
        };
        return TPSLInfo;
    }
    static checkSlError(sl, isLong, closePrice, slParams, params) {
        if (slParams.inputType === "price") {
            sl.price = slParams.value;
            const rate = tool_1.MarketTradeMath.stopLossRate(isLong, new bignumber_js_1.default(sl.price).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), params.margin, params.targetAmount, params.targetPrice);
            sl.rate = new bignumber_js_1.default(1e6).minus(rate).div(10 ** vo_1.CONST.RATIO_DECIMALS).toFixed(vo_1.CONST.RATIO_DECIMALS, bignumber_js_1.default.ROUND_DOWN);
        }
        if (slParams.inputType === "rate") {
            const value = slParams.value;
            const price = tool_1.MarketTradeMath.stopLossPrice(isLong, new bignumber_js_1.default(1e6).minus(new bignumber_js_1.default(value).multipliedBy(10 ** vo_1.CONST.RATIO_DECIMALS)).toFixed(0, bignumber_js_1.default.ROUND_DOWN), params.margin, params.targetAmount, params.targetPrice);
            sl.price = new bignumber_js_1.default(price).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
            sl.rate = value;
        }
        if (!(0, tool_1.isNumber)(sl.price) || !(0, tool_1.isNumber)(sl.rate) || new bignumber_js_1.default(sl.rate).comparedTo("0") <= 0) {
            sl.errorMsg = "Your SL price is ineffective. Please reset the price.";
        }
        else if (new bignumber_js_1.default(sl.rate).comparedTo("85") > 0) {
            if (isLong) {
                sl.errorMsg = "Stop Loss price must exceed the Liquid Price.";
            }
            else {
                sl.errorMsg = "Stop Loss price must be less than the Liquid Price";
            }
        }
        else {
            if (isLong) {
                if (new bignumber_js_1.default(sl.price).comparedTo(closePrice) > 0) {
                    sl.errorMsg = "Your SL price is ineffective. Please reset the price.";
                }
            }
            else {
                if (new bignumber_js_1.default(sl.price).comparedTo(closePrice) < 0) {
                    sl.errorMsg = "Your SL price is ineffective. Please reset the price.";
                }
            }
        }
        if (sl.errorMsg) {
            sl.error = true;
            if (slParams.inputType === "price") {
                sl.rate = '';
            }
            if (slParams.inputType === "rate") {
                sl.price = '';
            }
        }
        return sl.error;
    }
    static checkTpError(tp, isLong, closePrice, tpParams, params) {
        if (tpParams.inputType === "price") {
            tp.price = tpParams.value;
            const rate = tool_1.MarketTradeMath.takeProfit(isLong, new bignumber_js_1.default(tp.price).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), params.margin, params.targetAmount, params.targetPrice);
            tp.rate = new bignumber_js_1.default(rate).minus(1e6).div(10 ** vo_1.CONST.RATIO_DECIMALS).toFixed(vo_1.CONST.RATIO_DECIMALS, bignumber_js_1.default.ROUND_DOWN);
        }
        if (tpParams.inputType === "rate") {
            let val = tpParams.value;
            const price = tool_1.MarketTradeMath.takeProfitPrice(isLong, new bignumber_js_1.default(val).multipliedBy(10 ** vo_1.CONST.RATIO_DECIMALS).plus(1e6).toFixed(0, bignumber_js_1.default.ROUND_DOWN), params.margin, params.targetAmount, params.targetPrice);
            tp.price = new bignumber_js_1.default(price).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
            tp.rate = val;
        }
        if (!(0, tool_1.isNumber)(tp.price) || !(0, tool_1.isNumber)(tp.rate) || new bignumber_js_1.default(tp.rate).comparedTo("0") <= 0) {
            tp.errorMsg = "Your TP price is ineffective. Please reset the price.";
        }
        else if (new bignumber_js_1.default(tp.rate).comparedTo("300") > 0 || new bignumber_js_1.default(tp.rate).comparedTo("25") < 0) {
            tp.errorMsg = "Take Profit must be within 25%-300%";
        }
        else {
            if (isLong) {
                if (new bignumber_js_1.default(tp.price).comparedTo(closePrice) < 0) {
                    tp.errorMsg = "Your TP price is ineffective. Please reset the price.";
                }
            }
            else {
                if (new bignumber_js_1.default(tp.price).comparedTo(closePrice) > 0) {
                    tp.errorMsg = "Your TP price is ineffective. Please reset the price.";
                }
            }
        }
        if (tp.errorMsg) {
            tp.error = true;
            if (tpParams.inputType === "price") {
                tp.rate = '';
            }
            if (tpParams.inputType === "rate") {
                tp.price = '';
            }
        }
        return tp.error;
    }
};
exports.TradeApi = TradeApi;
__decorate([
    (0, tool_1.MethodCache)("TradeApi.pairs.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeApi.prototype, "pairs", null);
exports.TradeApi = TradeApi = TradeApi_1 = __decorate([
    (0, tool_1.CacheKey)('TradeApi')
], TradeApi);
