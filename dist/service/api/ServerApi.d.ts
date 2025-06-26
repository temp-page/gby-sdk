import { CompetitionPnl, KlineData, PositionDataDto, TickData, TradeEventDto } from "../vo";
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
    }[]>;
    competitionClaimInfo(address: string): Promise<{
        claimInfo: {
            rewardSymbol: string;
            address: string;
            contract: string;
            round: string;
            marketRoot: string;
            proof: string[];
            reward: string;
            showReward: string;
        };
        sortPnl: {
            id: string;
            rank: number;
            time: number;
            reward: string;
        }[];
        sortVol: {
            id: string;
            rank: number;
            time: number;
            reward: string;
        }[];
    }>;
    competitionListAll(): Promise<any[]>;
    competitionUpdateReward(data: any): Promise<any[]>;
}
