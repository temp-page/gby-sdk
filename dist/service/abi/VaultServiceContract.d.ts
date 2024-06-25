import { Token } from "../tool";
import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
import { TransactionEvent } from "../vo";
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
    multicall_getAmountInLP(address: string): ContractCall<string>;
    multicall_getTokenConfig(address: string): ContractCall<VaultTokenConfig>;
    multicall_listTokens(): ContractCall<{
        tokenName: string[];
        tokenAddress: string[];
        assetID: string[];
        priceID: string[];
        targetWeights: string[];
        tokenAmounts: string[];
    }>;
    claimShare(tokenAddress: string): Promise<TransactionEvent>;
    setMaintainer(maintainer: string): Promise<TransactionEvent>;
    setMaintainerFeeShareRatio(ratio: string): Promise<TransactionEvent>;
    multicall_getMaintainer(): ContractCall<string>;
    multicall_getMaintainerShareFeeRatio(): ContractCall<string>;
    multicall_getAccountClaimableAmount(account: string, tokenAddress: string): ContractCall<string>;
    static getVaultValue(token: Token, amount: string, price: string): string;
}
