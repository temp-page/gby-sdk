import type { Contract } from 'ethers6';
import type { ContractCall } from './types';
export declare const MAX_GAS_LIMIT = 30000000;
export declare const QUOTER_TRADE_GAS = 3000000;
export declare const CHUNK_SIZE = 200;
export declare function multicallExecute<T>(multicall: Contract, calls: ContractCall<T>[]): Promise<T[]>;
