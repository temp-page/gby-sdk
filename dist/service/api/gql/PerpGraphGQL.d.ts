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
        hash: string;
        volume: string;
        fromUser: string;
        amount: string;
        token: {
            tokenName: string;
            tokenAddress: string;
        };
    }[];
}
export declare function PrepIncreaseReferrerShareLogsGql(account: string): GQLParams<PrepIncreaseReferrerShareLogsType>;
