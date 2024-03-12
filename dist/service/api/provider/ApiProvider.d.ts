import type { BaseApi } from '../base/BaseApi';
import { DashBoardApi } from "../DashBoardApi";
import { BuySellGLPApi } from "../BuySellGLPApi";
import { TokenApi } from "../TokenApi";
/**
 * 请求基类 详细信息查看
 */
export declare class ApiProvider {
    baseApi: BaseApi;
    constructor();
    dashBoardApi(): DashBoardApi;
    buySellGLPApi(): BuySellGLPApi;
    tokenApi(): TokenApi;
}
export declare const apiProvider: ApiProvider;
