import { Balance, BalanceAndAllowance } from "../Types";
import { ConnectInfo } from "../../../ConnectInfo";
import { TransactionEvent } from "../TransactionEvent";
import { Token } from "../../tool";
export declare class BuySellTokenBalance extends Balance {
    buyFee: string;
    sellFee: string;
    constructor(token: Token, user: string, balance: string, buyFee: string, sellFee: string);
    static availableData(balance: Balance, buyFee: string, sellFee: string): BuySellTokenBalance;
    static unavailableData(token: Token, buyFee: string, sellFee: string): BuySellTokenBalance;
}
export interface PreBuyGLPInfo {
    /**
     * 买入费用 %
     */
    feePercent: string;
    /**
     * 你将获得GLP
     */
    youWillGet: string;
    /**
     * 费用金额（输入币子）
     */
    feeAmount: string;
    /**
     * APY %
     */
    apy: string;
}
export interface BuyGLPInfo {
    balance: BalanceAndAllowance;
    preBuy(inputAmount: string): Promise<PreBuyGLPInfo>;
    buy(inputAmount: string, connectInfo: ConnectInfo): Promise<TransactionEvent>;
    /**
     * 价格
     */
    price: string;
    /**
     * 价格反转
     */
    priceInvert: string;
    glpBalance: string;
}
export interface PreSellGLPInfo {
    /**
     * Sell 费用 %
     */
    feePercent: string;
    /**
     * 你将获得Token
     */
    youWillGet: string;
    /**
     * 费用金额（输入币子）
     */
    feeAmount: string;
}
export interface SellGLPInfo {
    balance: BalanceAndAllowance;
    preSell(inputAmount: string): Promise<PreSellGLPInfo>;
    sell(inputAmount: string, connectInfo: ConnectInfo): Promise<TransactionEvent>;
    /**
     * 价格
     */
    price: string;
    /**
     * 价格反转
     */
    priceInvert: string;
    tokenBalance: string;
    /**
     * 倒计时秒数 0表示没有倒计时
     */
    countDown: number;
    stakeGLP: string;
}
