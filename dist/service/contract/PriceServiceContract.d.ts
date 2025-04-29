import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class PriceServiceContract extends BaseAbi {
    multicall: PriceServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    getMultiTokenPrice(assetID: string[], priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getPairPrice(targetID: string, tokenID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getTargetPrice(assetID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getTokenPrice(assetID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    setConfidenceIntervalRatio(confidenceIntervalRatio: string): Promise<TransactionEvent>;
    setMaxPriceDelaySec(maxPriceDelaySec: string): Promise<TransactionEvent>;
    setPythAddress(pythAddress: string): Promise<TransactionEvent>;
    updatePrice(priceID: string[], priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getConfidenceIntervalRatio(): Promise<string>;
    getMaxPriceDelaySec(): Promise<string>;
    getPriceUpdateFee(priceUpdateData: string[]): Promise<string>;
    getPythAddress(): Promise<string>;
}
export declare class PriceServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getConfidenceIntervalRatio(): ContractCall<string>;
    getMaxPriceDelaySec(): ContractCall<string>;
    getPriceUpdateFee(priceUpdateData: string[]): ContractCall<string>;
    getPythAddress(): ContractCall<string>;
}
