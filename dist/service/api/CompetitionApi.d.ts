import { Competition, CompetitionClaimInfo, CompetitionDetail } from "../vo";
export declare class CompetitionApi {
    list(): Promise<Competition>;
    claimInfo(address: string): Promise<CompetitionClaimInfo>;
    detail(competitionId: string, address?: string): Promise<CompetitionDetail>;
}
