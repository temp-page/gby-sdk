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
exports.Multicall2MultiCall = exports.Multicall2Contract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/Multicall2.json time 2024-09-25T08:22:13.333Z
let Multicall2Contract = class Multicall2Contract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().multicall, index_1.Multicall2Abi);
        this.multicall = new Multicall2MultiCall(this.mulContract);
    }
    // aggregate(tuple[]) nonpayable returns(uint256, bytes[])
    aggregate(calls) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'aggregate', [calls], {
            value: undefined
        });
    }
    // blockAndAggregate(tuple[]) nonpayable returns(uint256, bytes32, tuple[])
    blockAndAggregate(calls) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'blockAndAggregate', [calls], {
            value: undefined
        });
    }
    // tryAggregate(bool, tuple[]) nonpayable returns(tuple[])
    tryAggregate(requireSuccess, calls) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'tryAggregate', [requireSuccess, calls], {
            value: undefined
        });
    }
    // tryBlockAndAggregate(bool, tuple[]) nonpayable returns(uint256, bytes32, tuple[])
    tryBlockAndAggregate(requireSuccess, calls) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'tryBlockAndAggregate', [requireSuccess, calls], {
            value: undefined
        });
    }
    // GET getBlockHash(uint256) view returns(bytes32)
    getBlockHash(blockNumber) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getBlockHash(blockNumber));
    }
    // GET getBlockNumber() view returns(uint256)
    getBlockNumber() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getBlockNumber());
    }
    // GET getCurrentBlockCoinbase() view returns(address)
    getCurrentBlockCoinbase() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getCurrentBlockCoinbase());
    }
    // GET getCurrentBlockDifficulty() view returns(uint256)
    getCurrentBlockDifficulty() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getCurrentBlockDifficulty());
    }
    // GET getCurrentBlockGasLimit() view returns(uint256)
    getCurrentBlockGasLimit() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getCurrentBlockGasLimit());
    }
    // GET getCurrentBlockTimestamp() view returns(uint256)
    getCurrentBlockTimestamp() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getCurrentBlockTimestamp());
    }
    // GET getEthBalance(address) view returns(uint256)
    getEthBalance(addr) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getEthBalance(addr));
    }
    // GET getLastBlockHash() view returns(bytes32)
    getLastBlockHash() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getLastBlockHash());
    }
};
exports.Multicall2Contract = Multicall2Contract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], Multicall2Contract.prototype, "aggregate", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], Multicall2Contract.prototype, "blockAndAggregate", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Array]),
    __metadata("design:returntype", Promise)
], Multicall2Contract.prototype, "tryAggregate", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Array]),
    __metadata("design:returntype", Promise)
], Multicall2Contract.prototype, "tryBlockAndAggregate", null);
exports.Multicall2Contract = Multicall2Contract = __decorate([
    (0, tool_1.CacheKey)('Multicall2Contract'),
    __metadata("design:paramtypes", [Function])
], Multicall2Contract);
class Multicall2MultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getBlockHash(uint256) view returns(bytes32)
    getBlockHash(blockNumber) {
        return this.mulContract.getBlockHash(blockNumber);
    }
    // getBlockNumber() view returns(uint256)
    getBlockNumber() {
        return this.mulContract.getBlockNumber();
    }
    // getCurrentBlockCoinbase() view returns(address)
    getCurrentBlockCoinbase() {
        return this.mulContract.getCurrentBlockCoinbase();
    }
    // getCurrentBlockDifficulty() view returns(uint256)
    getCurrentBlockDifficulty() {
        return this.mulContract.getCurrentBlockDifficulty();
    }
    // getCurrentBlockGasLimit() view returns(uint256)
    getCurrentBlockGasLimit() {
        return this.mulContract.getCurrentBlockGasLimit();
    }
    // getCurrentBlockTimestamp() view returns(uint256)
    getCurrentBlockTimestamp() {
        return this.mulContract.getCurrentBlockTimestamp();
    }
    // getEthBalance(address) view returns(uint256)
    getEthBalance(addr) {
        return this.mulContract.getEthBalance(addr);
    }
    // getLastBlockHash() view returns(bytes32)
    getLastBlockHash() {
        return this.mulContract.getLastBlockHash();
    }
}
exports.Multicall2MultiCall = Multicall2MultiCall;
