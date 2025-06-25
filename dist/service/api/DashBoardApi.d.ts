import { ChainType, DashboardGLPLiquidityComposition, DashboardGLPPoolPosition, DashboardGLPPrice, DashboardGLPPriceHistory, DashboardIndex } from "../vo";
export declare class DashBoardApi {
    poolPosition(chainType: ChainType): Promise<DashboardGLPPoolPosition>;
    liquidityComposition(chainType: ChainType): Promise<DashboardGLPLiquidityComposition[]>;
    priceHistory(chainType: ChainType): Promise<DashboardGLPPriceHistory[]>;
    price(chainType: ChainType, account?: string): Promise<DashboardGLPPrice>;
    index(chainType: ChainType): Promise<DashboardIndex>;
}
