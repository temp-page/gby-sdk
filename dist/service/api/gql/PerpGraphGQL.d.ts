import { GQLParams } from "./index";
export interface PrepClaimShareLogsType {
    claimShareLogs: {
        timestamp: string;
        hash: string;
        tokenAddress: string;
        amount: string;
        token: {
            tokenName: string;
            tokenAddress: string;
        };
    }[];
}
export declare function PrepClaimShareLogsGql(account: string): GQLParams<PrepClaimShareLogsType>;
export interface PrepIncreaseReferrerShareLogsType {
    increaseReferrerShareLogs: {
        timestamp: string;
        volume: string;
        fromUser: string;
        amount: string;
        totalCloseFee: string;
        totalOpenFee: string;
        token: {
            tokenName: string;
            tokenAddress: string;
            decimals: string;
        };
    }[];
}
export declare function PrepIncreaseReferrerShareLogsGql(account: string): GQLParams<PrepIncreaseReferrerShareLogsType>;
