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
exports.ReferralApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const contract_1 = require("../contract");
const BaseApi_1 = require("./base/BaseApi");
const ApiProvider_1 = require("./provider/ApiProvider");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const gql_1 = require("./gql");
let ReferralApi = class ReferralApi {
    async referralInfo(chainType, address) {
        const referralInfo = {
            KOL: false,
            bind: false,
            kolData: {
                code: "",
                claimAmounts: [],
                referrals: [],
                canClaim: false,
                claimHistory: []
            },
            bindData: {
                disCount: "0"
            },
            claim(connectInfo) {
                const vaultServiceContract = connectInfo.create(contract_1.VaultServiceContract);
                return vaultServiceContract.claimAllShares();
            },
            bindCode(connectInfo, code) {
                const referralServiceContract = connectInfo.create(contract_1.ReferralServiceContract);
                return referralServiceContract.bindAccountToReferral(code, connectInfo.account);
            },
        };
        if (address) {
            const [ClaimShareLogs, IncreaseReferrerShareLogs, vaultTokens,] = await Promise.all([
                BaseApi_1.BASE_API.prepGraph((0, gql_1.PrepClaimShareLogsGql)(address.toLowerCase())),
                BaseApi_1.BASE_API.prepGraph((0, gql_1.PrepIncreaseReferrerShareLogsGql)(address.toLowerCase())),
                ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType)
            ]);
            const connectInfo = BaseApi_1.BASE_API.getCurrentConnectInfo(chainType);
            const vaultServiceContract = connectInfo.create(contract_1.VaultServiceContract);
            const referralServiceContract = connectInfo.create(contract_1.ReferralServiceContract);
            const [{ shares, code, bindCode }] = await connectInfo.multiCall().callObj({
                shares: vaultServiceContract.multicall.getAccountAllShare(address),
                code: referralServiceContract.multicall.getReferralbyReferrerAddress(address),
                bindCode: referralServiceContract.multicall.getReferralIDByAccountAddress(address)
            });
            const [{ feeDiscount }] = await connectInfo.multiCall().callObj({
                feeDiscount: referralServiceContract.multicall.getReferralFeeDiscount(bindCode),
            });
            {
                referralInfo.kolData.claimAmounts = shares.map((it, index) => {
                    return {
                        token: vaultTokens[index].token.symbol,
                        amount: new bignumber_js_1.default(it).div(10 ** vaultTokens[index].token.decimals).toFixed(),
                    };
                });
                referralInfo.kolData.code = code;
                referralInfo.kolData.claimHistory = ClaimShareLogs.claimShareLogs.map(it => {
                    const result = {
                        time: it.timestamp,
                        txId: it.hash,
                        claimToken: it.token.tokenName,
                        claimAmount: it.amount
                    };
                    return result;
                });
                referralInfo.kolData.referrals = IncreaseReferrerShareLogs.increaseReferrerShareLogs.map(it => {
                    const result = {
                        token: it.token.tokenName,
                        address: it.fromUser,
                        dateJoined: it.timestamp,
                        totalVolume: it.volume,
                        feesPaid: new bignumber_js_1.default(it.amount).div(10 ** parseInt(it.token.decimals, 10)).toFixed(),
                        totalOpenFee: it.totalOpenFee,
                        totalCloseFee: it.totalCloseFee,
                        totalFee: new bignumber_js_1.default(it.totalOpenFee).plus(it.totalCloseFee).toFixed(),
                    };
                    return result;
                }).sort((a, b) => {
                    return new bignumber_js_1.default(b.feesPaid).comparedTo(a.feesPaid);
                });
                referralInfo.kolData.canClaim = referralInfo.kolData.claimAmounts.find(it => new bignumber_js_1.default(it.amount).comparedTo("0") > 0) !== undefined;
                referralInfo.KOL = code !== '';
            }
            {
                referralInfo.bind = bindCode !== tool_1.ZERO_BYTE32;
                referralInfo.bindData.disCount = new bignumber_js_1.default(feeDiscount).div(10 ** vo_1.CONST.RATIO_DECIMALS).multipliedBy(100).toFixed();
            }
        }
        return referralInfo;
    }
};
exports.ReferralApi = ReferralApi;
exports.ReferralApi = ReferralApi = __decorate([
    (0, tool_1.CacheKey)('ReferralApi')
], ReferralApi);
