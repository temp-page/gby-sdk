import { CompetitionExt, CompetitionPnl, KlineData, PositionDataDto, TickData, TradeEventDto } from "../vo";
export declare class ServerApi {
    klines(token: string, period: string, start: number, end: number, limit: number): Promise<KlineData[]>;
    ticks(all: boolean): Promise<TickData[]>;
    tradeEvents(tradeHash: string, chainName: string, type: 'TradeState' | 'RequestPrice' | undefined): Promise<TradeEventDto[]>;
    openPositions(chainName: string): Promise<PositionDataDto[]>;
    competitionRank(id: string, address: string): Promise<{
        sortPnl: CompetitionPnl[];
        sortVol: CompetitionPnl[];
        pnlUser: CompetitionPnl;
        volUser: CompetitionPnl;
    }>;
    competitionList(): Promise<{
        id: string;
        startTime: number;
        endTime: number;
        reward: string;
        rewardStartTime: number;
        rewardEndTime: number;
        ext: CompetitionExt;
        createTime: number;
    }[]>;
}
