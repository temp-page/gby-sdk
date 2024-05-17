import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class TargetServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    addTarget(name: string, priceID: string, targetType: number): Promise<TransactionEvent>;
    removeTarget(targetID: string): Promise<TransactionEvent>;
    updateTargetConfig(targetID: string, status: string, maxTier: string, execFeeValue: string, openFeeRate: string, closeFeeRate: string, isDynamicCloseFee: boolean, fundingFeePerBlockP: string, minFundingFeeRate: string, maxFundingFeeRate: string, maxOpenInterestLong: string, maxOpenInterestShort: string): Promise<TransactionEvent>;
    updateFundingFeePerBlockP(targetID: string, fundingFeePerBlockP: string): Promise<TransactionEvent>;
    updateTargetMaxAndMinFundingFeeRate(targetID: string, minFundingFeeRate: string, maxFundingFeeRate: string): Promise<TransactionEvent>;
    multicall_listTarget(): ContractCall<{
        targetName: string[];
        assetID: string[];
        priceID: string[];
    }>;
    multicall_getFundingFeeRate(targetID: string): ContractCall<string>;
    multicall_getOpenInterest(targetID: string): ContractCall<{
        accFundingFeeLong: string;
        lastetFundingFeeCaculateTimeStamp: string;
        amountLong: string;
        amountShort: string;
        avgPriceLong: string;
        avgPriceShort: string;
    }>;
    multicall_getTargetConfig(targetID: string): ContractCall<{
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
}
