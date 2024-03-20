import { AbstractBaseWallet, ConnectCallback, ConnectorNames } from "./BaseWallet";
import { WalletConnect } from "../WalletConnect";
export declare class WalletConnectProvider extends AbstractBaseWallet {
    downloadLink(): string;
    id(): ConnectorNames;
    callBack: ConnectCallback;
    getWalletConnect(): Promise<WalletConnect>;
    installed(): boolean;
    provider(): any;
}
export declare const walletConnectProvider: WalletConnectProvider;
