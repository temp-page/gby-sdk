import { EventBus } from "../../../wallet";
export declare class TradeEventBus extends EventBus {
    static TOPIC_PRE_OPEN_POSITION: string;
    static TOPIC_PAIR_PRICE: string;
    static TOPIC_ALL_PRICE: string;
    static TOPIC_KLINE: string;
    static TOPIC_POSITIONS: string;
    static SYS_TOPIC_TICKS_UPDATE: string;
    static SYS_TOPIC_TICK_DATA_UPDATE: string;
    static SYS_TOPIC_POSITIONS: string;
    emitAll(eventName: string, data?: any): void;
    removeAll(eventName: string): void;
}
export declare const tradeEventBus: TradeEventBus;
