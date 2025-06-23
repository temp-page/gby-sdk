import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { MulContract } from "../../mulcall";
export declare class MarketTradeServicesContract extends BaseAbi {
    multicall: MarketTradeServicesMultiCall;
    constructor(connectInfo: ConnectInfo);
    closeMarketTrade(postionHash: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    openMarketTrade(isLong: boolean, targetID: string, tokenID: string, tokenAmount: string, leverage: string, takeProfit: string, stopLoss: string, priceUpdateData: string[], referral: string, value: string): Promise<TransactionEvent>;
}
export declare class MarketTradeServicesMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
}
