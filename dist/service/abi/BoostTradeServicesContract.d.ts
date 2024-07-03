import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
export declare class BoostTradeServicesContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    openBoostTrade(isLong: boolean, targetID: string, tokenID: string, tokenAmount: string, leverage: string, takeProfit: string, priceUpdateData: string[], referralCode: string): Promise<TransactionEvent>;
    closeBoostTrade(positionHash: string, priceUpdateData: string[]): Promise<TransactionEvent>;
}
