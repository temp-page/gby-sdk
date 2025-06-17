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
exports.IpythMultiCall = exports.IpythContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/pyth/Ipyth.json time 2024-12-04T09:54:53.367Z
let IpythContract = class IpythContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().Pyth, index_1.IpythAbi);
        this.multicall = new IpythMultiCall(this.mulContract);
    }
    // updatePriceFeeds(bytes[]) payable returns()
    updatePriceFeeds(updateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updatePriceFeeds', [updateData], {
            value: value
        });
    }
    // GET getPriceNoOlderThan(bytes32, uint256) view returns(tuple)
    getPriceNoOlderThan(id, age) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getPriceNoOlderThan(id, age));
    }
    // GET getUpdateFee(bytes[]) view returns(uint256)
    getUpdateFee(priceUpdateData) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getUpdateFee(priceUpdateData));
    }
};
exports.IpythContract = IpythContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], IpythContract.prototype, "updatePriceFeeds", null);
exports.IpythContract = IpythContract = __decorate([
    (0, tool_1.CacheKey)('IpythContract'),
    __metadata("design:paramtypes", [Function])
], IpythContract);
class IpythMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getPriceNoOlderThan(bytes32, uint256) view returns(tuple)
    getPriceNoOlderThan(id, age) {
        return this.mulContract.getPriceNoOlderThan(id, age);
    }
    // getUpdateFee(bytes[]) view returns(uint256)
    getUpdateFee(priceUpdateData) {
        return this.mulContract.getUpdateFee(priceUpdateData);
    }
}
exports.IpythMultiCall = IpythMultiCall;
