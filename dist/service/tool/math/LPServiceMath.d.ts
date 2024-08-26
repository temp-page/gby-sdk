export interface VaultTokenConfig {
    maxTokenEmployedRate: string;
    feeBasisPoints: string;
    taxBasisPoints: string;
    enable: boolean;
    isStable: boolean;
    isDynamicFee: boolean;
}
export declare class LPServiceMath {
    static getGlpPrice(vaultValue: string, glpAmount: string): string;
    static getGlpFeePoint(value: string, vaultValue: string, tokenValueInVault: string, isMint: boolean, token: VaultTokenConfig, tokenTargetWeights: string): number;
}
