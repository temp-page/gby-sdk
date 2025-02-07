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
exports.BoostTradeServicesMultiCall = exports.BoostTradeServicesContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/BoostTradeServices.json time 2024-12-03T02:21:42.481Z
let BoostTradeServicesContract = class BoostTradeServicesContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.BoostTradeServicesAbi);
        this.multicall = new BoostTradeServicesMultiCall(this.mulContract);
    }
    // closeBoostTrade(bytes32, bytes[]) nonpayable returns()
    closeBoostTrade(postionHash, priceUpdateData) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'closeBoostTrade', [postionHash, priceUpdateData], {
            value: undefined
        });
    }
    // openBoostTrade(bool, bytes32, bytes32, uint256, uint256, uint32, bytes[], bytes32) payable returns()
    openBoostTrade(isLong, targetID, tokenID, tokenAmount, leverage, takeProfit, priceUpdateData, referral, value) {
        if (referral) {
            return this.connectInfo
                .tx()
                .sendContractTransaction(this.contract, 'openBoostTrade(bool,bytes32,bytes32,uint256,uint256,uint32,bytes[],bytes32)', [isLong, targetID, tokenID, tokenAmount, leverage, takeProfit, priceUpdateData, referral], {
                value
            });
        }
        else {
            return this.connectInfo
                .tx()
                .sendContractTransaction(this.contract, 'openBoostTrade(bool,bytes32,bytes32,uint256,uint256,uint32,bytes[])', [isLong, targetID, tokenID, tokenAmount, leverage, takeProfit, priceUpdateData], {
                value
            });
        }
    }
};
exports.BoostTradeServicesContract = BoostTradeServicesContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BoostTradeServicesContract.prototype, "closeBoostTrade", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, String, String, String, String, Array, String, String]),
    __metadata("design:returntype", Promise)
], BoostTradeServicesContract.prototype, "openBoostTrade", null);
exports.BoostTradeServicesContract = BoostTradeServicesContract = __decorate([
    (0, tool_1.CacheKey)('BoostTradeServicesContract'),
    __metadata("design:paramtypes", [Function])
], BoostTradeServicesContract);
class BoostTradeServicesMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
}
exports.BoostTradeServicesMultiCall = BoostTradeServicesMultiCall;
