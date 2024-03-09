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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const BaseApi_1 = require("./base/BaseApi");
const VaultServiceContract_1 = require("../abi/VaultServiceContract");
let TokenApi = class TokenApi {
    async vaultTokenList(chainType) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = addressInfo.readonlyConnectInfo(chainInfo);
        const vaultServiceContract = connectInfo.create(VaultServiceContract_1.VaultServiceContract);
        const [{ listTokens }] = await connectInfo.multiCall().call({
            listTokens: vaultServiceContract.mulContract.listTokens()
        });
        const [assetIDs, tokens] = await Promise.all([
            connectInfo.multiCall().call(...listTokens[0].map((it) => {
                return {
                    assetID: vaultServiceContract.mulContract.getTokenAssetID(it)
                };
            })),
            this.batchGetTokens(chainInfo, listTokens[0])
        ]);
        const vaultTokens = listTokens[0].map((it, index) => {
            const vaultToken = {
                address: it,
                assetID: assetIDs[index].assetID,
                token: tokens[it],
                weight: listTokens[1][index],
                tokenAmount: listTokens[2][index],
            };
            return vaultToken;
        });
        return vaultTokens;
    }
    async batchGetTokens(chainInfo, addresses) {
        const tokens = await this.getTokenByContract(chainInfo, addresses);
        const tokenMap = {};
        addresses.forEach((it, index) => {
            tokenMap[it] = tokens[index];
        });
        return tokenMap;
    }
    async getTokenByContract(chainInfo, addresses) {
        try {
            const addressInfo = BaseApi_1.BASE_API.address();
            const tokenInfos = await addressInfo.readonlyConnectInfo(chainInfo).erc20().batchGetTokenInfo(...addresses);
            return tokenInfos
                .filter(it => !(0, tool_1.isNullOrBlank)(it.name) && !(0, tool_1.isNullOrBlank)(it.symbol) && it.decimals > 0)
                .map((it) => {
                return new tool_1.Token(chainInfo.chainId, it.address, it.decimals, it.symbol, it.name, `https://agni.finance/static/${it.symbol}.png`);
            });
        }
        catch (e) {
            tool_1.Trace.error('getTokenByContract error ignore', e);
            return [];
        }
    }
};
exports.TokenApi = TokenApi;
__decorate([
    (0, tool_1.MethodCache)("TokenApi.vaultTokenList.${args[0]}", 60 * 60 * 1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokenApi.prototype, "vaultTokenList", null);
exports.TokenApi = TokenApi = __decorate([
    (0, tool_1.CacheKey)('TokenApi')
], TokenApi);
