import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
export declare class MarketTradeServicesContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    openMarketTrade(isLong: boolean, targetID: string, tokenID: string, tokenAmount: string, leverage: string, takeProfit: string, priceUpdateData: string[], referral: string): Promise<TransactionEvent>;
    closeMarketTrade(positionHash: string, priceUpdateData: string[]): Promise<TransactionEvent>;
}
