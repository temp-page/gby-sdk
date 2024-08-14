import { Token } from "../tool";
import { Balance, BuyGLPInfo, BuySellTokenBalance, ChainType, SellGLPInfo } from "../vo";
export declare class BuySellGLPApi {
    lpBalance(chainType: ChainType, account?: string): Promise<Balance>;
    tokens(chainType: ChainType, account?: string): Promise<BuySellTokenBalance[]>;
    buyInfo(chainType: ChainType, token: Token, account?: string): Promise<BuyGLPInfo>;
    sellInfo(chainType: ChainType, token: Token, account?: string): Promise<SellGLPInfo>;
}
