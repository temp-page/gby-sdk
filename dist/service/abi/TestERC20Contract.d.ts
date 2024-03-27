import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { TransactionEvent } from "../vo";
export declare class TestERC20Contract extends BaseAbi {
    constructor(connectInfo: ConnectInfo, address: string);
    mint(): Promise<TransactionEvent>;
    transfer(to: string, value: string): Promise<TransactionEvent>;
}
