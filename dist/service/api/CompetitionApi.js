"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionApi = void 0;
const tool_1 = require("../tool");
const ApiProvider_1 = require("./provider/ApiProvider");
const contract_1 = require("../contract");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const BaseApi_1 = require("./base/BaseApi");
const SdkProvider_1 = require("../../SdkProvider");
const get_1 = __importDefault(require("lodash/get"));
let CompetitionApi = class CompetitionApi {
    async list() {
        const competitionList = await ApiProvider_1.apiProvider.serverApi().competitionList();
        return {
            list: competitionList.map(it => {
                let status = 'Open';
                if (it.endTime > Date.now()) {
                    status = 'Concluded';
                }
                else if (it.startTime > Date.now()) {
                    status = 'Open';
                }
                else {
                    status = 'About to start';
                }
                return {
                    id: it.id,
                    startTime: it.startTime,
                    endTime: it.endTime,
                    status: status,
                    current: it.startTime <= Date.now() && it.endTime >= Date.now(),
                };
            }),
        };
    }
    async claimInfo(address) {
        const claimInfo = await ApiProvider_1.apiProvider.serverApi().competitionClaimInfo(address);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(SdkProvider_1.SdkProvider.currentChainType);
        const ci = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const claimed = !claimInfo.claimInfo ? false : await ci.create(contract_1.TradeRewardsContract).getClaimed(claimInfo.claimInfo.round, claimInfo.claimInfo.address);
        return {
            address: address,
            rewardSymbol: (0, get_1.default)(claimInfo, 'claimInfo.rewardSymbol', ''),
            reward: new bignumber_js_1.default((0, get_1.default)(claimInfo, 'claimInfo.reward', '0')).div(1e18).toFixed(),
            showType: claimInfo.claimInfo ? 'claim' : claimInfo.sortPnl.length === 0 && claimInfo.sortVol.length === 0 ? 'none' : "record",
            canClaim: !claimed,
            sortPnl: claimInfo.sortPnl,
            sortVol: claimInfo.sortVol,
            claim: async (connectInfo) => {
                return await connectInfo.create(contract_1.TradeRewardsContract).claim(claimInfo.claimInfo.round, claimInfo.claimInfo.reward, claimInfo.claimInfo.proof);
            }
        };
    }
    async detail(competitionId, address = "") {
        const detail = await ApiProvider_1.apiProvider.serverApi().competitionRank(competitionId, address);
        return {
            topPnl: {
                your: (0, tool_1.isNullOrBlank)(address) || !detail.pnlUser ? undefined : {
                    yourRank: detail.pnlUser.rank,
                    totalRank: detail.sortPnl.length,
                    pnl: detail.pnlUser,
                    address
                },
                list: detail.sortPnl
            },
            topVol: {
                your: (0, tool_1.isNullOrBlank)(address) || !detail.pnlUser ? undefined : {
                    yourRank: detail.volUser.rank,
                    totalRank: detail.sortVol.length,
                    pnl: detail.volUser,
                    address,
                },
                list: detail.sortVol
            },
            filter(current, size, search, type) {
                let list = type === 'topPnl' ? detail.sortPnl : detail.sortVol;
                if ((0, tool_1.isNullOrBlank)(search)) {
                    return list.slice(current * size, (current + 1) * size);
                }
                else {
                    const searchLower = search.toLowerCase();
                    const filteredList = list.filter(it => it.address.toLowerCase().includes(searchLower));
                    return filteredList.slice(current * size, (current + 1) * size);
                }
            }
        };
    }
};
exports.CompetitionApi = CompetitionApi;
exports.CompetitionApi = CompetitionApi = __decorate([
    (0, tool_1.CacheKey)('CompetitionApi')
], CompetitionApi);
