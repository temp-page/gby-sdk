import { Token } from "../../tool";
export interface VaultToken {
    address: string;
    weight: string;
    tokenAmount: string;
    token: Token;
    assetID: string;
}
