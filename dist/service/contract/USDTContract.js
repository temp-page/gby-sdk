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
exports.USDTMultiCall = exports.USDTContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/USDT.json time 2024-07-10T08:57:11.268Z
let USDTContract = class USDTContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo, token) {
        super(connectInfo, token, index_1.USDTAbi);
        this.multicall = new USDTMultiCall(this.mulContract);
    }
    // approve(address, uint256) nonpayable returns(bool)
    approve(spender, amount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'approve', [spender, amount], {
            value: undefined
        });
    }
    // decreaseAllowance(address, uint256) nonpayable returns(bool)
    decreaseAllowance(spender, subtractedValue) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'decreaseAllowance', [spender, subtractedValue], {
            value: undefined
        });
    }
    // increaseAllowance(address, uint256) nonpayable returns(bool)
    increaseAllowance(spender, addedValue) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'increaseAllowance', [spender, addedValue], {
            value: undefined
        });
    }
    // mint() nonpayable returns()
    mint() {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'mint', [], {
            value: undefined
        });
    }
    // transfer(address, uint256) nonpayable returns(bool)
    transfer(to, amount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'transfer', [to, amount], {
            value: undefined
        });
    }
    // transferFrom(address, address, uint256) nonpayable returns(bool)
    transferFrom(from, to, amount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'transferFrom', [from, to, amount], {
            value: undefined
        });
    }
    // GET allowance(address, address) view returns(uint256)
    allowance(owner, spender) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.allowance(owner, spender));
    }
    // GET balanceOf(address) view returns(uint256)
    balanceOf(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.balanceOf(account));
    }
    // GET decimals() view returns(uint8)
    decimals() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.decimals());
    }
    // GET name() view returns(string)
    name() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.name());
    }
    // GET symbol() view returns(string)
    symbol() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.symbol());
    }
    // GET totalSupply() view returns(uint256)
    totalSupply() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.totalSupply());
    }
};
exports.USDTContract = USDTContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "approve", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "decreaseAllowance", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "increaseAllowance", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "mint", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "transfer", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], USDTContract.prototype, "transferFrom", null);
exports.USDTContract = USDTContract = __decorate([
    (0, tool_1.CacheKey)('USDTContract'),
    __metadata("design:paramtypes", [Function, String])
], USDTContract);
class USDTMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // allowance(address, address) view returns(uint256)
    allowance(owner, spender) {
        return this.mulContract.allowance(owner, spender);
    }
    // balanceOf(address) view returns(uint256)
    balanceOf(account) {
        return this.mulContract.balanceOf(account);
    }
    // decimals() view returns(uint8)
    decimals() {
        return this.mulContract.decimals();
    }
    // name() view returns(string)
    name() {
        return this.mulContract.name();
    }
    // symbol() view returns(string)
    symbol() {
        return this.mulContract.symbol();
    }
    // totalSupply() view returns(uint256)
    totalSupply() {
        return this.mulContract.totalSupply();
    }
}
exports.USDTMultiCall = USDTMultiCall;
