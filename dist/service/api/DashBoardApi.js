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
exports.DashBoardApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const contract_1 = require("../contract");
const ApiProvider_1 = require("./provider/ApiProvider");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const gql_1 = require("./gql");
const get_1 = __importDefault(require("lodash/get"));
let DashBoardApi = class DashBoardApi {
    // @MethodCache("DashBoardApi.poolPosition.${args[0]}", 60  * 1000)
    async poolPosition(chainType) {
        const targetTicks = await ApiProvider_1.apiProvider.tradeApi().targetTickMap(chainType);
        const positionDataDtos = await ApiProvider_1.apiProvider.serverApi().openPositions(chainType);
        const positionDatas = positionDataDtos.reduce((acc, cur) => {
            const openPosition = cur.ext.openPosition;
            let accElement = acc[openPosition.target];
            if (!accElement) {
                accElement = {
                    symbol: openPosition.target,
                    totalOl: "0",
                    longOl: "0",
                    shortOl: "0",
                    netOl: "0",
                    unrealizedPNL: "0"
                };
            }
            const tickPrice = targetTicks[openPosition.target];
            if (!tickPrice) {
                return acc;
            }
            const pnlValue = tool_1.MarketTradeMath.pnl(openPosition.isLong, openPosition.targetAmount, openPosition.targetOpenPrice, new bignumber_js_1.default(tickPrice.close).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN), openPosition.margin);
            const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            const positionSize = new bignumber_js_1.default(openPosition.targetAmount).multipliedBy(openPosition.targetOpenPrice).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            accElement.longOl = openPosition.isLong ? new bignumber_js_1.default(accElement.longOl).plus(positionSize).toFixed() : accElement.longOl;
            accElement.shortOl = openPosition.isLong ? accElement.shortOl : new bignumber_js_1.default(accElement.shortOl).plus(positionSize).toFixed();
            accElement.netOl = new bignumber_js_1.default(accElement.longOl).minus(accElement.shortOl).toFixed();
            accElement.totalOl = new bignumber_js_1.default(accElement.longOl).plus(accElement.shortOl).toFixed();
            accElement.unrealizedPNL = new bignumber_js_1.default(accElement.unrealizedPNL).plus(pnl).toFixed();
            acc[openPosition.target] = accElement;
            return acc;
        }, {});
        // 接口
        const pools = Object.values(positionDatas).sort((a, b) => new bignumber_js_1.default(b.totalOl).comparedTo(a.totalOl));
        return {
            totalOl: pools.map(it => it.totalOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(), "0"),
            longOl: pools.map(it => it.longOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(), "0"),
            shortOl: pools.map(it => it.shortOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(), "0"),
            netOl: pools.map(it => it.netOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(), "0"),
            unrealizedPNL: pools.map(it => it.unrealizedPNL).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(), "0"),
            pools: pools
        };
    }
    // @MethodCache("DashBoardApi.liquidityComposition.${args[0]}", 60  * 1000)
    async liquidityComposition(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const vaultServiceContract = connectInfo.create(contract_1.VaultServiceContract);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [...tokenConfigs] = await connectInfo.multiCall().callObj(...vaultTokens.map(it => {
            return {
                tokenConfig: vaultServiceContract.multicall.getTokenConfig(it.address),
                tokenAmount: vaultServiceContract.multicall.getAmountInLP(it.address),
                price: pythApi.priceBySymbol(it.token.symbol),
            };
        }));
        const buySellTokenBalances = await ApiProvider_1.apiProvider.buySellGLPApi().tokens(chainType);
        const targetTotalWeight = vaultTokens.map(it => it.weight).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed());
        const result = vaultTokens.map((it, index) => {
            return {
                token: it.token,
                tokenQuantity: new bignumber_js_1.default(tokenConfigs[index].tokenAmount).div(10 ** it.token.decimals).toFixed(),
                totalValue: new bignumber_js_1.default(tokenConfigs[index].price).div(1e8).multipliedBy(new bignumber_js_1.default(tokenConfigs[index].tokenAmount).div(10 ** it.token.decimals)).toFixed(),
                buyFee: new bignumber_js_1.default(buySellTokenBalances[index].buyFee).toFixed(),
                sellFee: new bignumber_js_1.default(buySellTokenBalances[index].sellFee).toFixed(),
                targetWeight: new bignumber_js_1.default(targetTotalWeight).eq(0) ? "0" : new bignumber_js_1.default(it.weight).multipliedBy(100).div(targetTotalWeight).toFixed(),
                currentWeight: "0",
                rate: "0"
            };
        });
        const allTotalValue = result.map(it => it.totalValue).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed());
        result.forEach(it => {
            it.currentWeight = new bignumber_js_1.default(it.totalValue).multipliedBy(100).div(allTotalValue).toFixed();
            it.rate = new bignumber_js_1.default(it.totalValue).div(allTotalValue).toFixed();
        });
        return result;
    }
    async priceHistory(chainType) {
        return (await ApiProvider_1.apiProvider.serverApi().klines(chainType + "_GLP", "15m", new Date().getTime() - 30 * 60 * 1000 * 1000, new Date().getTime(), 1000)).map(it => {
            return {
                time: it.time,
                price: it.close
            };
        });
    }
    async price(chainType, account = "") {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const vaultServiceContract = connectInfo.create(contract_1.VaultServiceContract);
        const erc20Contract = connectInfo.create(contract_1.IERC20Contract, chainInfo.GLP);
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [glp, ...prices] = await connectInfo.multiCall().callObj({
            totalSupply: erc20Contract.multicall.totalSupply(),
            decimals: erc20Contract.multicall.decimals(),
            balance: account ? erc20Contract.multicall.balanceOf(account) : "0",
        }, ...vaultTokens.map(it => {
            return {
                price: pythApi.priceBySymbol(it.token.symbol),
                tokenAmount: vaultServiceContract.multicall.getAmountInLP(it.address)
            };
        }));
        const totalSupply = new bignumber_js_1.default(glp.totalSupply).div(10 ** parseInt(glp.decimals, 10)).toFixed();
        const totalValue = prices.map((it, index) => new bignumber_js_1.default(it.price).div(1e8).multipliedBy(new bignumber_js_1.default(it.tokenAmount).div(10 ** vaultTokens[index].token.decimals)).toFixed()).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed());
        let GLPPrice = "0";
        if (new bignumber_js_1.default(totalSupply).gt(0)) {
            GLPPrice = new bignumber_js_1.default(totalValue).div(totalSupply).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        }
        return {
            GLPPrice: GLPPrice,
            totalSupply: totalSupply,
            totalValue: totalValue,
            alpBalance: new bignumber_js_1.default(glp.balance).div(10 ** parseInt(glp.decimals, 10)).toFixed(),
        };
    }
    async index(chainType) {
        const dashboardGLPPrice = await this.price(chainType);
        const prepDashboardDto = await ApiProvider_1.apiProvider.baseApi.prepGraph((0, gql_1.PrepDashboardDtoGQL)());
        return {
            totalValue: dashboardGLPPrice.totalValue,
            totalTradingVolume: (0, get_1.default)(prepDashboardDto, 'positionInfos[0].totalPosition', '0'),
            totalStakers: (0, get_1.default)(prepDashboardDto, 'alpholderInfos[0].count', '0')
        };
    }
};
exports.DashBoardApi = DashBoardApi;
exports.DashBoardApi = DashBoardApi = __decorate([
    (0, tool_1.CacheKey)('DashBoardApi')
], DashBoardApi);
