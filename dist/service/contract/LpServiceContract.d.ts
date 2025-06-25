import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class LpServiceContract extends BaseAbi {
    multicall: LpServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    burnALP(assetID: string, amountALP: string, acceptableMinTokenAmount: string, priceUpdateData: string[]): Promise<TransactionEvent>;
    getAlpPrice(priceUpdateData: string[]): Promise<TransactionEvent>;
    mintALP(assetID: string, amountToken: string, acceptableMinAlpAmount: string, priceUpdateData: string[], value: string): Promise<TransactionEvent>;
    setAlpAddress(alpAddress: string): Promise<TransactionEvent>;
    setCoolingDuration(coolingDuration: string): Promise<TransactionEvent>;
    AlpAmount(): Promise<string>;
    getAccountCoolingTime(account: string): Promise<string>;
    getAccountLatestMintTime(account: string): Promise<string>;
    getAlpAddress(): Promise<string>;
    getCoolingDuration(): Promise<string>;
}
export declare class LpServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    AlpAmount(): ContractCall<string>;
    getAccountCoolingTime(account: string): ContractCall<string>;
    getAccountLatestMintTime(account: string): ContractCall<string>;
    getAlpAddress(): ContractCall<string>;
    getCoolingDuration(): ContractCall<string>;
}
