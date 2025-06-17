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
exports.PriceServiceMultiCall = exports.PriceServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/PriceService.json time 2024-12-03T02:21:42.483Z
let PriceServiceContract = class PriceServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.PriceServiceAbi);
        this.multicall = new PriceServiceMultiCall(this.mulContract);
    }
    // getMultiTokenPrice(bytes32[], bytes[]) payable returns(uint256[])
    getMultiTokenPrice(assetID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getMultiTokenPrice', [assetID, priceUpdateData], {
            value: value
        });
    }
    // getPairPrice(bytes32, bytes32, bytes[]) payable returns(uint256, uint256)
    getPairPrice(targetID, tokenID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getPairPrice', [targetID, tokenID, priceUpdateData], {
            value: value
        });
    }
    // getTargetPrice(bytes32, bytes[]) payable returns(uint256)
    getTargetPrice(assetID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getTargetPrice', [assetID, priceUpdateData], {
            value: value
        });
    }
    // getTokenPrice(bytes32, bytes[]) payable returns(uint256)
    getTokenPrice(assetID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getTokenPrice', [assetID, priceUpdateData], {
            value: value
        });
    }
    // setConfidenceIntervalRatio(uint64) nonpayable returns()
    setConfidenceIntervalRatio(confidenceIntervalRatio) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setConfidenceIntervalRatio', [confidenceIntervalRatio], {
            value: undefined
        });
    }
    // setMaxPriceDelaySec(uint16) nonpayable returns()
    setMaxPriceDelaySec(maxPriceDelaySec) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setMaxPriceDelaySec', [maxPriceDelaySec], {
            value: undefined
        });
    }
    // setPythAddress(address) nonpayable returns()
    setPythAddress(pythAddress) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setPythAddress', [pythAddress], {
            value: undefined
        });
    }
    // updatePrice(bytes32[], bytes[]) payable returns()
    updatePrice(priceID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updatePrice', [priceID, priceUpdateData], {
            value: value
        });
    }
    // GET getConfidenceIntervalRatio() view returns(uint64)
    getConfidenceIntervalRatio() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getConfidenceIntervalRatio());
    }
    // GET getMaxPriceDelaySec() view returns(uint256)
    getMaxPriceDelaySec() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getMaxPriceDelaySec());
    }
    // GET getPriceUpdateFee(bytes[]) view returns(uint256)
    getPriceUpdateFee(priceUpdateData) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getPriceUpdateFee(priceUpdateData));
    }
    // GET getPythAddress() view returns(address)
    getPythAddress() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getPythAddress());
    }
};
exports.PriceServiceContract = PriceServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "getMultiTokenPrice", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "getPairPrice", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "getTargetPrice", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "getTokenPrice", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "setConfidenceIntervalRatio", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "setMaxPriceDelaySec", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "setPythAddress", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "updatePrice", null);
exports.PriceServiceContract = PriceServiceContract = __decorate([
    (0, tool_1.CacheKey)('PriceServiceContract'),
    __metadata("design:paramtypes", [Function])
], PriceServiceContract);
class PriceServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getConfidenceIntervalRatio() view returns(uint64)
    getConfidenceIntervalRatio() {
        return this.mulContract.getConfidenceIntervalRatio();
    }
    // getMaxPriceDelaySec() view returns(uint256)
    getMaxPriceDelaySec() {
        return this.mulContract.getMaxPriceDelaySec();
    }
    // getPriceUpdateFee(bytes[]) view returns(uint256)
    getPriceUpdateFee(priceUpdateData) {
        return this.mulContract.getPriceUpdateFee(priceUpdateData);
    }
    // getPythAddress() view returns(address)
    getPythAddress() {
        return this.mulContract.getPythAddress();
    }
}
exports.PriceServiceMultiCall = PriceServiceMultiCall;
