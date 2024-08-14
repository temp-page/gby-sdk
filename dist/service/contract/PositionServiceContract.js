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
exports.PositionServiceMultiCall = exports.PositionServiceContract = void 0;
const index_1 = require("./index");
const tool_1 = require("../tool");
const BaseAbi_1 = require("../api/base/BaseAbi");
// codegen for src/abi/service/PositionService.json time 2024-08-09T14:30:06.774Z
let PositionServiceContract = class PositionServiceContract extends BaseAbi_1.BaseAbi {
    constructor(connectInfo) {
        super(connectInfo, connectInfo.chainInfo().GBU, index_1.PositionServiceAbi);
        this.multicall = new PositionServiceMultiCall(this.mulContract);
    }
    // addPositionMargin(bytes32, uint256, bytes[]) nonpayable returns()
    addPositionMargin(positionHash, tokenAmount, priceUpdateData) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'addPositionMargin', [positionHash, tokenAmount, priceUpdateData], {
            value: undefined
        });
    }
    // handleClosePostion(bytes32, uint256, uint256, uint8, address) nonpayable returns()
    handleClosePostion(positionHash, targetPrice, tokenPrice, exitReason, keeperAddress) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'handleClosePostion', [positionHash, targetPrice, tokenPrice, exitReason, keeperAddress], {
            value: undefined
        });
    }
    // handleOpenPosition(tuple, uint256, uint256) nonpayable returns()
    handleOpenPosition(openTrade, targetPrice, tokenPrice) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'handleOpenPosition', [openTrade, targetPrice, tokenPrice], {
            value: undefined
        });
    }
    // removeHistoryPosition(bytes32) nonpayable returns()
    removeHistoryPosition(positionHash) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'removeHistoryPosition', [positionHash], {
            value: undefined
        });
    }
    // updataPosition(bytes32, uint32, uint32) nonpayable returns()
    updataPosition(positionHash, takeProfitRate, stopLoseRate) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updataPosition', [positionHash, takeProfitRate, stopLoseRate], {
            value: undefined
        });
    }
    // updatePostionStopLoss(bytes32, uint32) nonpayable returns()
    updatePostionStopLoss(positionHash, stopLoseRate) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updatePostionStopLoss', [positionHash, stopLoseRate], {
            value: undefined
        });
    }
    // updatePostionTakeProfit(bytes32, uint32) nonpayable returns()
    updatePostionTakeProfit(positionHash, takeProfit) {
        return this.connectInfo.tx().sendContractTransaction(this.contract, 'updatePostionTakeProfit', [positionHash, takeProfit], {
            value: undefined
        });
    }
    // GET getHistoryPositionCount(address) view returns(uint256)
    getHistoryPositionCount(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getHistoryPositionCount(account));
    }
    // GET getLivePositionCount(address) view returns(uint256)
    getLivePositionCount(account) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getLivePositionCount(account));
    }
    // GET getPostionPriceIDs(bytes32) view returns(bytes32, bytes32)
    getPostionPriceIDs(postionHash) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.getPostionPriceIDs(postionHash));
    }
    // GET listHistoryPosition(address, uint256, uint256) view returns(tuple[])
    listHistoryPosition(account, pageIndex, pageSize) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listHistoryPosition(account, pageIndex, pageSize));
    }
    // GET listLivePosition(address, uint256, uint256) view returns(tuple[])
    listLivePosition(account, pageIndex, pageSize) {
        return this.connectInfo.multiCall().singleCallObj(this.multicall.listLivePosition(account, pageIndex, pageSize));
    }
};
exports.PositionServiceContract = PositionServiceContract;
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "addPositionMargin", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "handleClosePostion", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "handleOpenPosition", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "removeHistoryPosition", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "updataPosition", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "updatePostionStopLoss", null);
__decorate([
    (0, tool_1.EnableLogs)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PositionServiceContract.prototype, "updatePostionTakeProfit", null);
exports.PositionServiceContract = PositionServiceContract = __decorate([
    (0, tool_1.CacheKey)('PositionServiceContract'),
    __metadata("design:paramtypes", [Function])
], PositionServiceContract);
class PositionServiceMultiCall {
    constructor(mulContract) {
        this.mulContract = mulContract;
    }
    // getHistoryPositionCount(address) view returns(uint256)
    getHistoryPositionCount(account) {
        return this.mulContract.getHistoryPositionCount(account);
    }
    // getLivePositionCount(address) view returns(uint256)
    getLivePositionCount(account) {
        return this.mulContract.getLivePositionCount(account);
    }
    // getPostionPriceIDs(bytes32) view returns(bytes32, bytes32)
    getPostionPriceIDs(postionHash) {
        return this.mulContract.getPostionPriceIDs(postionHash);
    }
    // listHistoryPosition(address, uint256, uint256) view returns(tuple[])
    listHistoryPosition(account, pageIndex, pageSize) {
        return this.mulContract.listHistoryPosition(account, pageIndex, pageSize);
    }
    // listLivePosition(address, uint256, uint256) view returns(tuple[])
    listLivePosition(account, pageIndex, pageSize) {
        return this.mulContract.listLivePosition(account, pageIndex, pageSize);
    }
}
exports.PositionServiceMultiCall = PositionServiceMultiCall;
