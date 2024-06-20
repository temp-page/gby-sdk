import { BaseAbi } from "./BaseAbi";
import type { ConnectInfo } from "../../ConnectInfo";
import { ContractCall } from "../../mulcall";
import { TransactionEvent } from "../vo";
export declare class RoleServiceContract extends BaseAbi {
    constructor(connectInfo: ConnectInfo);
    multicall_getRoleMember(role: string, index: number): ContractCall<string>;
    multicall_getAdminRole(role: string): ContractCall<string>;
    multicall_getRoleMemberCount(role: string): ContractCall<string>;
    setAdminRole(role: string, adminRole: string): Promise<TransactionEvent>;
    grantRole(role: string, account: string): Promise<TransactionEvent>;
    revokeRole(role: string, account: string): Promise<TransactionEvent>;
    renounceRole(role: string): Promise<TransactionEvent>;
}
