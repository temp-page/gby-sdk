"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythApi = void 0;
const tool_1 = require("../tool");
const pyth_evm_js_1 = require("@pythnetwork/pyth-evm-js");
const ApiProvider_1 = require("./provider/ApiProvider");
const connection = new pyth_evm_js_1.EvmPriceServiceConnection("https://hermes.pyth.network");
let PythApi = class PythApi {
    constructor() {
        this.priceIds = {};
        this.lastPrice = {};
    }
    async initPriceIds(chainType) {
        const [vaultTokenList, pairs] = await Promise.all([
            ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType),
            ApiProvider_1.apiProvider.tradeApi().pairs(chainType)
        ]);
        for (const vaultToken of vaultTokenList) {
            this.priceIds[vaultToken.token.symbol] = vaultToken.priceId.replace("0x", "").toLowerCase();
        }
        for (const pair of pairs) {
            this.priceIds[pair.base] = pair.priceId.replace("0x", "").toLowerCase();
        }
        const priceIds = Object.values(this.priceIds);
        const priceFeeds = await connection.getLatestPriceFeeds(priceIds);
        const priceCallBack = (priceFeed) => {
            this.lastPrice[priceFeed.id.toLowerCase()] = priceFeed.getPriceUnchecked().price;
            tool_1.Trace.log("priceCallBack", priceFeed.id, priceFeed.getPriceUnchecked().price);
        };
        priceFeeds.forEach(priceCallBack);
        // await connection.subscribePriceFeedUpdates(priceIds, priceCallBack)
        return this;
    }
    async priceFeedsUpdateData() {
        return this.priceFeedsUpdateDataByPriceIds(Object.values(this.priceIds));
    }
    async priceFeedsUpdateDataByTokens(symbols) {
        const priceIds = symbols.map(symbol => this.priceIds[symbol]);
        return this.priceFeedsUpdateDataByPriceIds(priceIds);
    }
    async priceFeedsUpdateDataByPriceIds(priceIds) {
        const priceUpdateData = await connection.getPriceFeedsUpdateData(priceIds);
        return priceUpdateData;
    }
    priceByPriceId(priceId) {
        const lastPriceElement = this.lastPrice[priceId];
        if (!lastPriceElement) {
            tool_1.Trace.log("priceByPriceId", "lastPriceElement not found", priceId);
            return "0";
        }
        return lastPriceElement;
    }
    priceBySymbol(symbol) {
        const priceId = this.priceIds[symbol];
        if (!priceId) {
            tool_1.Trace.log("priceBySymbol", "priceId not found", symbol);
            return "0";
        }
        const lastPriceElement = this.lastPrice[priceId];
        if (!lastPriceElement) {
            tool_1.Trace.log("priceBySymbol", "lastPriceElement not found", symbol);
            return "0";
        }
        return lastPriceElement;
    }
};
exports.PythApi = PythApi;
exports.PythApi = PythApi = __decorate([
    (0, tool_1.CacheKey)('PythApi')
], PythApi);
