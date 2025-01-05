import type { ConnectInfo } from '../../ConnectInfo';
import type { TransactionEvent } from '../vo';
import { BaseAbi } from '../api/base/BaseAbi';
import { ContractCall, MulContract } from "../../mulcall";
export declare class RoleServiceContract extends BaseAbi {
    multicall: RoleServiceMultiCall;
    constructor(connectInfo: ConnectInfo);
    grantRole(role: string, account: string): Promise<TransactionEvent>;
    renounceRole(role: string): Promise<TransactionEvent>;
    revokeRole(role: string, account: string): Promise<TransactionEvent>;
    setAdminRole(role: string, adminRole: string): Promise<TransactionEvent>;
    getAdminRole(role: string): Promise<string>;
    getRoleMember(role: string, index: string): Promise<string>;
    getRoleMemberCount(role: string): Promise<string>;
    listRoleMembers(role: string): Promise<string[]>;
}
export declare class RoleServiceMultiCall {
    private mulContract;
    constructor(mulContract: MulContract);
    getAdminRole(role: string): ContractCall<string>;
    getRoleMember(role: string, index: string): ContractCall<string>;
    getRoleMemberCount(role: string): ContractCall<string>;
    listRoleMembers(role: string): ContractCall<string[]>;
}
