import { ChainInfo, ChainType, ClosePositionEvent, OpenPosition, OpenPositionConfig, OpenPositionEvent, OpenPositionParams, PositionData, Target, TargetTick, TokenPriceBalance, TradeInfo } from "../vo";
import { ConnectInfo } from "../../ConnectInfo";
import { EventBus } from "../../wallet";
export type EVNET_ID_INDEX = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export declare class TradeEventBus extends EventBus {
    static TOPIC_PRE_OPEN_POSITION: string;
    static TOPIC_PAIR_PRICE: string;
    static TOPIC_ALL_PRICE: string;
    static TOPIC_POSITIONS: string;
    static SYS_TOPIC_TICKS_UPDATE: string;
    static SYS_TOPIC_POSITIONS: string;
    emitAll(eventName: string, data?: any): void;
    removeAll(eventName: string): void;
}
export declare class TradeApi {
    pairs(chainType: ChainType): Promise<Target[]>;
    targetTicks(chainType: ChainType): Promise<TargetTick[]>;
    targetTickMap(chainType: ChainType): Promise<Record<string, TargetTick>>;
    private startTickUpdateEvent;
    private startPositionEvent;
    private startEvent;
    tradeInfo(chainType: ChainType, targetName: string): Promise<TradeInfo>;
    positionHistories(chainType: ChainType, userAddress: string, page?: number, pageSize?: number): Promise<{
        total: number;
        list: PositionData[];
    }>;
    positions(tickPrices: Record<string, TargetTick>, chainType: ChainType, userAddress: string): Promise<PositionData[]>;
    private updatePnl;
    private positionRecordAbiResultToPositionData;
    preOpenPosition(preOpenPositionParams: OpenPositionParams, tick: TargetTick, targetConfig: OpenPositionConfig): OpenPosition;
    openPosition(connectInfo: ConnectInfo, preOpenPositionParams: OpenPositionParams, target: string): Promise<OpenPositionEvent>;
    checkTradeState(txHash: string, chainInfo: ChainInfo): Promise<void>;
    closePosition(positionHash: string, connectInfo: ConnectInfo): Promise<ClosePositionEvent>;
    tokens(chainType: ChainType, account?: string | undefined): Promise<TokenPriceBalance[]>;
}
