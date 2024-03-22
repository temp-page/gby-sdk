import { AbstractBaseWallet, ConnectCallback, ConnectorNames } from "./BaseWallet";
import { WalletConnect } from "../WalletConnect";
import type { Web3Modal } from "@web3modal/ethers5/dist/types/src/client";
export declare class WalletConnectProvider extends AbstractBaseWallet {
    downloadLink(): string;
    id(): ConnectorNames;
    callBack: ConnectCallback;
    getWalletConnect(): Promise<WalletConnect>;
    installed(): boolean;
    provider(): Promise<Web3Modal>;
}
export declare const walletConnectProvider: WalletConnectProvider;
