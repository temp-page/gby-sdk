"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiProvider = exports.ApiProvider = void 0;
const tool_1 = require("../../tool");
const BaseApi_1 = require("../base/BaseApi");
const DashBoardApi_1 = require("../DashBoardApi");
const BuySellGLPApi_1 = require("../BuySellGLPApi");
const TokenApi_1 = require("../TokenApi");
const ServerApi_1 = require("../ServerApi");
const TradeApi_1 = require("../TradeApi");
/**
 * 请求基类 详细信息查看
 */
class ApiProvider {
    constructor() {
        this.baseApi = BaseApi_1.BASE_API;
    }
    dashBoardApi() {
        return (0, tool_1.mixProxy)(DashBoardApi_1.DashBoardApi);
    }
    buySellGLPApi() {
        return (0, tool_1.mixProxy)(BuySellGLPApi_1.BuySellGLPApi);
    }
    tokenApi() {
        return (0, tool_1.mixProxy)(TokenApi_1.TokenApi);
    }
    serverApi() {
        return (0, tool_1.mixProxy)(ServerApi_1.ServerApi);
    }
    tradeApi() {
        return (0, tool_1.mixProxy)(TradeApi_1.TradeApi);
    }
}
exports.ApiProvider = ApiProvider;
exports.apiProvider = new ApiProvider();
