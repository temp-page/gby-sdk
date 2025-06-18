import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class TradeRewardsContract extends BaseAbi {
    multicall: TradeRewardsMultiCall;
    constructor(connectInfo: ConnectInfo);
    claim(round: string, amount: string, proof: string[]): Promise<TransactionEvent>;
    getClaimed(round: string, account: string): Promise<boolean>;
}
export declare class TradeRewardsMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getClaimed(round: string, account: string): ContractCall<boolean>;
}
