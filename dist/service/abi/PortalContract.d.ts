import { Token } from "../tool";
import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
export declare class PortalContract extends BaseAbi {
    private readonly contractV5;
    constructor(connectInfo: ConnectInfo);
    mintGLP(assetID: string, amountToken: string, acceptableMinGlpAmount: string): Promise<any>;
    burnGLP(assetID: string, amountGLP: string, acceptableMinTokenAmount: string): Promise<any>;
    static getVaultValue(token: Token, amount: string, price: string): string;
    multicall_getPrice(assetID: string): ContractCall<[string, string]>;
    multicall_GlpPrice(): ContractCall<string>;
    multicall_getVaultValue(): ContractCall<[string, string[]]>;
}
