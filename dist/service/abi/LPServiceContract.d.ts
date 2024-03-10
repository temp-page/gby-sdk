import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
export declare class LPServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    static getGlpPrice(vaultValue: string, glpAmount: string): string;
    multicall_getAccountLatestMintTime(account: string): ContractCall<string>;
    multicall_getCoolingDuration(): ContractCall<string>;
}
