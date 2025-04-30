import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class ReferralServiceContract extends BaseAbi {
    multicall: ReferralServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    addReferral(referralLiteral: string, _referralAddress: string): Promise<TransactionEvent>;
    bindAccountToReferral(referralLiteral: string, _account: string): Promise<TransactionEvent>;
    bindAccountToReferralID(_referralID: string, _account: string): Promise<TransactionEvent>;
    removeReferralByID(referralID: string): Promise<TransactionEvent>;
    setDefaultFeeDiscount(_defaultDiscount: string): Promise<TransactionEvent>;
    setDefaultFeeShare(_defaultShare: string): Promise<TransactionEvent>;
    unbindAccountFromReferral(_account: string): Promise<TransactionEvent>;
    updateReferralFeeDiscount(_referral: string, _newDiscount: string): Promise<TransactionEvent>;
    updateReferralFeeShare(_referral: string, _newShare: string): Promise<TransactionEvent>;
    getConfigForReferral(_referral: string): Promise<[string, string, string]>;
    getDefaultFeeDiscount(): Promise<string>;
    getDefaultFeeShare(): Promise<string>;
    getReferralByReferralID(_referralID: string): Promise<string>;
    getReferralFeeDiscount(_referral: string): Promise<string>;
    getReferralFeeShare(_referral: string): Promise<string>;
    getReferralIDByAccountAddress(_account: string): Promise<string>;
    getReferralIDByLiteral(referralLiteral: string): Promise<string>;
    getReferralbyReferrerAddress(_referrerAddress: string): Promise<string>;
    getReferrerAddressByReferralID(_referralID: string): Promise<string>;
    listReferrals(): Promise<[string[], string[], string[], string[]]>;
}
export declare class ReferralServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getConfigForReferral(_referral: string): ContractCall<[string, string, string]>;
    getDefaultFeeDiscount(): ContractCall<string>;
    getDefaultFeeShare(): ContractCall<string>;
    getReferralByReferralID(_referralID: string): ContractCall<string>;
    getReferralFeeDiscount(_referral: string): ContractCall<string>;
    getReferralFeeShare(_referral: string): ContractCall<string>;
    getReferralIDByAccountAddress(_account: string): ContractCall<string>;
    getReferralIDByLiteral(referralLiteral: string): ContractCall<string>;
    getReferralbyReferrerAddress(_referrerAddress: string): ContractCall<string>;
    getReferrerAddressByReferralID(_referralID: string): ContractCall<string>;
    listReferrals(): ContractCall<[string[], string[], string[], string[]]>;
}
