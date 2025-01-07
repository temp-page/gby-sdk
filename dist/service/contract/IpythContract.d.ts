import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class IpythContract extends BaseAbi {
    multicall: IpythMultiCall;
    constructor(connectInfo: ConnectInfo);
    updatePriceFeeds(updateData: string[], value: string): Promise<TransactionEvent>;
    getPriceNoOlderThan(id: string, age: string): Promise<{
        price: string;
        conf: string;
        expo: string;
        publishTime: string;
    }>;
    getUpdateFee(priceUpdateData: string[]): Promise<string>;
}
export declare class IpythMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getPriceNoOlderThan(id: string, age: string): ContractCall<{
        price: string;
        conf: string;
        expo: string;
        publishTime: string;
    }>;
    getUpdateFee(priceUpdateData: string[]): ContractCall<string>;
}
