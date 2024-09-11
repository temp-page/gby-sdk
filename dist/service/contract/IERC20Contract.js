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
exports.IERC20MultiCall = exports.IERC20Contract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/IERC20.json time 2024-09-11T06:51:39.084Z
let IERC20Contract = class IERC20Contract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo, token) {
        super(connectInfo, token, index_1.IERC20Abi);
        this.multicall = new IERC20MultiCall(this.mulContract);
    }
    // approve(address, uint256) nonpayable returns(bool)
    approve(spender, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'approve', [spender, value], {
            value: undefined
        });
    }
    // transfer(address, uint256) nonpayable returns(bool)
    transfer(to, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'transfer', [to, value], {
            value: undefined
        });
    }
    // transferFrom(address, address, uint256) nonpayable returns(bool)
    transferFrom(from, to, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'transferFrom', [from, to, value], {
            value: undefined
        });
    }
    // GET allowance(address, address) view returns(uint256)
    allowance(owner, spender) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.allowance(owner, spender));
    }
    // GET balanceOf(address) view returns(uint256)
    balanceOf(owner) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.balanceOf(owner));
    }
    // GET decimals() pure returns(uint8)
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
exports.IERC20Contract = IERC20Contract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IERC20Contract.prototype, "approve", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IERC20Contract.prototype, "transfer", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], IERC20Contract.prototype, "transferFrom", null);
exports.IERC20Contract = IERC20Contract = __decorate([
    (0, tool_1.CacheKey)('IERC20Contract'),
    __metadata("design:paramtypes", [Function, String])
], IERC20Contract);
class IERC20MultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // allowance(address, address) view returns(uint256)
    allowance(owner, spender) {
        return this.mulContract.allowance(owner, spender);
    }
    // balanceOf(address) view returns(uint256)
    balanceOf(owner) {
        return this.mulContract.balanceOf(owner);
    }
    // decimals() pure returns(uint8)
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
exports.IERC20MultiCall = IERC20MultiCall;
