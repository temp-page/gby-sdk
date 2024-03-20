import { BalanceAndAllowance } from "../Types";
import { TransactionEvent } from "../TransactionEvent";
import { ConnectInfo } from "../../../ConnectInfo";
export interface Targets {
    base: string;
}
export interface TargetsTick {
    chainType: string;
    base: string;
    quote: string;
    open: string;
    close: string;
    high: string;
    low: string;
    priceChange: string;
    priceChangePercent: string;
}
export interface TradeInfo {
    topicOpenPosition(func: (data: OpenPosition) => void): void;
    topicPairPrice(func: (data: TargetsTick) => void): void;
    topicAllPrice(func: (data: TargetsTick[]) => void): void;
    preOpenPosition(pair: Targets, balance: TokenPriceBalance, leverage: string, isLong: boolean, inputAmount: string): OpenPosition;
    open(connectInfo: ConnectInfo): Promise<OpenPositionEvent>;
    tokens(): Promise<TokenPriceBalance[]>;
    tokenBalance: TokenPriceBalance[];
    targetsTick: TargetsTick;
    targetsTicks: TargetsTick[];
    approve(connectInfo: ConnectInfo): Promise<TransactionEvent>;
}
export interface TokenPriceBalance {
    balance: BalanceAndAllowance;
    price: string;
    tokenId: string;
}
export interface OpenPosition {
    position: string;
    entryPrice: string;
    liqPrice: string;
    balance: TokenPriceBalance;
    open(connectInfo: ConnectInfo): Promise<OpenPositionEvent>;
}
export interface OpenPositionEvent {
    step1(): Promise<TransactionEvent>;
    step2(): Promise<OpenPosition>;
}
