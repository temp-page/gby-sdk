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
exports.PositionServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
let PositionServiceContract = class PositionServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.PositionServiceAbi);
    }
    multicall_listLivePosition(account, pageIndex, pageSize) {
        return this.mulContract['listLivePosition(address,uint256,uint256)'](account, pageIndex, pageSize);
    }
    multicall_getLivePositionCount(account) {
        return this.mulContract['getLivePositionCount(address)'](account);
    }
    multicall_getHistoryPositionCount(account) {
        return this.mulContract['getHistoryPositionCount(address)'](account);
    }
    multicall_listHistoryPosition(account, pageIndex, pageSize) {
        return this.mulContract['listHistoryPosition(address,uint256,uint256)'](account, pageIndex, pageSize);
    }
};
exports.PositionServiceContract = PositionServiceContract;
exports.PositionServiceContract = PositionServiceContract = __decorate([
    (0, tool_1.CacheKey)('PositionServiceContract'),
    __metadata("design:paramtypes", [Function])
], PositionServiceContract);
