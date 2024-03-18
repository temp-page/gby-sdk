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
exports.TestERC20Contract = void 0;
const tool_1 = require("../tool");
const BaseAbi_1 = require("./BaseAbi");
const abi_1 = require("../../abi");
let TestERC20Contract = class TestERC20Contract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo, address) {
        super(connectInfo, address, abi_1.TESTERC20Abi);
    }
    async mint() {
        return await this.connectInfo
            .tx()
            .sendContractTransaction(this.contract, 'mint', [], {});
    }
};
exports.TestERC20Contract = TestERC20Contract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestERC20Contract.prototype, "mint", null);
exports.TestERC20Contract = TestERC20Contract = __decorate([
    (0, tool_1.CacheKey)('TestERC20Contract'),
    __metadata("design:paramtypes", [Function, String])
], TestERC20Contract);
