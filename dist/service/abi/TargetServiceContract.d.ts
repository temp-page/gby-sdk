import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class TargetServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    addTarget(name: string, targetID: string, targetType: number): Promise<TransactionEvent>;
    removeTarget(targetID: string): Promise<TransactionEvent>;
    listTargets(): ContractCall<string[]>;
}
