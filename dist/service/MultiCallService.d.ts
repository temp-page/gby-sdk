import { ContractCall } from "../mulcall";
import { ConnectInfo } from "../ConnectInfo";
import { Multicall2Contract } from "./contract";
export type ShapeWithLabel = Record<string, ContractCall<any> | string>;
export type ContractCallResult<T> = T extends ContractCall<infer U> ? U : never;
export type CallObjResult<T extends ShapeWithLabel[]> = {
    [K in keyof T]: {
        [P in keyof T[K]]: T[K][P] extends ContractCall<any> ? ContractCallResult<T[K][P]> : T[K][P];
    };
};
export declare class MultiCallService {
    connectInfo: ConnectInfo;
    multicall2Contract: Multicall2Contract;
    constructor(connectInfo: ConnectInfo);
    multicallExecute<T>(calls: ContractCall<T>[]): Promise<T[]>;
    callObj<T extends ShapeWithLabel[]>(...shapeWithLabels: T): Promise<CallObjResult<T>>;
    singleCallObj<T>(call: ContractCall<T>): Promise<T>;
}
