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
exports.MarketTradeServicesMultiCall = exports.MarketTradeServicesContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/MarketTradeServices.json time 2024-07-10T08:57:11.271Z
let MarketTradeServicesContract = class MarketTradeServicesContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.MarketTradeServicesAbi);
        this.multicall = new MarketTradeServicesMultiCall(this.mulContract);
    }
    // closeMarketTrade(bytes32, bytes[]) nonpayable returns()
    closeMarketTrade(postionHash, priceUpdateData) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'closeMarketTrade', [postionHash, priceUpdateData], {
            value: undefined
        });
    }
    // openMarketTrade(bool, bytes32, bytes32, uint256, uint256, uint32, uint32, bytes[], bytes32) nonpayable returns()
    openMarketTrade(isLong, targetID, tokenID, tokenAmount, leverage, takeProfit, stopLoss, priceUpdateData, referral) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'openMarketTrade', [isLong, targetID, tokenID, tokenAmount, leverage, takeProfit, stopLoss, priceUpdateData, referral], {
            value: undefined
        });
    }
};
exports.MarketTradeServicesContract = MarketTradeServicesContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], MarketTradeServicesContract.prototype, "closeMarketTrade", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, String, String, String, String, String, Array, String]),
    __metadata("design:returntype", Promise)
], MarketTradeServicesContract.prototype, "openMarketTrade", null);
exports.MarketTradeServicesContract = MarketTradeServicesContract = __decorate([
    (0, tool_1.CacheKey)('MarketTradeServicesContract'),
    __metadata("design:paramtypes", [Function])
], MarketTradeServicesContract);
class MarketTradeServicesMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
}
exports.MarketTradeServicesMultiCall = MarketTradeServicesMultiCall;
