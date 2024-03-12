import { ChainType, DashboardGLPLiquidityComposition, DashboardGLPPoolPosition, DashboardGLPPrice, DashboardGLPPriceHistory, DashboardGLPStakeInfo } from "../vo";
export declare class DashBoardApi {
    poolPosition(chainType: ChainType): Promise<DashboardGLPPoolPosition>;
    liquidityComposition(chainType: ChainType): Promise<DashboardGLPLiquidityComposition[]>;
    priceHistory(): Promise<DashboardGLPPriceHistory[]>;
    price(chainType: ChainType): Promise<DashboardGLPPrice>;
    stakeInfo(): Promise<DashboardGLPStakeInfo>;
}
