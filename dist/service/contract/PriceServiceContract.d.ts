import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class PriceServiceContract extends BaseAbi {
    multicall: PriceServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    getPrice(assetID: string, priceID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getTargetPrice(assetID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    getTokenPrice(assetID: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    setMaxPriceDelaySec(maxPriceDelaySec: string): Promise<TransactionEvent>;
    getMaxPriceDelaySec(): Promise<string>;
    getPriceUpdateFee(priceUpdateData: string[]): Promise<string>;
    getPythAddress(): Promise<string>;
}
export declare class PriceServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getMaxPriceDelaySec(): ContractCall<string>;
    getPriceUpdateFee(priceUpdateData: string[]): ContractCall<string>;
    getPythAddress(): ContractCall<string>;
}
