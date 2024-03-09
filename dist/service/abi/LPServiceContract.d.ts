import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
export declare class LPServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    static getGlpPrice(vaultValue: string, glpAmount: string): string;
}
