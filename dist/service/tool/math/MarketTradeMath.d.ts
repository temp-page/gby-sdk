import { OpenPositionConfig, TargetTick } from "../../vo/";
export declare class MarketTradeMath {
    static margin(tokenAmount: string, tokenPrice: string, decimals: number, execFeeValue: string): string;
    static notionalPositionValue(margin: string, leverage: string): string;
    static executeFeeByTokenAmount(execFeeValue: string, decimals: number, tokenPrice: string): string;
    static feeByTokenAmount(openFee: string, closeFee: string, decimals: number, tokenPrice: string): string;
    static targetAmount(netTradeValue: string, targetPrice: string): string;
    static takeProfitPrice(isLong: boolean, takeProfit: string, margin: string, targetAmount: string, targetPrice: string): string;
    static liquidPrice(isLong: boolean, liquidation: string, margin: string, targetAmount: string, targetPrice: string): string;
    static stopLossPrice(isLong: boolean, positionType: number, stopLossPrice: string, stopLoss: string, margin: string, targetAmount: string, targetPrice: string): string;
    static pnl(isLong: boolean, targetAmount: string, openPrice: string, targetPrice: string, marginAmount: string): any;
    static tokenAmount(remainValue: string, tokenPrice: string, decimals: number): string;
    static initTargetFundingFeeRate(targetTick: TargetTick, getTargetConfig: OpenPositionConfig): void;
}
