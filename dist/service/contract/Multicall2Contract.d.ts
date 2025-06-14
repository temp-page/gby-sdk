import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class Multicall2Contract extends BaseAbi {
    multicall: Multicall2MultiCall;
    constructor(connectInfo: ConnectInfo);
    aggregate(calls: {
        target: string;
        callData: string;
    }[]): Promise<TransactionEvent>;
    blockAndAggregate(calls: {
        target: string;
        callData: string;
    }[]): Promise<TransactionEvent>;
    tryAggregate(requireSuccess: boolean, calls: {
        target: string;
        callData: string;
    }[]): Promise<TransactionEvent>;
    tryBlockAndAggregate(requireSuccess: boolean, calls: {
        target: string;
        callData: string;
    }[]): Promise<TransactionEvent>;
    getBlockHash(blockNumber: string): Promise<string>;
    getBlockNumber(): Promise<string>;
    getCurrentBlockCoinbase(): Promise<string>;
    getCurrentBlockDifficulty(): Promise<string>;
    getCurrentBlockGasLimit(): Promise<string>;
    getCurrentBlockTimestamp(): Promise<string>;
    getEthBalance(addr: string): Promise<string>;
    getLastBlockHash(): Promise<string>;
}
export declare class Multicall2MultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getBlockHash(blockNumber: string): ContractCall<string>;
    getBlockNumber(): ContractCall<string>;
    getCurrentBlockCoinbase(): ContractCall<string>;
    getCurrentBlockDifficulty(): ContractCall<string>;
    getCurrentBlockGasLimit(): ContractCall<string>;
    getCurrentBlockTimestamp(): ContractCall<string>;
    getEthBalance(addr: string): ContractCall<string>;
    getLastBlockHash(): ContractCall<string>;
}
