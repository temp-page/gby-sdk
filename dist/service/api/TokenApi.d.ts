import { Token } from '../tool';
import { ChainInfo, ChainType } from '../vo';
import { VaultToken } from "../vo";
export declare class TokenApi {
    vaultTokenList(chainType: ChainType): Promise<VaultToken[]>;
    batchGetTokens(chainInfo: ChainInfo, addresses: string[]): Promise<Record<string, Token>>;
    getTokenByContract(chainInfo: ChainInfo, addresses: string[]): Promise<Token[]>;
}
