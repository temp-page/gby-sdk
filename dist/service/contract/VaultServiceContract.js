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
exports.VaultServiceMultiCall = exports.VaultServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/VaultService.json time 2024-07-27T13:51:30.455Z
let VaultServiceContract = class VaultServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.VaultServiceAbi);
        this.multicall = new VaultServiceMultiCall(this.mulContract);
    }
    // addToken(string, address, bytes32, bool, bool, uint16, uint16, bool, uint16[]) nonpayable returns()
    addToken(nameString, tokenAddress, tokenPriceID, isStable, enable, feeBasisPoints, taxBasisPoints, isDynamicFee, targetWeights) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'addToken', [nameString, tokenAddress, tokenPriceID, isStable, enable, feeBasisPoints, taxBasisPoints, isDynamicFee, targetWeights], {
            value: undefined
        });
    }
    // claimAllShares() nonpayable returns()
    claimAllShares() {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'claimAllShares', [], {
            value: undefined
        });
    }
    // claimTokenShare(address) nonpayable returns()
    claimTokenShare(tokenAddress) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'claimTokenShare', [tokenAddress], {
            value: undefined
        });
    }
    // decreaseAmountInLP(bytes32, uint256) nonpayable returns()
    decreaseAmountInLP(tokenID, amountToDec) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'decreaseAmountInLP', [tokenID, amountToDec], {
            value: undefined
        });
    }
    // decreaseClaimableAmount(address, address, uint256) nonpayable returns()
    decreaseClaimableAmount(tokenAddress, account, amountToDec) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'decreaseClaimableAmount', [tokenAddress, account, amountToDec], {
            value: undefined
        });
    }
    // decreaseTokenEmployed(bytes32, uint256) nonpayable returns()
    decreaseTokenEmployed(tokenID, amountToEmployed) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'decreaseTokenEmployed', [tokenID, amountToEmployed], {
            value: undefined
        });
    }
    // increaseAmountInLP(bytes32, uint256) nonpayable returns()
    increaseAmountInLP(tokenID, amountToInc) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'increaseAmountInLP', [tokenID, amountToInc], {
            value: undefined
        });
    }
    // increaseClaimableAmount(address, address, uint256) nonpayable returns()
    increaseClaimableAmount(tokenAddress, account, amountToInc) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'increaseClaimableAmount', [tokenAddress, account, amountToInc], {
            value: undefined
        });
    }
    // increaseTokenEmployed(bytes32, uint256) nonpayable returns()
    increaseTokenEmployed(tokenID, amountToEmployed) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'increaseTokenEmployed', [tokenID, amountToEmployed], {
            value: undefined
        });
    }
    // removeToken(address, uint16[]) nonpayable returns()
    removeToken(tokenAddress, targetWeights) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'removeToken', [tokenAddress, targetWeights], {
            value: undefined
        });
    }
    // setMaintainer(address) nonpayable returns()
    setMaintainer(maintainer) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setMaintainer', [maintainer], {
            value: undefined
        });
    }
    // setMaintainerFeeShareRatio(uint16) nonpayable returns()
    setMaintainerFeeShareRatio(ratio) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setMaintainerFeeShareRatio', [ratio], {
            value: undefined
        });
    }
    // updateTokenFee(address, uint16, uint16, bool) nonpayable returns()
    updateTokenFee(tokenAddress, feeBasisPoints, taxBasisPoints, isDynamicFee) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateTokenFee', [tokenAddress, feeBasisPoints, taxBasisPoints, isDynamicFee], {
            value: undefined
        });
    }
    // updateTokenTargetWeights(uint16[]) nonpayable returns()
    updateTokenTargetWeights(targetWeights) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateTokenTargetWeights', [targetWeights], {
            value: undefined
        });
    }
    // updateVaultReserve(uint16) nonpayable returns()
    updateVaultReserve(vaultReserve) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updateVaultReserve', [vaultReserve], {
            value: undefined
        });
    }
    // GET getAccountAllShare(address) view returns(uint256[])
    getAccountAllShare(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAccountAllShare(account));
    }
    // GET getAccountTokenShare(address, address) view returns(uint256)
    getAccountTokenShare(account, tokenAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAccountTokenShare(account, tokenAddress));
    }
    // GET getAllTokenAmount() view returns(uint256[])
    getAllTokenAmount() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAllTokenAmount());
    }
    // GET getAllTokenConfig() view returns(tuple[])
    getAllTokenConfig() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAllTokenConfig());
    }
    // GET getAllTokenPriceID() view returns(bytes32[])
    getAllTokenPriceID() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAllTokenPriceID());
    }
    // GET getAllTokenTargetWeight() view returns(uint16[])
    getAllTokenTargetWeight() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAllTokenTargetWeight());
    }
    // GET getAmountInLP(address) view returns(uint256)
    getAmountInLP(tokenAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAmountInLP(tokenAddress));
    }
    // GET getAvailableTokenAmount(bytes32) view returns(uint256)
    getAvailableTokenAmount(tokenID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAvailableTokenAmount(tokenID));
    }
    // GET getEmployedAmount(bytes32) view returns(uint256)
    getEmployedAmount(tokenID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getEmployedAmount(tokenID));
    }
    // GET getMaintainer() view returns(address)
    getMaintainer() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getMaintainer());
    }
    // GET getMaintainerShareFeeRatio() view returns(uint16)
    getMaintainerShareFeeRatio() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getMaintainerShareFeeRatio());
    }
    // GET getTokenAddress(bytes32) view returns(address)
    getTokenAddress(assetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenAddress(assetID));
    }
    // GET getTokenAssetID(address) view returns(bytes32)
    getTokenAssetID(tokenAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenAssetID(tokenAddress));
    }
    // GET getTokenConfig(address) view returns(tuple)
    getTokenConfig(tokenAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenConfig(tokenAddress));
    }
    // GET getTokenOrder(address) view returns(uint16)
    getTokenOrder(serviceAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenOrder(serviceAddress));
    }
    // GET getTokenPriceID(address) view returns(bytes32)
    getTokenPriceID(token) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenPriceID(token));
    }
    // GET getTokenTargetWeight(address) view returns(uint16)
    getTokenTargetWeight(tokenAddress) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTokenTargetWeight(tokenAddress));
    }
    // GET getTotalClaimableAmount(bytes32) view returns(uint256)
    getTotalClaimableAmount(assetID) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getTotalClaimableAmount(assetID));
    }
    // GET getVaultReserve() view returns(uint16)
    getVaultReserve() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getVaultReserve());
    }
    // GET listTokens() view returns(string[], address[], bytes32[], bytes32[], uint16[], uint256[])
    listTokens() {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listTokens());
    }
};
exports.VaultServiceContract = VaultServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, Boolean, String, String, Boolean, Array]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "addToken", null);
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
], VaultServiceContract.prototype, "claimTokenShare", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "decreaseAmountInLP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "decreaseClaimableAmount", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "decreaseTokenEmployed", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "increaseAmountInLP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "increaseClaimableAmount", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "increaseTokenEmployed", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "removeToken", null);
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
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "updateTokenFee", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "updateTokenTargetWeights", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VaultServiceContract.prototype, "updateVaultReserve", null);
exports.VaultServiceContract = VaultServiceContract = __decorate([
    (0, tool_1.CacheKey)('VaultServiceContract'),
    __metadata("design:paramtypes", [Function])
], VaultServiceContract);
class VaultServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getAccountAllShare(address) view returns(uint256[])
    getAccountAllShare(account) {
        return this.mulContract.getAccountAllShare(account);
    }
    // getAccountTokenShare(address, address) view returns(uint256)
    getAccountTokenShare(account, tokenAddress) {
        return this.mulContract.getAccountTokenShare(account, tokenAddress);
    }
    // getAllTokenAmount() view returns(uint256[])
    getAllTokenAmount() {
        return this.mulContract.getAllTokenAmount();
    }
    // getAllTokenConfig() view returns(tuple[])
    getAllTokenConfig() {
        return this.mulContract.getAllTokenConfig();
    }
    // getAllTokenPriceID() view returns(bytes32[])
    getAllTokenPriceID() {
        return this.mulContract.getAllTokenPriceID();
    }
    // getAllTokenTargetWeight() view returns(uint16[])
    getAllTokenTargetWeight() {
        return this.mulContract.getAllTokenTargetWeight();
    }
    // getAmountInLP(address) view returns(uint256)
    getAmountInLP(tokenAddress) {
        return this.mulContract.getAmountInLP(tokenAddress);
    }
    // getAvailableTokenAmount(bytes32) view returns(uint256)
    getAvailableTokenAmount(tokenID) {
        return this.mulContract.getAvailableTokenAmount(tokenID);
    }
    // getEmployedAmount(bytes32) view returns(uint256)
    getEmployedAmount(tokenID) {
        return this.mulContract.getEmployedAmount(tokenID);
    }
    // getMaintainer() view returns(address)
    getMaintainer() {
        return this.mulContract.getMaintainer();
    }
    // getMaintainerShareFeeRatio() view returns(uint16)
    getMaintainerShareFeeRatio() {
        return this.mulContract.getMaintainerShareFeeRatio();
    }
    // getTokenAddress(bytes32) view returns(address)
    getTokenAddress(assetID) {
        return this.mulContract.getTokenAddress(assetID);
    }
    // getTokenAssetID(address) view returns(bytes32)
    getTokenAssetID(tokenAddress) {
        return this.mulContract.getTokenAssetID(tokenAddress);
    }
    // getTokenConfig(address) view returns(tuple)
    getTokenConfig(tokenAddress) {
        return this.mulContract.getTokenConfig(tokenAddress);
    }
    // getTokenOrder(address) view returns(uint16)
    getTokenOrder(serviceAddress) {
        return this.mulContract.getTokenOrder(serviceAddress);
    }
    // getTokenPriceID(address) view returns(bytes32)
    getTokenPriceID(token) {
        return this.mulContract.getTokenPriceID(token);
    }
    // getTokenTargetWeight(address) view returns(uint16)
    getTokenTargetWeight(tokenAddress) {
        return this.mulContract.getTokenTargetWeight(tokenAddress);
    }
    // getTotalClaimableAmount(bytes32) view returns(uint256)
    getTotalClaimableAmount(assetID) {
        return this.mulContract.getTotalClaimableAmount(assetID);
    }
    // getVaultReserve() view returns(uint16)
    getVaultReserve() {
        return this.mulContract.getVaultReserve();
    }
    // listTokens() view returns(string[], address[], bytes32[], bytes32[], uint16[], uint256[])
    listTokens() {
        return this.mulContract.listTokens();
    }
}
exports.VaultServiceMultiCall = VaultServiceMultiCall;
