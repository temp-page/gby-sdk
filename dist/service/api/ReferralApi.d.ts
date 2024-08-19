import { ChainType, ReferralInfo } from "../vo";
export declare class ReferralApi {
    referralInfo(chainType: ChainType, address: string): Promise<ReferralInfo>;
}
