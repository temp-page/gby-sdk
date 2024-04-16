import { Token } from "../tool";
import { Balance, BuyGLPInfo, ChainType, SellGLPInfo } from "../vo";
export declare class BuySellGLPApi {
    tokens(chainType: ChainType, account?: string): Promise<Balance[]>;
    buyInfo(chainType: ChainType, token: Token, account?: string): Promise<BuyGLPInfo>;
    sellInfo(chainType: ChainType, token: Token, account?: string): Promise<SellGLPInfo>;
}
