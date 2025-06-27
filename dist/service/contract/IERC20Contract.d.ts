import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class IERC20Contract extends BaseAbi {
    multicall: IERC20MultiCall;
    constructor(connectInfo: ConnectInfo, token: string);
    approve(spender: string, value: string): Promise<TransactionEvent>;
    transfer(to: string, value: string): Promise<TransactionEvent>;
    transferFrom(from: string, to: string, value: string): Promise<TransactionEvent>;
    allowance(owner: string, spender: string): Promise<string>;
    balanceOf(owner: string): Promise<string>;
    decimals(): Promise<string>;
    name(): Promise<string>;
    symbol(): Promise<string>;
    totalSupply(): Promise<string>;
}
export declare class IERC20MultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    allowance(owner: string, spender: string): ContractCall<string>;
    balanceOf(owner: string): ContractCall<string>;
    decimals(): ContractCall<string>;
    name(): ContractCall<string>;
    symbol(): ContractCall<string>;
    totalSupply(): ContractCall<string>;
}
