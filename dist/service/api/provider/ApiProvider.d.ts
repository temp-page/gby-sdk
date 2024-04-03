import type { BaseApi } from '../base/BaseApi';
import { DashBoardApi } from "../DashBoardApi";
import { BuySellGLPApi } from "../BuySellGLPApi";
import { TokenApi } from "../TokenApi";
import { ServerApi } from "../ServerApi";
import { TradeApi } from "../TradeApi";
/**
 * 请求基类 详细信息查看
 */
export declare class ApiProvider {
    baseApi: BaseApi;
    constructor();
    dashBoardApi(): DashBoardApi;
    buySellGLPApi(): BuySellGLPApi;
    tokenApi(): TokenApi;
    serverApi(): ServerApi;
    tradeApi(): TradeApi;
}
export declare const apiProvider: ApiProvider;
