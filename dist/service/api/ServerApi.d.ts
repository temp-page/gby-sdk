import { KlineData, TickData } from "../vo";
export declare class ServerApi {
    klines(token: string, period: string, start: number, end: number, limit: number): Promise<KlineData[]>;
    ticks(): Promise<TickData[]>;
}
