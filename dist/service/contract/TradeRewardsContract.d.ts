import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class TradeRewardsContract extends BaseAbi {
    multicall: TradeRewardsMultiCall;
    constructor(connectInfo: ConnectInfo, address: string);
    claim(round: string, amount: string, proof: string[]): Promise<TransactionEvent>;
    closeRound(round: string): Promise<TransactionEvent>;
    openRound(round: string): Promise<TransactionEvent>;
    renounceOwnership(): Promise<TransactionEvent>;
    setRewardToken(token: string): Promise<TransactionEvent>;
    setup(round: string, amount: string, deadline: string, merkleRoot: string, value: string): Promise<TransactionEvent>;
    transferOwnership(newOwner: string): Promise<TransactionEvent>;
    withdraw(amount: string): Promise<TransactionEvent>;
    claimed(arg0: string, arg1: string): Promise<boolean>;
    currentRound(): Promise<string>;
    getClaimed(round: string, user: string): Promise<boolean>;
    owner(): Promise<string>;
    rewardToken(): Promise<string>;
    rewards(index: string): Promise<{
        round: string;
        amount: string;
        deadline: string;
        merkleRoot: string;
        claimed: string;
        openning: boolean;
    }>;
}
export declare class TradeRewardsMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    claimed(arg0: string, arg1: string): ContractCall<boolean>;
    currentRound(): ContractCall<string>;
    getClaimed(round: string, user: string): ContractCall<boolean>;
    owner(): ContractCall<string>;
    rewardToken(): ContractCall<string>;
    rewards(index: string): ContractCall<{
        round: string;
        amount: string;
        deadline: string;
        merkleRoot: string;
        claimed: string;
        openning: boolean;
    }>;
}
