export type PrecisionConfigType = {
    price: number;
    personal: number;
    statistics: number;
};
export declare const PrecisionConfig: Record<string, PrecisionConfigType>;
export declare const getPrecision: (symbol?: string) => PrecisionConfigType;
