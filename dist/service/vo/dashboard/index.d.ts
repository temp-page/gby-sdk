import { Token } from "../../tool";
export interface DashboardGLPPoolPosition {
    totalPoolValue: string;
    totalOl: string;
    longOl: string;
    shortOl: string;
    netOl: string;
    unrealizedPNL: string;
    pools: {
        symbol: string;
        totalOl: string;
        longOl: string;
        shortOl: string;
        netOl: string;
        unrealizedPNL: string;
    }[];
}
export interface DashboardGLPLiquidityComposition {
    token: Token;
    /**
     * Token数量
     */
    tokenQuantity: string;
    /**
     * 总价值 $
     */
    totalValue: string;
    /**
     * 买入费用 %
     */
    buyFee: string;
    /**
     * 卖出费用 %
     */
    sellFee: string;
    /**
     * 模板权重
     */
    targetWeight: string;
    /**
     * 当前权重
     */
    currentWeight: string;
    /**
     * 比例
     */
    rate: string;
}
export interface DashboardGLPPriceHistory {
    price: string;
    time: string;
}
export interface DashboardGLPPrice {
    /**
     * GLP Price
     */
    GLPPrice: string;
    /**
     * GLP 总供应量
     */
    totalSupply: string;
    /**
     * GLP 总价值
     */
    totalValue: string;
}
export interface DashboardGLPStakeInfo {
    totalAPY: string;
    feeAPY: string;
    stakeAPY: string;
    unclaimedRewards: string;
    totalAmountStaked: string;
    totalValueStaked: string;
    myStakedGLP: string;
}
