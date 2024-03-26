export interface KlineData {
    symbol: string;
    period: string;
    open: string;
    close: string;
    high: string;
    low: string;
    time: string;
}
export interface TickData {
    symbol: string;
    open: string;
    close: string;
    high: string;
    low: string;
    priceChange: string;
    priceChangePercent: string;
}
export interface TradeEventDto {
    id: number;
    txHash: string;
    tradeHash: string;
    type: string;
    state: number;
    ext: TradeEventExtDto;
    blockNumber: number;
    txIndex: number;
    chainName: string;
    createTime: string;
    serialVersionUID: number;
}
export interface TradeEventExtDto {
    logObject: LogObjectDto;
    tradeState: TradeStateDto;
    requestPrice: RequestPriceDto;
}
export interface LogObjectDto {
    removed: boolean;
    logIndex: string;
    transactionIndex: string;
    transactionHash: string;
    blockHash: string;
    blockNumber: string;
    address: string;
    data: string;
    type: string;
    topics: string[];
}
export interface TradeStateDto {
    tradeHash: string;
    state: number;
}
export interface RequestPriceDto {
    targetID: string;
    tokenID: string;
    tradeHash: string;
    tradeType: number;
}
export interface PositionDataDto {
    id: string;
    openTxHash: string;
    closeTxHash: string;
    tradeHash: string;
    positionHash: string;
    state: number;
    ext: {
        openPosition: {
            account: string;
            target: string;
            token: string;
            tokenAmount: string;
            targetAmount: string;
            openPrice: string;
            isLong: boolean;
            liquidPrice: string;
            takeProfitPrice: string;
            stopLossPrice: string;
            leverage: string;
            margin: string;
            positionType: string;
            positionHash: string;
            long: boolean;
        };
    };
    blockNumber: string;
    txIndex: string;
    chainName: string;
    openTime: string;
    closeTime: string;
}
