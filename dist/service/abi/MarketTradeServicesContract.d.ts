import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
export declare class MarketTradeServicesContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    openBoostTrade(isLong: boolean, targetID: string, tokenID: string, tokenAmount: string, leverage: string, takeProfit: string): Promise<TransactionEvent>;
    closeBoostTrade(positionHash: string): Promise<TransactionEvent>;
}
