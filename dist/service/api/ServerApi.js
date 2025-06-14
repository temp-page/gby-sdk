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
const config_1 = require("../../config");
let ServerApi = class ServerApi {
    async klines(token, period, start, end, limit) {
        const result = await BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/klines`, 'get', {
            token,
            period,
            start,
            end,
            limit
        });
        const precision = (0, config_1.getPrecision)(token);
        const price = precision.price;
        const statistics = precision.statistics;
        return result.map(it => {
            it.close = parseFloat(it.close).toFixed(price);
            it.high = parseFloat(it.high).toFixed(price);
            it.low = parseFloat(it.low).toFixed(price);
            it.open = parseFloat(it.open).toFixed(price);
            it.volume = parseFloat(it.volume).toFixed(statistics);
            return it;
        });
    }
    async ticks(all) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/ticks`, 'get', {
            all
        });
    }
    async tradeEvents(tradeHash, chainName, type) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/trade/events`, 'get', {
            tradeHash,
            type,
            chainName
        });
    }
    async openPositions(chainName) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/trade/openPosition`, 'get', {
            chainName
        });
    }
    async competitionRank(id, address) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/competition/rank`, 'get', {
            id,
            address
        });
    }
    async competitionList() {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/competition/list`, 'get', {});
    }
    async competitionClaimInfo(address) {
        return BaseApi_1.BASE_API.request(BaseApi_1.BASE_API.address().baseApiUrl + `/prep_api/api/v1/competition/claim`, 'get', {
            address
        });
    }
};
exports.ServerApi = ServerApi;
exports.ServerApi = ServerApi = __decorate([
    (0, tool_1.CacheKey)('ServerApi')
], ServerApi);
