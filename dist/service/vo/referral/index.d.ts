import { TransactionEvent } from "../TransactionEvent";
export interface ReferralInfo {
    KOL: boolean;
    kolData: ReferralKOLInfo;
    bind: boolean;
    claimHistories(): Promise<ReferralClaimHistory[]>;
    claim(): Promise<TransactionEvent>;
    bindCode(code: string): Promise<TransactionEvent>;
}
export interface ReferralKOLInfo {
    code: string;
    referrals: ReferralListData[];
    claimAmounts: ReferralClaimAmounts[];
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
}
export interface ReferralClaimHistory {
    time: string;
    txId: string;
    txLink: string;
    claimToken: string;
    claimAmount: string;
}
