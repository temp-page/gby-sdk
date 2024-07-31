import { TransactionEvent } from "../TransactionEvent";
import { ConnectInfo } from "../../../ConnectInfo";
export interface ReferralInfo {
    KOL: boolean;
    kolData: ReferralKOLInfo;
    bind: boolean;
    bindData: BindData;
    claim(connectInfo: ConnectInfo): Promise<TransactionEvent>;
    bindCode(connectInfo: ConnectInfo, code: string): Promise<TransactionEvent>;
}
export interface ReferralKOLInfo {
    code: string;
    referrals: ReferralListData[];
    claimAmounts: ReferralClaimAmounts[];
    claimHistory: ReferralClaimHistory[];
    canClaim: boolean;
}
export interface BindData {
    disCount: string;
}
export interface ReferralClaimAmounts {
    token: string;
    amount: string;
}
export interface ReferralListData {
    token: string;
    address: string;
    dateJoined: string;
    totalVolume: string;
    feesPaid: string;
    totalOpenFee: string;
    totalCloseFee: string;
}
export interface ReferralClaimHistory {
    time: string;
    txId: string;
    claimToken: string;
    claimAmount: string;
}
