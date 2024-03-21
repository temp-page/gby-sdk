import { BalanceAndAllowance } from "../Types";
import { TransactionEvent } from "../TransactionEvent";
import { ConnectInfo } from "../../../ConnectInfo";
import { ChainType } from "../AddressInfo";
import { EVNET_ID_INDEX } from "../../api";
export interface PositionRecordAbiResult {
    positionHash: string;
    positionType: string;
    account: string;
    isLong: boolean;
    token: string;
    tokenAmount: string;
    target: string;
    targetAmount: string;
    pnl: string;
    enterValue: string;
    exitValue: string;
    exitReason: string;
    openPrice: string;
    closePrice: string;
    takeProfitPrice: string;
    stopLossPrice: string;
    liquidPrice: string;
    leverage: string;
    margin: string;
    openBlock: string;
    openTimeStamp: string;
    openTradeHash: string;
    closeBlock: string;
    closeTimeStamp: string;
    closeTradeHash: string;
    broker: string;
    openFee: string;
    closeFee: string;
    executionFee: string;
}
export interface Target {
    base: string;
    quote: string;
    targetId: string;
    chainType: ChainType;
}
export interface TargetTick {
    base: string;
    quote: string;
    open: string;
    close: string;
    high: string;
    low: string;
    priceChange: string;
    priceChangePercent: string;
    volume: string;
}
export interface TradeInfo {
    topicPreOpenPosition(eventId: EVNET_ID_INDEX, func: (data: OpenPosition) => void): void;
    topicPairPrice(eventId: EVNET_ID_INDEX, func: (data: TargetTick) => void): void;
    topicAllPrice(eventId: EVNET_ID_INDEX, func: (data: TargetTick[]) => void): void;
    preOpenPosition(params: {
        balance: TokenPriceBalance;
        leverage: string;
        isLong: boolean;
        inputAmount: string;
        takeProfit: string;
    }): OpenPosition;
    open(connectInfo: ConnectInfo): Promise<OpenPositionEvent>;
    tokens(account: string | undefined): Promise<TokenPriceBalance[]>;
    tokenBalance: TokenPriceBalance[];
    targetsTick: TargetTick;
    targetsTicks: TargetTick[];
    approve(tokenPriceBalance: TokenPriceBalance, connectInfo: ConnectInfo): Promise<TransactionEvent>;
    /**
     * 当前持仓
     */
    positions: PositionData[];
    /**
     * 历史持仓
     */
    positionHistories: PositionData[];
    topicPositions(eventId: EVNET_ID_INDEX, func: (data: PositionData) => void): void;
    topicPositionHistories(eventId: EVNET_ID_INDEX, func: (data: PositionData) => void): void;
    closePosition(positionHash: string, connectInfo: ConnectInfo): Promise<ClosePositionEvent>;
}
export interface TokenPriceBalance {
    balance: BalanceAndAllowance;
    price: string;
    tokenId: string;
}
export interface OpenPosition {
    entryPrice: string;
    liqPrice: string;
}
export interface OpenPositionConfig {
    targetType: string;
    openFeeRate: string;
    closeFeeRate: string;
    execFeeValue: string;
    maxOpenInterestLong: string;
    maxOpenInterestShort: string;
}
export interface OpenPositionParams {
    balance: TokenPriceBalance;
    leverage: string;
    isLong: boolean;
    inputAmount: string;
    takeProfit: string;
}
export interface OpenPositionEvent {
    transactionEvent: TransactionEvent;
    step1(txHash: string): Promise<void>;
    step2(txHash: string): Promise<void>;
}
export interface ClosePositionEvent {
    transactionEvent: TransactionEvent;
    step1(txHash: string): Promise<void>;
    step2(txHash: string): Promise<void>;
}
export interface PositionData {
    positionHash: string;
    base: string;
    quote: string;
    leverage: string;
    isLong: boolean;
    /**
     * USD
     */
    initialMargin: string;
    /**
     * USD
     */
    size: string;
    entryPrice: string;
    markPrice: string;
    liqPrice: string;
    pnl: string;
    pnlRate: string;
    liquidLostRate: string;
    fundingFee: string;
    takeProfitPrice: string;
    stopLossPrice: string;
    openTimeStamp: string;
}
