import { Token } from "../tool";
import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
export interface VaultTokenConfig {
    assetID: string;
    isStable: boolean;
    featureSwitches: string;
    feeBasisPoints: string;
    taxBasisPoints: string;
    isDynamicFee: boolean;
    maxTokenEmployedRate: string;
}
export declare class VaultServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_getTokenAmount(address: string): ContractCall<string>;
    multicall_getTokenConfig(address: string): ContractCall<VaultTokenConfig>;
    multicall_listTokens(): ContractCall<{
        tokenName: string[];
        tokenAddress: string[];
        assetID: string[];
        priceID: string[];
        targetWeights: string[];
        tokenAmounts: string[];
    }>;
    static getVaultValue(token: Token, amount: string, price: string): string;
}
