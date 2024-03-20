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
exports.TradeApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const ApiProvider_1 = require("./provider/ApiProvider");
const abi_1 = require("../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const TargetServiceContract_1 = require("../abi/TargetServiceContract");
let TradeApi = class TradeApi {
    async pairs(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const targetServiceContract = connectInfo.create(TargetServiceContract_1.TargetServiceContract);
        const [{ targets }] = await connectInfo.multiCall()
            .callObj({
            targets: targetServiceContract.listTargets()
        });
        return targets.map(it => {
            return {
                base: it
            };
        });
        // return (await apiProvider.serverApi().ticks()).map(it => {
        //   const pair: Pair = {
        //     chainType: chainType,
        //     base: it.symbol,
        //     quote: "USD",
        //     price: it.close,
        //     upDown: it.priceChangePercent,
        //     change24h: it.priceChange,
        //     high24h: it.high,
        //     low24h: it.low,
        //     volume: "0",
        //   }
        //   return pair
        // })
    }
    // async tradeInfo(pair: Pair): Promise<TradeInfo> {
    //   await apiProvider.serverApi().ticks()
    // }
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
            async () => {
                if (account) {
                    const balances = await BaseApi_1.BASE_API.connectInfo(chainInfo).erc20().batchGetBalanceAndAllowance(account, chainInfo.GBU, vaultTokens.map(it => it.token));
                    return vaultTokens.map(it => balances[it.token.address]);
                }
                else {
                    return vaultTokens.map(it => vo_1.BalanceAndAllowance.unavailable(it.token));
                }
            }
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
