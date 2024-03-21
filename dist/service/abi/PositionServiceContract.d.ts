import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { PositionRecordAbiResult } from "../vo";
import { ContractCall } from "../../mulcall";
export declare class PositionServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_listLivePosition(): ContractCall<PositionRecordAbiResult[]>;
    multicall_listLivePositionByAccount(account: string): ContractCall<PositionRecordAbiResult[]>;
    multicall_listLivePositionByPage(account: string, pageIndex: number, pageSize: number): ContractCall<PositionRecordAbiResult[]>;
    multicall_listHistoryPosition(): ContractCall<PositionRecordAbiResult[]>;
    multicall_listHistoryPositionByAccount(account: string): ContractCall<PositionRecordAbiResult[]>;
    multicall_listHistoryPositionByPage(account: string, pageIndex: number, pageSize: number): ContractCall<PositionRecordAbiResult[]>;
}
