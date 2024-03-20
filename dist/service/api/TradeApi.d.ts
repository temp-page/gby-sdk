import { ChainType, Targets, TokenPriceBalance } from "../vo";
export declare class TradeApi {
    pairs(chainType: ChainType): Promise<Targets[]>;
    tokens(chainType: ChainType, account?: string | undefined): Promise<TokenPriceBalance[]>;
}
