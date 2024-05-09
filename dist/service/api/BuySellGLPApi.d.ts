import { Token } from "../tool";
import { BuyGLPInfo, BuySellTokenBalance, ChainType, SellGLPInfo } from "../vo";
export declare class BuySellGLPApi {
    tokens(chainType: ChainType, account?: string): Promise<BuySellTokenBalance[]>;
    buyInfo(chainType: ChainType, token: Token, account?: string): Promise<BuyGLPInfo>;
    sellInfo(chainType: ChainType, token: Token, account?: string): Promise<SellGLPInfo>;
}
