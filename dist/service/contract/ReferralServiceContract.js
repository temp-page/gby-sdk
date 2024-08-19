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
exports.ReferralServiceMultiCall = exports.ReferralServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/ReferralService.json time 2024-08-09T14:30:06.777Z
let ReferralServiceContract = class ReferralServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.ReferralServiceAbi);
        this.multicall = new ReferralServiceMultiCall(this.mulContract);
    }
    // addReferral(string, address) nonpayable returns(bytes32)
    addReferral(referralLiteral, _referralAddress) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'addReferral', [referralLiteral, _referralAddress], {
            value: undefined
        });
    }
    // bindAccountToReferral(string, address) nonpayable returns()
    bindAccountToReferral(referralLiteral, _account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'bindAccountToReferral', [referralLiteral, _account], {
            value: undefined
        });
    }
    // bindAccountToReferralID(bytes32, address) nonpayable returns()
    bindAccountToReferralID(_referralID, _account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'bindAccountToReferralID', [_referralID, _account], {
            value: undefined
        });
    }
    // removeReferralByID(bytes32) nonpayable returns()
    removeReferralByID(referralID) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'removeReferralByID', [referralID], {
            value: undefined
        });
    }
    // setDefaultFeeDiscount(uint16) nonpayable returns()
    setDefaultFeeDiscount(_defaultDiscount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setDefaultFeeDiscount', [_defaultDiscount], {
            value: undefined
        });
    }
    // setDefaultFeeShare(uint16) nonpayable returns()
    setDefaultFeeShare(_defaultShare) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setDefaultFeeShare', [_defaultShare], {
            value: undefined
        });
    }
    // unbindAccountFromReferral(address) nonpayable returns()
    unbindAccountFromReferral(_account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'unbindAccountFromReferral', [_account], {
            value: undefined
        });
    }
    // updateReferralFeeDiscount(bytes32, uint16) nonpayable returns()
    updateReferralFeeDiscount(_referral, _newDiscount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateReferralFeeDiscount', [_referral, _newDiscount], {
            value: undefined
        });
    }
    // updateReferralFeeShare(bytes32, uint16) nonpayable returns()
    updateReferralFeeShare(_referral, _newShare) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateReferralFeeShare', [_referral, _newShare], {
            value: undefined
        });
    }
    // GET getConfigForReferral(bytes32) view returns(string, uint16, uint16)
    getConfigForReferral(_referral) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getConfigForReferral(_referral));
    }
    // GET getDefaultFeeDiscount() view returns(uint16)
    getDefaultFeeDiscount() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getDefaultFeeDiscount());
    }
    // GET getDefaultFeeShare() view returns(uint16)
    getDefaultFeeShare() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getDefaultFeeShare());
    }
    // GET getReferralByReferralID(bytes32) view returns(string)
    getReferralByReferralID(_referralID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralByReferralID(_referralID));
    }
    // GET getReferralFeeDiscount(bytes32) view returns(uint16)
    getReferralFeeDiscount(_referral) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralFeeDiscount(_referral));
    }
    // GET getReferralFeeShare(bytes32) view returns(uint16)
    getReferralFeeShare(_referral) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralFeeShare(_referral));
    }
    // GET getReferralIDByAccountAddress(address) view returns(bytes32)
    getReferralIDByAccountAddress(_account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralIDByAccountAddress(_account));
    }
    // GET getReferralIDByLiteral(string) view returns(bytes32)
    getReferralIDByLiteral(referralLiteral) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralIDByLiteral(referralLiteral));
    }
    // GET getReferralbyReferrerAddress(address) view returns(string)
    getReferralbyReferrerAddress(_referrerAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferralbyReferrerAddress(_referrerAddress));
    }
    // GET getReferrerAddressByReferralID(bytes32) view returns(address)
    getReferrerAddressByReferralID(_referralID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getReferrerAddressByReferralID(_referralID));
    }
    // GET listReferrals() view returns(string[], bytes32[], uint16[], uint16[])
    listReferrals() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listReferrals());
    }
};
exports.ReferralServiceContract = ReferralServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "addReferral", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "bindAccountToReferral", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "bindAccountToReferralID", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "removeReferralByID", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "setDefaultFeeDiscount", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "setDefaultFeeShare", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralServiceContract.prototype, "unbindAccountFromReferral", null);
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
class ReferralServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getConfigForReferral(bytes32) view returns(string, uint16, uint16)
    getConfigForReferral(_referral) {
        return this.mulContract.getConfigForReferral(_referral);
    }
    // getDefaultFeeDiscount() view returns(uint16)
    getDefaultFeeDiscount() {
        return this.mulContract.getDefaultFeeDiscount();
    }
    // getDefaultFeeShare() view returns(uint16)
    getDefaultFeeShare() {
        return this.mulContract.getDefaultFeeShare();
    }
    // getReferralByReferralID(bytes32) view returns(string)
    getReferralByReferralID(_referralID) {
        return this.mulContract.getReferralByReferralID(_referralID);
    }
    // getReferralFeeDiscount(bytes32) view returns(uint16)
    getReferralFeeDiscount(_referral) {
        return this.mulContract.getReferralFeeDiscount(_referral);
    }
    // getReferralFeeShare(bytes32) view returns(uint16)
    getReferralFeeShare(_referral) {
        return this.mulContract.getReferralFeeShare(_referral);
    }
    // getReferralIDByAccountAddress(address) view returns(bytes32)
    getReferralIDByAccountAddress(_account) {
        return this.mulContract.getReferralIDByAccountAddress(_account);
    }
    // getReferralIDByLiteral(string) view returns(bytes32)
    getReferralIDByLiteral(referralLiteral) {
        return this.mulContract.getReferralIDByLiteral(referralLiteral);
    }
    // getReferralbyReferrerAddress(address) view returns(string)
    getReferralbyReferrerAddress(_referrerAddress) {
        return this.mulContract.getReferralbyReferrerAddress(_referrerAddress);
    }
    // getReferrerAddressByReferralID(bytes32) view returns(address)
    getReferrerAddressByReferralID(_referralID) {
        return this.mulContract.getReferrerAddressByReferralID(_referralID);
    }
    // listReferrals() view returns(string[], bytes32[], uint16[], uint16[])
    listReferrals() {
        return this.mulContract.listReferrals();
    }
}
exports.ReferralServiceMultiCall = ReferralServiceMultiCall;
