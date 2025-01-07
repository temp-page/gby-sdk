import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class VaultServiceContract extends BaseAbi {
    multicall: VaultServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    addToken(nameString: string, tokenAddress: string, tokenPriceID: string, isStable: boolean, enable: boolean, feeBasisPoints: string, taxBasisPoints: string, isDynamicFee: boolean, targetWeights: string[]): Promise<TransactionEvent>;
    claimAllShares(): Promise<TransactionEvent>;
    claimTokenShare(tokenAddress: string): Promise<TransactionEvent>;
    decreaseAmountInLP(tokenID: string, amountToDec: string): Promise<TransactionEvent>;
    decreaseClaimableAmount(tokenAddress: string, account: string, amountToDec: string): Promise<TransactionEvent>;
    decreaseTokenEmployed(tokenID: string, amountToEmployed: string): Promise<TransactionEvent>;
    increaseAmountInLP(tokenID: string, amountToInc: string): Promise<TransactionEvent>;
    increaseClaimableAmount(tokenAddress: string, account: string, amountToInc: string): Promise<TransactionEvent>;
    increaseTokenEmployed(tokenID: string, amountToEmployed: string): Promise<TransactionEvent>;
    removeToken(tokenAddress: string, targetWeights: string[]): Promise<TransactionEvent>;
    setMaintainer(maintainer: string): Promise<TransactionEvent>;
    setMaintainerFeeShareRatio(ratio: string): Promise<TransactionEvent>;
    updateTokenFee(tokenAddress: string, feeBasisPoints: string, taxBasisPoints: string, isDynamicFee: boolean): Promise<TransactionEvent>;
    updateTokenTargetWeights(targetWeights: string[]): Promise<TransactionEvent>;
    updateVaultReserve(vaultReserve: string): Promise<TransactionEvent>;
    getAccountAllShare(account: string): Promise<string[]>;
    getAccountTokenShare(account: string, tokenAddress: string): Promise<string>;
    getAllTokenAmount(): Promise<string[]>;
    getAllTokenConfig(): Promise<{
        maxTokenEmployedRate: string;
        feeBasisPoints: string;
        taxBasisPoints: string;
        enable: boolean;
        isStable: boolean;
        isDynamicFee: boolean;
    }[]>;
    getAllTokenPriceID(): Promise<string[]>;
    getAllTokenTargetWeight(): Promise<string[]>;
    getAmountInLP(tokenAddress: string): Promise<string>;
    getAvailableTokenAmount(tokenID: string): Promise<string>;
    getEmployedAmount(tokenID: string): Promise<string>;
    getMaintainer(): Promise<string>;
    getMaintainerShareFeeRatio(): Promise<string>;
    getTokenAddress(assetID: string): Promise<string>;
    getTokenAssetID(tokenAddress: string): Promise<string>;
    getTokenConfig(tokenAddress: string): Promise<{
        maxTokenEmployedRate: string;
        feeBasisPoints: string;
        taxBasisPoints: string;
        enable: boolean;
        isStable: boolean;
        isDynamicFee: boolean;
    }>;
    getTokenOrder(serviceAddress: string): Promise<string>;
    getTokenPriceID(token: string): Promise<string>;
    getTokenTargetWeight(tokenAddress: string): Promise<string>;
    getTotalClaimableAmount(assetID: string): Promise<string>;
    getVaultReserve(): Promise<string>;
    listTokens(): Promise<{
        tokenName: string[];
        tokenAddress: string[];
        assetID: string[];
        priceID: string[];
        targetWeights: string[];
        tokenAmounts: string[];
    }>;
}
export declare class VaultServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getAccountAllShare(account: string): ContractCall<string[]>;
    getAccountTokenShare(account: string, tokenAddress: string): ContractCall<string>;
    getAllTokenAmount(): ContractCall<string[]>;
    getAllTokenConfig(): ContractCall<{
        maxTokenEmployedRate: string;
        feeBasisPoints: string;
        taxBasisPoints: string;
        enable: boolean;
        isStable: boolean;
        isDynamicFee: boolean;
    }[]>;
    getAllTokenPriceID(): ContractCall<string[]>;
    getAllTokenTargetWeight(): ContractCall<string[]>;
    getAmountInLP(tokenAddress: string): ContractCall<string>;
    getAvailableTokenAmount(tokenID: string): ContractCall<string>;
    getEmployedAmount(tokenID: string): ContractCall<string>;
    getMaintainer(): ContractCall<string>;
    getMaintainerShareFeeRatio(): ContractCall<string>;
    getTokenAddress(assetID: string): ContractCall<string>;
    getTokenAssetID(tokenAddress: string): ContractCall<string>;
    getTokenConfig(tokenAddress: string): ContractCall<{
        maxTokenEmployedRate: string;
        feeBasisPoints: string;
        taxBasisPoints: string;
        enable: boolean;
        isStable: boolean;
        isDynamicFee: boolean;
    }>;
    getTokenOrder(serviceAddress: string): ContractCall<string>;
    getTokenPriceID(token: string): ContractCall<string>;
    getTokenTargetWeight(tokenAddress: string): ContractCall<string>;
    getTotalClaimableAmount(assetID: string): ContractCall<string>;
    getVaultReserve(): ContractCall<string>;
    listTokens(): ContractCall<{
        tokenName: string[];
        tokenAddress: string[];
        assetID: string[];
        priceID: string[];
        targetWeights: string[];
        tokenAmounts: string[];
    }>;
}
