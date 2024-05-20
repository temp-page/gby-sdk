import { BalanceAndAllowance } from "../Types";
import { TransactionEvent } from "../TransactionEvent";
import { ConnectInfo } from "../../../ConnectInfo";
import { ChainType } from "../AddressInfo";
import { EVNET_ID_INDEX, KLINE_PERIOD } from "../../api";
import { Token } from "../../tool";
export interface PositionRecordAbiResult {
    positionType: string;
    isLong: boolean;
    positionHash: string;
    account: string;
    token: string;
    tokenAmount: string;
    reservedTokenAmount: string;
    target: string;
    targetAmount: string;
    pnl: string;
    enterValue: string;
    exitValue: string;
    exitReason: string;
    targetOpenPrice: string;
    targetClosePrice: string;
    tokenOpenPrice: string;
    takeProfitPrice: string;
    tokenClosePrice: string;
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
    fundingFee: string;
    executionFee: string;
}
export interface Target {
    base: string;
    quote: string;
    baseLogo: string;
    quoteLogo: string;
    targetId: string;
    priceId: string;
    chainType: ChainType;
}
export interface TargetTick {
    base: string;
    quote: string;
    baseLogo: string;
    quoteLogo: string;
    open: string;
    close: string;
    high: string;
    low: string;
    priceChange: string;
    priceChangePercent: string;
    volume: string;
    targetId: string;
    longOI: string;
    shortOI: string;
    fundingRateLong: string;
    fundingRateShort: string;
    chainType: ChainType;
    up: boolean;
}
export interface KlineDto {
    close: number;
    high: number;
    low: number;
    open: number;
    timestamp: number;
    volume: number;
}
export interface TradeInfo {
    topicPreOpenPosition(eventId: EVNET_ID_INDEX, func: (data: OpenPosition) => void): void;
    topicPairPrice(eventId: EVNET_ID_INDEX, func: (data: TargetTick) => void): void;
    topicAllPrice(eventId: EVNET_ID_INDEX, func: (data: TargetTick[]) => void): void;
    topicKline(eventId: EVNET_ID_INDEX, func: (data: KlineDto[]) => void): void;
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
    targetsTickMap: Record<string, TargetTick>;
    targetsTicks: TargetTick[];
    approve(tokenPriceBalance: TokenPriceBalance, connectInfo: ConnectInfo): Promise<TransactionEvent>;
    kline(period: KLINE_PERIOD): Promise<KlineDto[]>;
    /**
     * 当前持仓
     */
    positions(account: string): Promise<PositionData[]>;
    /**
     * 历史持仓
     */
    positionHistories(account: string, page: number, pageSize: number): Promise<{
        total: number;
        list: PositionData[];
    }>;
    topicPositions(eventId: EVNET_ID_INDEX, func: (data: PositionData[]) => void): void;
    closePosition(positionHash: string, connectInfo: ConnectInfo): Promise<ClosePositionEvent>;
    closeTopic(): void;
}
export interface TokenPriceBalance {
    balance: BalanceAndAllowance;
    price: string;
    tokenId: string;
}
export interface OpenPosition {
    entryPrice: string;
    liqPrice: string;
    openFee: string;
    execFee: string;
    openFeeUSD: string;
    execFeeUSD: string;
}
export interface OpenPositionConfig {
    targetType: string;
    openFeeRate: string;
    closeFeeRate: string;
    execFeeValue: string;
    maxOpenInterestLong: string;
    maxOpenInterestShort: string;
    fundingFeePerBlockP: string;
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
    type: 'Open' | 'Close' | 'TP Close' | 'SL Close' | 'Liquidated';
    leverage: string;
    isLong: boolean;
    /**
     * USD
     */
    initialMargin: string;
    /**
     * BASE
     */
    size: string;
    /**
     * USD
     */
    qty: string;
    entryPrice: string;
    markPrice: string;
    liqPrice: string;
    pnl: string;
    pnlRate: string;
    liquidLostRate: string;
    fundingFee: string;
    takeProfitPrice: string;
    stopLossPrice: string;
    closePrice: string;
    openTimeStamp: string;
    openFee: string;
    openFeeToken: string;
    closeFee: string;
    closeFeeToken: string;
    execFee: string;
    execFeeToken: string;
    netProfit: string;
    netProfitToken: string;
    duration: string;
    closeTimeStamp: string;
    token: Token;
    sourceData: PositionRecordAbiResult;
}
