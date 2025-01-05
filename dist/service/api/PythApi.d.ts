import { ChainType } from "../vo";
export declare class PythApi {
    priceIds: Record<string, string>;
    lastPrice: Record<string, string>;
    init: boolean;
    chainType: ChainType;
    initPriceIds(chainType: ChainType): Promise<PythApi>;
    priceFeedsUpdateData(): Promise<string[]>;
    priceFeedsUpdateDataByTokens(symbols: string[]): Promise<string[]>;
    priceFeedsUpdateDataByPriceIds(priceIds: string[]): Promise<string[]>;
    priceByPriceId(priceId: string): string;
    priceBySymbol(symbol: string): string;
}
