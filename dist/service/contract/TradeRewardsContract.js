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
// codegen for src/abi/TradeRewards.json time 2025-06-27T02:06:37.301Z
let TradeRewardsContract = class TradeRewardsContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo, address) {
        super(connectInfo, address, index_1.TradeRewardsAbi);
        this.multicall = new TradeRewardsMultiCall(this.mulContract);
    }
    // claim(uint256, uint256, bytes32[]) nonpayable returns()
    claim(round, amount, proof) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'claim', [round, amount, proof], {
            value: undefined
        });
    }
    // closeRound(uint256) nonpayable returns()
    closeRound(round) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'closeRound', [round], {
            value: undefined
        });
    }
    // openRound(uint256) nonpayable returns()
    openRound(round) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'openRound', [round], {
            value: undefined
        });
    }
    // renounceOwnership() nonpayable returns()
    renounceOwnership() {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'renounceOwnership', [], {
            value: undefined
        });
    }
    // setRewardToken(address) nonpayable returns()
    setRewardToken(token) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setRewardToken', [token], {
            value: undefined
        });
    }
    // setup(uint256, uint256, uint256, uint256) payable returns()
    setup(round, amount, deadline, merkleRoot, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setup', [round, amount, deadline, merkleRoot], {
            value: value
        });
    }
    // transferOwnership(address) nonpayable returns()
    transferOwnership(newOwner) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'transferOwnership', [newOwner], {
            value: undefined
        });
    }
    // withdraw(uint256) nonpayable returns()
    withdraw(amount) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'withdraw', [amount], {
            value: undefined
        });
    }
    // GET claimed(uint256, address) view returns(bool)
    claimed(arg0, arg1) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.claimed(arg0, arg1));
    }
    // GET currentRound() view returns(uint256)
    currentRound() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.currentRound());
    }
    // GET getClaimed(uint256, address) view returns(bool)
    getClaimed(round, user) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getClaimed(round, user));
    }
    // GET owner() view returns(address)
    owner() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.owner());
    }
    // GET rewardToken() view returns(address)
    rewardToken() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.rewardToken());
    }
    // GET rewards(uint256) view returns(uint256, uint256, uint256, uint256, uint256, bool)
    rewards(index) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.rewards(index));
    }
};
exports.TradeRewardsContract = TradeRewardsContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "claim", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "closeRound", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "openRound", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "renounceOwnership", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "setRewardToken", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "setup", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "transferOwnership", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeRewardsContract.prototype, "withdraw", null);
exports.TradeRewardsContract = TradeRewardsContract = __decorate([
    (0, tool_1.CacheKey)('TradeRewardsContract'),
    __metadata("design:paramtypes", [Function, String])
], TradeRewardsContract);
class TradeRewardsMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // claimed(uint256, address) view returns(bool)
    claimed(arg0, arg1) {
        return this.mulContract.claimed(arg0, arg1);
    }
    // currentRound() view returns(uint256)
    currentRound() {
        return this.mulContract.currentRound();
    }
    // getClaimed(uint256, address) view returns(bool)
    getClaimed(round, user) {
        return this.mulContract.getClaimed(round, user);
    }
    // owner() view returns(address)
    owner() {
        return this.mulContract.owner();
    }
    // rewardToken() view returns(address)
    rewardToken() {
        return this.mulContract.rewardToken();
    }
    // rewards(uint256) view returns(uint256, uint256, uint256, uint256, uint256, bool)
    rewards(index) {
        return this.mulContract.rewards(index);
    }
}
exports.TradeRewardsMultiCall = TradeRewardsMultiCall;
