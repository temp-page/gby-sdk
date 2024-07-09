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
exports.RoleServiceContract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
let RoleServiceContract = class RoleServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, abi_1.RoleServiceAbi);
    }
    multicall_getRoleMember(role, index) {
        return this.mulContract.getRoleMember(role, index);
    }
    multicall_getAdminRole(role) {
        return this.mulContract.getAdminRole(role);
    }
    multicall_getRoleMemberCount(role) {
        return this.mulContract.getRoleMemberCount(role);
    }
    async setAdminRole(role, adminRole) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setAdminRole', [role, adminRole]);
    }
    async grantRole(role, account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'grantRole', [role, account]);
    }
    async revokeRole(role, account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'revokeRole', [role, account]);
    }
    async renounceRole(role) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'renounceRole', [role]);
    }
};
exports.RoleServiceContract = RoleServiceContract;
exports.RoleServiceContract = RoleServiceContract = __decorate([
    (0, tool_1.CacheKey)('RoleServiceContract'),
    __metadata("design:paramtypes", [Function])
], RoleServiceContract);
