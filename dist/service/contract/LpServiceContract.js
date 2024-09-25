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
exports.LpServiceMultiCall = exports.LpServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/LpService.json time 2024-09-25T08:22:13.335Z
let LpServiceContract = class LpServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.LpServiceAbi);
        this.multicall = new LpServiceMultiCall(this.mulContract);
    }
    // burnALP(bytes32, uint256, uint256, bytes[]) nonpayable returns()
    burnALP(assetID, amountALP, acceptableMinTokenAmount, priceUpdateData) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'burnALP', [assetID, amountALP, acceptableMinTokenAmount, priceUpdateData], {
            value: undefined
        });
    }
    // getAlpPrice(bytes[]) nonpayable returns(uint256)
    getAlpPrice(priceUpdateData) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'getAlpPrice', [priceUpdateData], {
            value: undefined
        });
    }
    // handleBurnALP(address, bytes32, uint256, uint256, uint256, uint256, uint256) nonpayable returns()
    handleBurnALP(account, assetID, amountALP, acceptableMinTokenAmount, tokenPrice, vaultValue, tokenValueInVault) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'handleBurnALP', [account, assetID, amountALP, acceptableMinTokenAmount, tokenPrice, vaultValue, tokenValueInVault], {
            value: undefined
        });
    }
    // handleMintALP(address, bytes32, uint256, uint256, uint256, uint256, uint256) nonpayable returns()
    handleMintALP(account, assetID, tokenAmount, acceptableMinAlpAmount, tokenPrice, vaultValue, tokenValueInVault) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'handleMintALP', [account, assetID, tokenAmount, acceptableMinAlpAmount, tokenPrice, vaultValue, tokenValueInVault], {
            value: undefined
        });
    }
    // mintALP(bytes32, uint256, uint256, bytes[]) payable returns()
    mintALP(assetID, amountToken, acceptableMinAlpAmount, priceUpdateData, value) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'mintALP', [assetID, amountToken, acceptableMinAlpAmount, priceUpdateData], {
            value: value
        });
    }
    // setAlpAddress(address) nonpayable returns()
    setAlpAddress(alpAddress) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setAlpAddress', [alpAddress], {
            value: undefined
        });
    }
    // setCoolingDuration(uint256) nonpayable returns()
    setCoolingDuration(coolingDuration) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setCoolingDuration', [coolingDuration], {
            value: undefined
        });
    }
    // GET AlpAmount() view returns(uint256)
    AlpAmount() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.AlpAmount());
    }
    // GET getAccountCoolingTime(address) view returns(uint256)
    getAccountCoolingTime(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAccountCoolingTime(account));
    }
    // GET getAccountLatestMintTime(address) view returns(uint256)
    getAccountLatestMintTime(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAccountLatestMintTime(account));
    }
    // GET getAlpAddress() view returns(address)
    getAlpAddress() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAlpAddress());
    }
    // GET getCoolingDuration() view returns(uint256)
    getCoolingDuration() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getCoolingDuration());
    }
};
exports.LpServiceContract = LpServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Array]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "burnALP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "getAlpPrice", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "handleBurnALP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "handleMintALP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Array, String]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "mintALP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "setAlpAddress", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LpServiceContract.prototype, "setCoolingDuration", null);
exports.LpServiceContract = LpServiceContract = __decorate([
    (0, tool_1.CacheKey)('LpServiceContract'),
    __metadata("design:paramtypes", [Function])
], LpServiceContract);
class LpServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // AlpAmount() view returns(uint256)
    AlpAmount() {
        return this.mulContract.AlpAmount();
    }
    // getAccountCoolingTime(address) view returns(uint256)
    getAccountCoolingTime(account) {
        return this.mulContract.getAccountCoolingTime(account);
    }
    // getAccountLatestMintTime(address) view returns(uint256)
    getAccountLatestMintTime(account) {
        return this.mulContract.getAccountLatestMintTime(account);
    }
    // getAlpAddress() view returns(address)
    getAlpAddress() {
        return this.mulContract.getAlpAddress();
    }
    // getCoolingDuration() view returns(uint256)
    getCoolingDuration() {
        return this.mulContract.getCoolingDuration();
    }
}
exports.LpServiceMultiCall = LpServiceMultiCall;
