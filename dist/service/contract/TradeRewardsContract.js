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
exports.TradeRewardsMultiCall = exports.TradeRewardsContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/TradeRewards.json time 2025-06-13T13:33:48.757Z
let TradeRewardsContract = class TradeRewardsContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().tradeReward, index_1.TradeRewardsAbi);
        this.multicall = new TradeRewardsMultiCall(this.mulContract);
    }
    // claim(uint256, uint256, bytes32[]) nonpayable returns()
    claim(round, amount, proof) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'claim', [round, amount, proof], {
            value: undefined
        });
    }
    // GET getClaimed(uint256, address) view returns(bool)
    getClaimed(round, account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getClaimed(round, account));
    }
};
exports.TradeRewardsContract = TradeRewardsContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "claim", null);
exports.TradeRewardsContract = TradeRewardsContract = __decorate([
    (0, tool_1.CacheKey)('TradeRewardsContract'),
    __metadata("design:paramtypes", [Function])
], TradeRewardsContract);
class TradeRewardsMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getClaimed(uint256, address) view returns(bool)
    getClaimed(round, account) {
        return this.mulContract.getClaimed(round, account);
    }
}
exports.TradeRewardsMultiCall = TradeRewardsMultiCall;
