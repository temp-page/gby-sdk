import { KlineData, TickData, TradeEventDto } from "../vo";
export declare class ServerApi {
    klines(token: string, period: string, start: number, end: number, limit: number): Promise<KlineData[]>;
    ticks(): Promise<TickData[]>;
    tradeEvents(tradeHash: string, chainName: string, type: 'TradeState' | 'RequestPrice' | undefined): Promise<TradeEventDto[]>;
}
