import { ConnectInfo } from "../../../ConnectInfo";
import { TransactionEvent } from "../TransactionEvent";
export interface CompetitionItem {
    id: string;
    startTime: number;
    endTime: number;
    current: boolean;
    status: 'About to start' | 'Open' | 'Concluded';
}
export interface Competition {
    list: CompetitionItem[];
}
export interface CompetitionPnl {
    rank: number;
    address: string;
    pnlPercent: string;
    tradingVolume: string;
    realizedPnl: string;
    unrealizedPnl: string;
    totalPnl: string;
    usedCapital: string;
    margin: string;
    capitalEndRealizedPnl: string;
    competitionStartPnl: string;
    totalMargin: string;
}
export interface CompetitionClaimInfo {
    reward: string;
    address: string;
    rewardSymbol: string;
    showType: 'record' | 'claim' | 'none';
    canClaim: boolean;
    claim: (connectInfo: ConnectInfo) => Promise<TransactionEvent>;
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
}
export interface CompetitionDetail {
    topPnl: {
        your?: {
            yourRank: number;
            totalRank: number;
            address: string;
            pnl: CompetitionPnl;
        };
        list: CompetitionPnl[];
    };
    topVol: {
        your?: {
            yourRank: number;
            totalRank: number;
            address: string;
            vol: CompetitionPnl;
        };
        list: CompetitionPnl[];
    };
    filter: (current: number, size: number, search: string, type: 'topPnl' | 'topVol') => CompetitionPnl[];
}
