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
exports.DashBoardApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const abi_1 = require("../abi");
const ApiProvider_1 = require("./provider/ApiProvider");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let DashBoardApi = class DashBoardApi {
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
            const pnlValue = tool_1.MarketTradeMath.pnl(openPosition.isLong, openPosition.targetAmount, openPosition.openPrice, new bignumber_js_1.default(tickPrice.close).multipliedBy(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed(0, bignumber_js_1.default.ROUND_DOWN));
            const pnl = new bignumber_js_1.default(pnlValue).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            const positionSize = new bignumber_js_1.default(openPosition.targetAmount).multipliedBy(openPosition.openPrice).div(10 ** vo_1.CONST.QTY_DECIMALS).div(10 ** vo_1.CONST.PRICE_DECIMALS).toFixed();
            accElement.longOl = openPosition.isLong ? new bignumber_js_1.default(accElement.longOl).plus(positionSize).toFixed() : accElement.longOl;
            accElement.shortOl = openPosition.isLong ? accElement.shortOl : new bignumber_js_1.default(accElement.shortOl).plus(positionSize).toFixed();
            accElement.netOl = new bignumber_js_1.default(accElement.longOl).minus(accElement.shortOl).toFixed();
            accElement.totalOl = new bignumber_js_1.default(accElement.longOl).plus(accElement.shortOl).toFixed();
            accElement.unrealizedPNL = new bignumber_js_1.default(accElement.unrealizedPNL).plus(pnl).toFixed();
            acc[openPosition.target] = accElement;
            return acc;
        }, {});
        const dashboardGLPPrice = await ApiProvider_1.apiProvider.dashBoardApi().price(chainType);
        // 接口
        const pools = Object.values(positionDatas).sort((a, b) => new bignumber_js_1.default(b.totalOl).comparedTo(a.totalOl));
        return {
            totalPoolValue: dashboardGLPPrice.totalValue,
            totalOl: pools.map(it => it.totalOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed()),
            longOl: pools.map(it => it.longOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed()),
            shortOl: pools.map(it => it.shortOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed()),
            netOl: pools.map(it => it.netOl).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed()),
            unrealizedPNL: pools.map(it => it.unrealizedPNL).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed()),
            pools: pools
        };
    }
    async liquidityComposition(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const portalContract = connectInfo.create(abi_1.PortalContract);
        const vaultServiceContract = connectInfo.create(abi_1.VaultServiceContract);
        const [...tokenConfigs] = await connectInfo.multiCall().callObj(...vaultTokens.map(it => {
            return {
                tokenConfig: vaultServiceContract.multicall_getTokenConfig(it.address),
                tokenAmount: vaultServiceContract.multicall_getTokenAmount(it.address),
                price: portalContract.multicall_getPrice(it.assetID),
            };
        }));
        const targetTotalWeight = vaultTokens.map(it => it.weight).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed());
        const result = vaultTokens.map((it, index) => {
            return {
                token: it.token,
                tokenQuantity: new bignumber_js_1.default(tokenConfigs[index].tokenAmount).div(10 ** it.token.decimals).toFixed(),
                totalValue: new bignumber_js_1.default(tokenConfigs[index].price[0]).div(1e8).multipliedBy(new bignumber_js_1.default(tokenConfigs[index].tokenAmount).div(10 ** it.token.decimals)).toFixed(),
                buyFee: new bignumber_js_1.default(tokenConfigs[index].tokenConfig.feeBasisPoints).div(1e4).multipliedBy("100").toFixed(),
                sellFee: new bignumber_js_1.default(tokenConfigs[index].tokenConfig.taxBasisPoints).div(1e4).multipliedBy("100").toFixed(),
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
    async price(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const portalContract = connectInfo.create(abi_1.PortalContract);
        const vaultServiceContract = connectInfo.create(abi_1.VaultServiceContract);
        const erc20Contract = connectInfo.create(abi_1.ERC20Contract, chainInfo.GLP);
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const [glp, ...prices] = await connectInfo.multiCall().callObj({
            totalSupply: erc20Contract.multicall_totalSupply(),
            decimals: erc20Contract.multicall_decimals(),
            GlpPrice: portalContract.multicall_GlpPrice(),
            vaultValue: portalContract.multicall_getVaultValue(),
        }, ...vaultTokens.map(it => {
            return {
                price: portalContract.multicall_getPrice(it.assetID),
                tokenAmount: vaultServiceContract.multicall_getTokenAmount(it.address)
            };
        }));
        const totalSupply = new bignumber_js_1.default(glp.totalSupply).div(10 ** parseInt(glp.decimals, 10)).toFixed();
        const totalValue = prices.map((it, index) => new bignumber_js_1.default(it.price[0]).div(1e8).multipliedBy(new bignumber_js_1.default(it.tokenAmount).div(10 ** vaultTokens[index].token.decimals)).toFixed()).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed());
        let GLPPrice = "0";
        if (new bignumber_js_1.default(totalSupply).gt(0)) {
            GLPPrice = new bignumber_js_1.default(totalValue).div(totalSupply).toFixed(8, bignumber_js_1.default.ROUND_DOWN);
        }
        return {
            GLPPrice: GLPPrice,
            totalSupply: totalSupply,
            totalValue: totalValue,
        };
    }
    async stakeInfo() {
        return undefined;
    }
};
exports.DashBoardApi = DashBoardApi;
__decorate([
    (0, tool_1.MethodCache)("DashBoardApi.poolPosition.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashBoardApi.prototype, "poolPosition", null);
__decorate([
    (0, tool_1.MethodCache)("DashBoardApi.liquidityComposition.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashBoardApi.prototype, "liquidityComposition", null);
__decorate([
    (0, tool_1.MethodCache)("DashBoardApi.price.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashBoardApi.prototype, "price", null);
exports.DashBoardApi = DashBoardApi = __decorate([
    (0, tool_1.CacheKey)('DashBoardApi')
], DashBoardApi);
