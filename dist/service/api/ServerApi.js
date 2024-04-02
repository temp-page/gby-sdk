"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerApi = void 0;
const tool_1 = require("../tool");
const BaseApi_1 = require("./base/BaseApi");
let ServerApi = class ServerApi {
    async klines(token, period, start, end, limit) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/s_api/api/v1/klines`, 'get', {
            token,
            period,
            start,
            end,
            limit
        });
    }
    async ticks() {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/s_api/api/v1/ticks`, 'get', {});
    }
    async tradeEvents(tradeHash, chainName, type) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/s_api/api/v1/trade/events`, 'get', {
            tradeHash,
            type,
            chainName
        });
    }
    async openPositions(chainName) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/s_api/api/v1/trade/openPosition`, 'get', {
            chainName
        });
    }
};
exports.ServerApi = ServerApi;
exports.ServerApi = ServerApi = __decorate([
    (0, tool_1.CacheKey)('ServerApi')
], ServerApi);
