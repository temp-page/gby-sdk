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
exports.PythContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let PythContract = class PythContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().Pyth, abi_1.PythAbi);
    }
    multicall_getUpdateFee(priceUpdateData) {
        return this.mulContract.getUpdateFee(priceUpdateData);
    }
    async getUpdateFee(priceUpdateData) {
        const [{ updateFee }] = await this.connectInfo.multiCall().callObj({
            updateFee: this.multicall_getUpdateFee(priceUpdateData)
        });
        return new bignumber_js_1.default(updateFee).multipliedBy(2).toFixed();
    }
};
exports.PythContract = PythContract;
exports.PythContract = PythContract = __decorate([
    (0, tool_1.CacheKey)('PythContract'),
    __metadata("design:paramtypes", [Function])
], PythContract);
