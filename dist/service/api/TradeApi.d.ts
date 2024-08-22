import { AddMarginInfo, ChainType, ClosePositionEvent, OpenPosition, OpenPositionConfig, OpenPositionEvent, OpenPositionParams, PositionData, Target, TargetTick, TokenPriceBalance, TPSLInfo, TradeInfo, VaultToken } from "../vo";
import { ConnectInfo } from "../../ConnectInfo";
export type EVNET_ID_INDEX = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type KLINE_PERIOD = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d" | "1w" | "1M";
export declare const BOOST = "BOOST";
export declare class TradeApi {
    pairs(chainType: ChainType): Promise<Target[]>;
    noCachePairs(chainType: ChainType): Promise<Target[]>;
    targetTicks(chainType: ChainType, all?: boolean): Promise<TargetTick[]>;
    targetTickMap(chainType: ChainType): Promise<Record<string, TargetTick>>;
    private startTickUpdateEvent;
    private startPositionEvent;
    private startEvent;
    tradeInfo(chainType: ChainType, targetName: string, referralCode?: string): Promise<TradeInfo>;
    positionHistories(chainType: ChainType, vaultTokens: VaultToken[], targets: Target[], userAddress: string, page?: number, pageSize?: number): Promise<{
        total: number;
        list: PositionData[];
    }>;
    positions(tickPrices: Record<string, TargetTick>, vaultTokens: VaultToken[], targets: Target[], chainType: ChainType, userAddress: string): Promise<PositionData[]>;
    private updateFundingFee;
    private updatePnl;
    private positionRecordAbiResultToPositionData;
    preOpenPosition(preOpenPositionParams: OpenPositionParams, tick: TargetTick, targetConfig: OpenPositionConfig): OpenPosition;
    openPosition(connectInfo: ConnectInfo, openPosition: OpenPosition, targetTick: TargetTick, referralCode?: string): Promise<OpenPositionEvent>;
    closePosition(positionHash: string, positionType: string, connectInfo: ConnectInfo): Promise<ClosePositionEvent>;
    tokens(chainType: ChainType, supportedTokens: string[], account?: string | undefined): Promise<TokenPriceBalance[]>;
    addMarginInfo(chainType: ChainType, positionData: PositionData, supportedTokens: string[]): Promise<AddMarginInfo>;
    TPSLInfo(chainType: ChainType, positionData: PositionData): Promise<TPSLInfo>;
}
