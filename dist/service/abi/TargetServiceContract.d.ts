import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class TargetServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    addTarget(name: string, priceID: string, targetType: number): Promise<TransactionEvent>;
    removeTarget(targetID: string): Promise<TransactionEvent>;
    multicall_listTarget(): ContractCall<{
        targetName: string[];
        assetID: string[];
        priceID: string[];
    }>;
}
