import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
export declare class VaultServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_getTokenAmount(address: string): ContractCall<string>;
    multicall_getTokenConfig(address: string): ContractCall<{
        assetID: string;
        isStable: boolean;
        featureSwitches: string;
        feeBasisPoints: string;
        taxBasisPoints: string;
        isDynamicFee: string;
        maxTokenEmployedRate: string;
    }>;
    multicall_listTokens(): ContractCall<[string[], string[], string[]]>;
    multicall_getTokenAssetID(tokenAddress: string): ContractCall<string>;
}
