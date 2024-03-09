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
exports.LPServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let LPServiceContract = class LPServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.LpServiceAbi);
    }
    static getGlpPrice(vaultValue, glpAmount) {
        if (new bignumber_js_1.default(vaultValue).eq(0) || new bignumber_js_1.default(glpAmount).eq(0)) {
            return new bignumber_js_1.default(100000000).toFixed(0);
        }
        else {
            return new bignumber_js_1.default(vaultValue).multipliedBy(1e8).dividedBy(new bignumber_js_1.default(glpAmount)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
};
exports.LPServiceContract = LPServiceContract;
exports.LPServiceContract = LPServiceContract = __decorate([
    (0, tool_1.CacheKey)('LPServiceContract'),
    __metadata("design:paramtypes", [Function])
], LPServiceContract);
