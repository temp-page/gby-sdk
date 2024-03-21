export declare class MarketTradeMath {
    static margin(tokenAmount: string, tokenPrice: string, decimals: number): string;
    static netTradeValue(tokenAmount: string, leverage: string, tokenPrice: string, decimals: number): string;
    static openFee(margin: string, openFeeRate: string): string;
    static closeFee(margin: string, closeFeeRate: string): string;
    static finalMargin(margin: string, openFee: string, closeFee: string, execFeeValue: string): string;
    static finalNetTradeValue(netTradeValue: string, execFeeValue: string, openFee: string, closeFee: string): string;
    static targetAmount(netTradeValue: string, targetPrice: string): string;
    static takeProfitPrice(isLong: boolean, takeProfit: string, margin: string, targetAmount: string, targetPrice: string): string;
    static liquidPrice(isLong: boolean, liquidation: string, margin: string, targetAmount: string, targetPrice: string): string;
    static stopLossPrice(isLong: boolean, positionType: number, stopLossPrice: string, stopLoss: string, margin: string, targetAmount: string, targetPrice: string): string;
    static entryValue(tokenAmount: string, tokenPrice: string, decimals: number): string;
}
