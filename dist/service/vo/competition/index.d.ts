import { ConnectInfo } from "../../../ConnectInfo";
import { TransactionEvent } from "../TransactionEvent";
export interface CompetitionItem {
    id: string;
    startTime: number;
    endTime: number;
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
export interface CompetitionExt {
    marketRoot: string;
    round: string;
    rewards: {
        address: string;
        rank: number;
        amount: string;
        proof: string[];
    }[];
}
export interface CompetitionClaimInfo {
    id?: string;
    time?: number;
    rank?: number;
    reward?: string;
    canClaim: boolean;
    claim: (connectInfo: ConnectInfo) => Promise<TransactionEvent>;
}
export interface CompetitionDetail {
    topPnl: {
        your: {
            yourRank: number;
            totalRank: number;
            pnl: CompetitionPnl;
        };
        list: CompetitionPnl[];
    };
    topVol: {
        your: {
            yourRank: number;
            totalRank: number;
            vol: CompetitionPnl;
        };
        list: CompetitionPnl[];
    };
}
