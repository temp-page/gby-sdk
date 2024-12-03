import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class USDTContract extends BaseAbi {
    multicall: USDTMultiCall;
    constructor(connectInfo: ConnectInfo, token: string);
    approve(spender: string, amount: string): Promise<TransactionEvent>;
    decreaseAllowance(spender: string, subtractedValue: string): Promise<TransactionEvent>;
    increaseAllowance(spender: string, addedValue: string): Promise<TransactionEvent>;
    mint(): Promise<TransactionEvent>;
    transfer(to: string, amount: string): Promise<TransactionEvent>;
    transferFrom(from: string, to: string, amount: string): Promise<TransactionEvent>;
    allowance(owner: string, spender: string): Promise<string>;
    balanceOf(account: string): Promise<string>;
    decimals(): Promise<string>;
    name(): Promise<string>;
    symbol(): Promise<string>;
    totalSupply(): Promise<string>;
}
export declare class USDTMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    allowance(owner: string, spender: string): ContractCall<string>;
    balanceOf(account: string): ContractCall<string>;
    decimals(): ContractCall<string>;
    name(): ContractCall<string>;
    symbol(): ContractCall<string>;
    totalSupply(): ContractCall<string>;
}
