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
exports.ReferralServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
let ReferralServiceContract = class ReferralServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.ReferralServiceAbi);
    }
    async setDefaultFeeDiscount(_defaultDiscount) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'setDefaultFeeDiscount', [_defaultDiscount], {});
    }
    async addReferral(_referral, _referralAddress) {
        return this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'addReferral', [_referral, _referralAddress], {});
    }
    async removeReferral(_referral) {
        return this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'removeReferral', [_referral], {});
    }
    async updateReferralFeeDiscount(_referral, _newDiscount) {
        return this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'updateReferralFeeDiscount', [_referral, _newDiscount], {});
    }
    async updateReferralFeeShare(_referral, _newShare) {
        return this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'updateReferralFeeShare', [_referral, _newShare], {});
    }
    multicall_getDefaultFeeShare() {
        return this.mulContract.getDefaultFeeShare();
    }
    multicall_getDefaultFeeDiscount() {
        return this.mulContract.getDefaultFeeDiscount();
    }
    multicall_getReferralList() {
        return this.mulContract.getReferralList();
    }
};
exports.ReferralServiceContract = ReferralServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "setDefaultFeeDiscount", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "addReferral", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "removeReferral", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "updateReferralFeeDiscount", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "updateReferralFeeShare", null);
exports.ReferralServiceContract = ReferralServiceContract = __decorate([
    (0, tool_1.CacheKey)('ReferralServiceContract'),
    __metadata("design:paramtypes", [Function])
], ReferralServiceContract);
