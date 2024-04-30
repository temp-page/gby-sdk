import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
import { VaultTokenConfig } from "./VaultServiceContract";
import { TransactionEvent } from "../vo";
export declare class LPServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    mintALP(assetID: string, amountToken: string, acceptableMinGlpAmount: string, priceUpdateData: string[]): Promise<TransactionEvent>;
    burnALP(assetID: string, amountGLP: string, acceptableMinTokenAmount: string, priceUpdateData: string[]): Promise<TransactionEvent>;
    static getGlpPrice(vaultValue: string, glpAmount: string): string;
    static getGlpFeePoint(value: string, vaultValue: string, tokenValueInVault: string, isMint: boolean, token: VaultTokenConfig, tokenTargetWeights: string): number;
    multicall_getAccountLatestMintTime(account: string): ContractCall<string>;
    multicall_getCoolingDuration(): ContractCall<string>;
}
