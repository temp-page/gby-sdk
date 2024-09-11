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
exports.TargetServiceMultiCall = exports.TargetServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/TargetService.json time 2024-09-11T06:51:39.089Z
let TargetServiceContract = class TargetServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.TargetServiceAbi);
        this.multicall = new TargetServiceMultiCall(this.mulContract);
    }
    // addSupportedToken(bytes32, address) nonpayable returns()
    addSupportedToken(targetID, assetToken) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'addSupportedToken', [targetID, assetToken], {
            value: undefined
        });
    }
    // addTarget(string, bytes32, uint8) nonpayable returns()
    addTarget(name, priceID, targetType) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'addTarget', [name, priceID, targetType], {
            value: undefined
        });
    }
    // removeSupportedToken(bytes32, address) nonpayable returns()
    removeSupportedToken(targetID, assetToken) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'removeSupportedToken', [targetID, assetToken], {
            value: undefined
        });
    }
    // removeTarget(bytes32) nonpayable returns()
    removeTarget(targetID) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'removeTarget', [targetID], {
            value: undefined
        });
    }
    // updateAccFundingFee(bytes32) nonpayable returns(int256)
    updateAccFundingFee(targetID) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateAccFundingFee', [targetID], {
            value: undefined
        });
    }
    // updateCloseFeeRate(bytes32, uint16) nonpayable returns()
    updateCloseFeeRate(targetID, closeFeeRate) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateCloseFeeRate', [targetID, closeFeeRate], {
            value: undefined
        });
    }
    // updateFundingFeePerBlockP(bytes32, uint256) nonpayable returns()
    updateFundingFeePerBlockP(targetID, fundingFeePerBlockP) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateFundingFeePerBlockP', [targetID, fundingFeePerBlockP], {
            value: undefined
        });
    }
    // updateOpenFeeRate(bytes32, uint16) nonpayable returns()
    updateOpenFeeRate(targetID, openFeeRate) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateOpenFeeRate', [targetID, openFeeRate], {
            value: undefined
        });
    }
    // updateTargetConfig(bytes32, uint8, uint8, uint256, uint16, uint16, bool, uint256, uint256, uint256, uint256, uint256) nonpayable returns()
    updateTargetConfig(targetID, status, maxTier, execFeeValue, openFeeRate, closeFeeRate, isDynamicCloseFee, fundingFeePerBlockP, minFundingFeeRate, maxFundingFeeRate, maxOpenInterestLong, maxOpenInterestShort) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateTargetConfig', [targetID, status, maxTier, execFeeValue, openFeeRate, closeFeeRate, isDynamicCloseFee, fundingFeePerBlockP, minFundingFeeRate, maxFundingFeeRate, maxOpenInterestLong, maxOpenInterestShort], {
            value: undefined
        });
    }
    // updateTargetMaxAndMinFundingFeeRate(bytes32, uint256, uint256) nonpayable returns()
    updateTargetMaxAndMinFundingFeeRate(targetID, minFundingFeeRate, maxFundingFeeRate) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateTargetMaxAndMinFundingFeeRate', [targetID, minFundingFeeRate, maxFundingFeeRate], {
            value: undefined
        });
    }
    // GET getFundingFee(bytes32) view returns(int256)
    getFundingFee(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getFundingFee(targetID));
    }
    // GET getFundingFeeRate(bytes32) view returns(int256)
    getFundingFeeRate(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getFundingFeeRate(targetID));
    }
    // GET getOpenInterest(bytes32) view returns(tuple)
    getOpenInterest(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getOpenInterest(targetID));
    }
    // GET getTargetConfig(bytes32) view returns(tuple)
    getTargetConfig(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTargetConfig(targetID));
    }
    // GET getTargetPriceID(bytes32) view returns(bytes32)
    getTargetPriceID(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTargetPriceID(targetID));
    }
    // GET listSupportedToken(bytes32) view returns(address[])
    listSupportedToken(targetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listSupportedToken(targetID));
    }
    // GET listTarget() view returns(string[], bytes32[], bytes32[])
    listTarget() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listTarget());
    }
};
exports.TargetServiceContract = TargetServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "addSupportedToken", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "addTarget", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "removeSupportedToken", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "removeTarget", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateAccFundingFee", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateCloseFeeRate", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateFundingFeePerBlockP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateOpenFeeRate", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Boolean, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateTargetConfig", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TargetServiceContract.prototype, "updateTargetMaxAndMinFundingFeeRate", null);
exports.TargetServiceContract = TargetServiceContract = __decorate([
    (0, tool_1.CacheKey)('TargetServiceContract'),
    __metadata("design:paramtypes", [Function])
], TargetServiceContract);
class TargetServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getFundingFee(bytes32) view returns(int256)
    getFundingFee(targetID) {
        return this.mulContract.getFundingFee(targetID);
    }
    // getFundingFeeRate(bytes32) view returns(int256)
    getFundingFeeRate(targetID) {
        return this.mulContract.getFundingFeeRate(targetID);
    }
    // getOpenInterest(bytes32) view returns(tuple)
    getOpenInterest(targetID) {
        return this.mulContract.getOpenInterest(targetID);
    }
    // getTargetConfig(bytes32) view returns(tuple)
    getTargetConfig(targetID) {
        return this.mulContract.getTargetConfig(targetID);
    }
    // getTargetPriceID(bytes32) view returns(bytes32)
    getTargetPriceID(targetID) {
        return this.mulContract.getTargetPriceID(targetID);
    }
    // listSupportedToken(bytes32) view returns(address[])
    listSupportedToken(targetID) {
        return this.mulContract.listSupportedToken(targetID);
    }
    // listTarget() view returns(string[], bytes32[], bytes32[])
    listTarget() {
        return this.mulContract.listTarget();
    }
}
exports.TargetServiceMultiCall = TargetServiceMultiCall;
