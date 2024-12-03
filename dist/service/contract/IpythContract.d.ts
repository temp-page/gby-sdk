import type { ConnectInfo } from '../../ConnectInfo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class IpythContract extends BaseAbi {
    multicall: IpythMultiCall;
    constructor(connectInfo: ConnectInfo);
    getUpdateFee(priceUpdateData: string[]): Promise<string>;
}
export declare class IpythMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getUpdateFee(priceUpdateData: string[]): ContractCall<string>;
}
