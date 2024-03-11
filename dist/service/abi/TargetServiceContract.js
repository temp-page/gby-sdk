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
exports.TargetServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
let TargetServiceContract = class TargetServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.TargetServiceAbi);
    }
    async addTarget(name, targetID, targetType) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'addTarget', [name, targetID, targetType], {});
    }
    async removeTarget(targetID) {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'removeTarget', [targetID], {});
    }
    listTargets() {
        return this.mulContract.listTargets();
    }
};
exports.TargetServiceContract = TargetServiceContract;
exports.TargetServiceContract = TargetServiceContract = __decorate([
    (0, tool_1.CacheKey)('TargetServiceContract'),
    __metadata("design:paramtypes", [Function])
], TargetServiceContract);
