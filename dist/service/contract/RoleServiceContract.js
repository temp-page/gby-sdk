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
exports.RoleServiceMultiCall = exports.RoleServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/RoleService.json time 2024-08-09T14:30:06.777Z
let RoleServiceContract = class RoleServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.RoleServiceAbi);
        this.multicall = new RoleServiceMultiCall(this.mulContract);
    }
    // grantRole(bytes32, address) nonpayable returns()
    grantRole(role, account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'grantRole', [role, account], {
            value: undefined
        });
    }
    // renounceRole(bytes32) nonpayable returns()
    renounceRole(role) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'renounceRole', [role], {
            value: undefined
        });
    }
    // revokeRole(bytes32, address) nonpayable returns()
    revokeRole(role, account) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'revokeRole', [role, account], {
            value: undefined
        });
    }
    // setAdminRole(bytes32, bytes32) nonpayable returns()
    setAdminRole(role, adminRole) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'setAdminRole', [role, adminRole], {
            value: undefined
        });
    }
    // GET getAdminRole(bytes32) view returns(bytes32)
    getAdminRole(role) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getAdminRole(role));
    }
    // GET getRoleMember(bytes32, uint256) view returns(address)
    getRoleMember(role, index) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getRoleMember(role, index));
    }
    // GET getRoleMemberCount(bytes32) view returns(uint256)
    getRoleMemberCount(role) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getRoleMemberCount(role));
    }
    // GET listRoleMembers(bytes32) view returns(address[])
    listRoleMembers(role) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listRoleMembers(role));
    }
};
exports.RoleServiceContract = RoleServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleServiceContract.prototype, "grantRole", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleServiceContract.prototype, "renounceRole", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleServiceContract.prototype, "revokeRole", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleServiceContract.prototype, "setAdminRole", null);
exports.RoleServiceContract = RoleServiceContract = __decorate([
    (0, tool_1.CacheKey)('RoleServiceContract'),
    __metadata("design:paramtypes", [Function])
], RoleServiceContract);
class RoleServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getAdminRole(bytes32) view returns(bytes32)
    getAdminRole(role) {
        return this.mulContract.getAdminRole(role);
    }
    // getRoleMember(bytes32, uint256) view returns(address)
    getRoleMember(role, index) {
        return this.mulContract.getRoleMember(role, index);
    }
    // getRoleMemberCount(bytes32) view returns(uint256)
    getRoleMemberCount(role) {
        return this.mulContract.getRoleMemberCount(role);
    }
    // listRoleMembers(bytes32) view returns(address[])
    listRoleMembers(role) {
        return this.mulContract.listRoleMembers(role);
    }
}
exports.RoleServiceMultiCall = RoleServiceMultiCall;
