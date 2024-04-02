import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
import { VaultTokenConfig } from "./VaultServiceContract";
export declare class LPServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    static getGlpPrice(vaultValue: string, glpAmount: string): string;
    static getGlpFeePoint(value: string, vaultValue: string, tokenValueInVault: string, isMint: boolean, token: VaultTokenConfig, tokenTargetWeights: string): number;
    multicall_getAccountLatestMintTime(account: string): ContractCall<string>;
    multicall_getCoolingDuration(): ContractCall<string>;
}
