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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let VaultServiceContract = class VaultServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.VaultServiceAbi);
    }
    multicall_getAmountInLP(address) {
        return this.mulContract['getAmountInLP(address)'](address);
    }
    multicall_getTokenConfig(address) {
        return this.mulContract.getTokenConfig(address);
    }
    multicall_listTokens() {
        return this.mulContract.listTokens();
    }
    async claimAllShares() {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'claimAllShares', [], {});
    }
    async setMaintainer(maintainer) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'setMaintainer', [maintainer], {});
    }
    async setMaintainerFeeShareRatio(ratio) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'setMaintainerFeeShareRatio', [ratio], {});
    }
    multicall_getMaintainer() {
        return this.mulContract.getMaintainer();
    }
    multicall_getMaintainerShareFeeRatio() {
        return this.mulContract.getMaintainerShareFeeRatio();
    }
    multicall_getAccountAllShare(account) {
        return this.mulContract.getAccountAllShare(account);
    }
    multicall_getAccountTokenShare(account, token) {
        return this.mulContract.getAccountTokenShare(token, account);
    }
    static getVaultValue(token, amount, price) {
        let value;
        if (token.decimals != 10) {
            // value = ((amount * 1e10) * price) / (10 ** decimals);
            value = new bignumber_js_1.default(amount).multipliedBy(1e10).multipliedBy(price).dividedBy(10 ** token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            // value = amount * price;
            value = new bignumber_js_1.default(amount).multipliedBy(price).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        return value;
    }
};
exports.VaultServiceContract = VaultServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "claimAllShares", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "setMaintainer", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "setMaintainerFeeShareRatio", null);
exports.VaultServiceContract = VaultServiceContract = __decorate([
    (0, tool_1.CacheKey)('VaultServiceContract'),
    __metadata("design:paramtypes", [Function])
], VaultServiceContract);
