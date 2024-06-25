import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class ReferralServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    setDefaultFeeDiscount(_defaultDiscount: string): Promise<TransactionEvent>;
    addReferral(_referral: string, _referralAddress: string): Promise<TransactionEvent>;
    removeReferral(_referral: string): Promise<TransactionEvent>;
    updateReferralFeeDiscount(_referral: string, _newDiscount: string): Promise<TransactionEvent>;
    updateReferralFeeShare(_referral: string, _newShare: string): Promise<TransactionEvent>;
    multicall_getDefaultFeeShare(): ContractCall<string>;
    multicall_getDefaultFeeDiscount(): ContractCall<string>;
    multicall_getReferralList(): ContractCall<string[]>;
}
