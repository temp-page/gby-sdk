import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { PositionRecordAbiResult } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class PositionServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_listLivePosition(account: string, pageIndex: number, pageSize: number): ContractCall<PositionRecordAbiResult[]>;
    multicall_getLivePositionCount(account: string): ContractCall<string>;
    multicall_getHistoryPositionCount(account: string): ContractCall<string>;
    multicall_listHistoryPosition(account: string, pageIndex: number, pageSize: number): ContractCall<PositionRecordAbiResult[]>;
}
