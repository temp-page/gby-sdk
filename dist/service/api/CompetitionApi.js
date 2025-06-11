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
                    status: status
                };
            }),
        };
    }
    async claimInfo(address = '') {
        const defaultDetail = {
            id: "0",
            time: 0,
            rank: -1,
            reward: "0",
            canClaim: false,
            claim: async (connectInfo) => {
                throw 'not implemented yet';
            }
        };
        const competitionList = await ApiProvider_1.apiProvider.serverApi().competitionList();
        if (competitionList.length === 0) {
            return defaultDetail;
        }
        const competition = competitionList.find(it => {
            return it.rewardEndTime >= Date.now() && it.rewardStartTime <= Date.now();
        });
        if (!competition || !competition.ext || !competition.ext.rewards || competition.ext.rewards.length === 0) {
            return defaultDetail;
        }
        const userReward = competition.ext.rewards.find(it => it.address.toLowerCase() === address.toLowerCase());
        if (!userReward) {
            return defaultDetail;
        }
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(SdkProvider_1.SdkProvider.currentChainType);
        const ci = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const claimed = await ci.create(contract_1.TradeRewardsContract)
            .isClaimed(competition.ext.round, userReward.address);
        return {
            id: competition.id,
            time: competition.rewardStartTime,
            rank: userReward.rank,
            reward: new bignumber_js_1.default(userReward.amount).div(1e18).toFixed(),
            canClaim: !claimed,
            claim: async (connectInfo) => {
                return await connectInfo.create(contract_1.TradeRewardsContract).claim(competition.ext.round, userReward.amount, userReward.proof);
            }
        };
    }
    async detail(competitionId, address = "") {
        const detail = await ApiProvider_1.apiProvider.serverApi().competitionRank(competitionId, address);
        return {
            topPnl: {
                your: {
                    yourRank: detail.pnlUser.rank,
                    totalRank: detail.sortPnl.length,
                    pnl: detail.pnlUser
                },
                list: detail.sortPnl
            },
            topVol: {
                your: {
                    yourRank: detail.volUser.rank,
                    totalRank: detail.sortVol.length,
                    vol: detail.volUser
                },
                list: detail.sortVol
            }
        };
    }
};
exports.CompetitionApi = CompetitionApi;
exports.CompetitionApi = CompetitionApi = __decorate([
    (0, tool_1.CacheKey)('CompetitionApi')
], CompetitionApi);
