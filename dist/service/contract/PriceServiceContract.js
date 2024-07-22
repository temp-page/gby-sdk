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
// codegen for src/abi/service/PriceService.json time 2024-07-10T08:57:11.273Z
let PriceServiceContract = class PriceServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.PriceServiceAbi);
        this.multicall = new PriceServiceMultiCall(this.mulContract);
    }
    // getPrice(bytes32, bytes32, bytes[]) payable returns(uint256, uint256)
    getPrice(assetID, priceID, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getPrice', [assetID, priceID, priceUpdateData], {
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
    // setMaxPriceDelaySec(uint16) nonpayable returns()
    setMaxPriceDelaySec(maxPriceDelaySec) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setMaxPriceDelaySec', [maxPriceDelaySec], {
            value: undefined
        });
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
    __metadata("design:paramtypes", [String, String, Array, String]),
    __metadata("design:returntype", Promise)
], PriceServiceContract.prototype, "getPrice", null);
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
], PriceServiceContract.prototype, "setMaxPriceDelaySec", null);
exports.PriceServiceContract = PriceServiceContract = __decorate([
    (0, tool_1.CacheKey)('PriceServiceContract'),
    __metadata("design:paramtypes", [Function])
], PriceServiceContract);
class PriceServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
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
