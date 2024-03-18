import { ConnectInfo } from '../../ConnectInfo';
export declare enum ChainType {
    mantle = "mantle",
    blast = "blast"
}
export declare const ChainTypeList: ChainType[];
export interface ChainInfo {
    chainId: number;
    scan: string;
    rpc: string;
    multicall: string;
    chainName: string;
    chainType: ChainType;
    "USDC": string;
    "USDT": string;
    "GLP": string;
    "ServiceService": string;
    "GBU": string;
    "RoleService": string;
    "VaultService": string;
    "PriceService": string;
    "LpService": string;
    "Portal": string;
    "TargetService": string;
    "MarketTradeServices": string;
    "PositionService": string;
    dataFeeds: string[];
}
/**
 * 地址信息
 */
export declare class AddressInfo {
    private readonly chain;
    private readonly chainMap;
    private chainInsMap;
    baseApiUrl: string;
    constructor(chains: ChainInfo[]);
    getDefaultChain(): ChainInfo;
    getChainInfo(chain: number | ChainType | string): ChainInfo;
    readonlyConnectInfo(chain: ChainInfo): ConnectInfo;
    getEtherscanAddress(chainInfo: ChainInfo, address: string): string;
    getEtherscanTx(chainInfo: ChainInfo, tx: string): string;
    getEtherscanLink(chainInfo: ChainInfo, data: string, type: 'transaction' | 'token' | 'address' | 'block'): string;
}
