import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
export declare class PythContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_getUpdateFee(priceUpdateData: string[]): ContractCall<string>;
    getUpdateFee(priceUpdateData: string[]): Promise<string>;
}
