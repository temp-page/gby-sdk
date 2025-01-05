import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class TargetServiceContract extends BaseAbi {
    multicall: TargetServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    addSupportedToken(targetID: string, assetToken: string): Promise<TransactionEvent>;
    addTarget(name: string, priceID: string, targetType: string): Promise<TransactionEvent>;
    removeSupportedToken(targetID: string, assetToken: string): Promise<TransactionEvent>;
    removeTarget(targetID: string): Promise<TransactionEvent>;
    updateAccFundingFee(targetID: string): Promise<TransactionEvent>;
    updateCloseFeeRate(targetID: string, closeFeeRate: string): Promise<TransactionEvent>;
    updateFundingFeePerBlockP(targetID: string, fundingFeePerBlockP: string): Promise<TransactionEvent>;
    updateOpenFeeRate(targetID: string, openFeeRate: string): Promise<TransactionEvent>;
    updateTargetConfig(targetID: string, status: string, maxTier: string, execFeeValue: string, openFeeRate: string, closeFeeRate: string, isDynamicCloseFee: boolean, fundingFeePerBlockP: string, minFundingFeeRate: string, maxFundingFeeRate: string, maxOpenInterestLong: string, maxOpenInterestShort: string): Promise<TransactionEvent>;
    updateTargetMaxAndMinFundingFeeRate(targetID: string, minFundingFeeRate: string, maxFundingFeeRate: string): Promise<TransactionEvent>;
    getFundingFee(targetID: string): Promise<string>;
    getFundingFeeRate(targetID: string): Promise<string>;
    getOpenInterest(targetID: string): Promise<{
        accFundingFeeLong: string;
        lastetFundingFeeCaculateTimeStamp: string;
        amountLong: string;
        amountShort: string;
        avgPriceLong: string;
        avgPriceShort: string;
    }>;
    getTargetConfig(targetID: string): Promise<{
        status: string;
        targetType: string;
        maxTier: string;
        priceID: string;
        targetAddress: string;
        execFeeValue: string;
        openFeeRate: string;
        closeFeeRate: string;
        isDynamicCloseFee: boolean;
        fundingFeePerBlockP: string;
        minFundingFeeRate: string;
        maxFundingFeeRate: string;
        maxOpenInterestLong: string;
        maxOpenInterestShort: string;
    }>;
    getTargetPriceID(targetID: string): Promise<string>;
    listSupportedToken(targetID: string): Promise<string[]>;
    listTarget(): Promise<{
        targetName: string[];
        assetID: string[];
        priceID: string[];
    }>;
}
export declare class TargetServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getFundingFee(targetID: string): ContractCall<string>;
    getFundingFeeRate(targetID: string): ContractCall<string>;
    getOpenInterest(targetID: string): ContractCall<{
        accFundingFeeLong: string;
        lastetFundingFeeCaculateTimeStamp: string;
        amountLong: string;
        amountShort: string;
        avgPriceLong: string;
        avgPriceShort: string;
    }>;
    getTargetConfig(targetID: string): ContractCall<{
        status: string;
        targetType: string;
        maxTier: string;
        priceID: string;
        targetAddress: string;
        execFeeValue: string;
        openFeeRate: string;
        closeFeeRate: string;
        isDynamicCloseFee: boolean;
        fundingFeePerBlockP: string;
        minFundingFeeRate: string;
        maxFundingFeeRate: string;
        maxOpenInterestLong: string;
        maxOpenInterestShort: string;
    }>;
    getTargetPriceID(targetID: string): ContractCall<string>;
    listSupportedToken(targetID: string): ContractCall<string[]>;
    listTarget(): ContractCall<{
        targetName: string[];
        assetID: string[];
        priceID: string[];
    }>;
}
