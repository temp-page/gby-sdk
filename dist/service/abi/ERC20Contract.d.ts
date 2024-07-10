import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from './BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class ERC20MultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    totalSupply(): ContractCall<string>;
}
export declare class ERC20Contract extends BaseAbi {
    multiCall: ERC20MultiCall;
    constructor(connectInfo: ConnectInfo, token: string);
    allowance(owner: string, sender: string): Promise<string>;
    approve(spender: string, value: string): Promise<TransactionEvent>;
    transfer(to: string, value: string): Promise<TransactionEvent>;
    transferFrom(from: string, to: string, value: string): Promise<TransactionEvent>;
    totalSupply(): Promise<string>;
    balanceOf(owner: string): Promise<string>;
    name(): Promise<string>;
    symbol(): Promise<string>;
    decimals(): Promise<number>;
    multicall_totalSupply(): ContractCall<string>;
    multicall_decimals(): ContractCall<string>;
    multicall_balanceOf(account: string): ContractCall<string>;
    multicall_name(): ContractCall<string>;
    multicall_symbol(): ContractCall<string>;
    multicall_allowance(userAddress: string, exchangeAddress: string): ContractCall<string>;
}
