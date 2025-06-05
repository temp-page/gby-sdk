import { ConnectInfo } from '../../ConnectInfo';
import { Config } from "./ExtTransactionEvent";
export declare enum ChainType {
    hemi = "hemi"
}
export declare const ChainTypeList: ChainType.hemi[];
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
    "GBU": string;
    "Pyth": string;
    chainToken: string;
    txBaseConfig: Config;
}
/**
 * 地址信息
 */
export declare class AddressInfo {
    private readonly chain;
    private readonly chainMap;
    private chainInsMap;
    baseApiUrl: string;
    wsUrl: string;
    graphUrl: string;
    env: string;
    constructor(chains: ChainInfo[]);
    getDefaultChain(): ChainInfo;
    getAllChain(): ChainInfo[];
    getChainInfo(chain: number | ChainType | string): ChainInfo;
    readonlyConnectInfo(chain: ChainInfo): ConnectInfo;
    getEtherscanAddress(chainInfo: ChainInfo, address: string): string;
    getEtherscanTx(chainInfo: ChainInfo, tx: string): string;
    getEtherscanLink(chainInfo: ChainInfo, data: string, type: 'transaction' | 'token' | 'address' | 'block'): string;
}
