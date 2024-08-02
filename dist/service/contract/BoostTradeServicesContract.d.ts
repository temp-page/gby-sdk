import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { MulContract } from "../../mulcall";
export declare class BoostTradeServicesContract extends BaseAbi {
    multicall: BoostTradeServicesMultiCall;
    constructor(connectInfo: ConnectInfo);
    closeBoostTrade(postionHash: string, priceUpdateData: string[]): Promise<TransactionEvent>;
    openBoostTrade(isLong: boolean, targetID: string, tokenID: string, tokenAmount: string, leverage: string, takeProfit: string, priceUpdateData: string[], referral: string): Promise<TransactionEvent>;
}
export declare class BoostTradeServicesMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
}
