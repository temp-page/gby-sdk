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
exports.PortalContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
const evm_connector_1 = require("@redstone-finance/evm-connector");
const ethers5_1 = require("ethers5");
const providers_1 = require("@ethersproject/providers");
const mulcall_1 = require("../../mulcall");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let PortalContract = class PortalContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        const chainInfo = connectInfo.chainInfo();
        const address = connectInfo.chainInfo().GBU;
        const abi = abi_1.PortalAbi;
        super(connectInfo, address, abi);
        const jsonRpcProvider = new providers_1.StaticJsonRpcProvider(chainInfo.rpc);
        const contract = new ethers5_1.Contract(address, abi, jsonRpcProvider);
        this.contractV5 = evm_connector_1.WrapperBuilder.wrap(contract).usingDataService({
            dataFeeds: chainInfo.dataFeeds,
        });
        this.mulContract = new mulcall_1.MulContract(address, abi, {
            redstoneWrapper: true,
            contract: this.contractV5
        });
    }
    async mintGLP(assetID, amountToken, acceptableMinGlpAmount) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contractV5, 'mintGLP', [assetID, amountToken, acceptableMinGlpAmount], {});
    }
    async burnGLP(assetID, amountGLP, acceptableMinTokenAmount) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contractV5, 'burnGLP', [assetID, amountGLP, acceptableMinTokenAmount], {});
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
exports.PortalContract = PortalContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PortalContract.prototype, "mintGLP", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PortalContract.prototype, "burnGLP", null);
exports.PortalContract = PortalContract = __decorate([
    (0, tool_1.CacheKey)('PortalContract'),
    __metadata("design:paramtypes", [Function])
], PortalContract);
