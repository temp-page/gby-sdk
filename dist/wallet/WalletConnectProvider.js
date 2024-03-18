"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletConnectProvider = exports.WalletConnectProvider = void 0;
const BaseWallet_1 = require("./BaseWallet");
const BasicException_1 = require("../BasicException");
const ethers6_1 = require("ethers6");
const WalletConnect_1 = require("../WalletConnect");
const SdkProvider_1 = require("../SdkProvider");
const Constant_1 = require("../Constant");
const service_1 = require("../service");
const ethers5_1 = require("@web3modal/ethers5");
class WalletConnectProvider extends BaseWallet_1.AbstractBaseWallet {
    downloadLink() {
        return "";
    }
    id() {
        return BaseWallet_1.ConnectorNames.WalletConnect;
    }
    async getWalletConnect() {
        const modal = this.provider();
        let walletProvider;
        let open = false;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const isConnected = modal.getIsConnected();
            const state = modal.getState();
            service_1.Trace.debug("isConnected", isConnected, state);
            if (!isConnected) {
                if (!state.open) {
                    if (open) {
                        throw new BasicException_1.BasicException("User rejected the request");
                    }
                    await modal.open({
                        view: "Connect",
                    });
                }
                else {
                    open = true;
                }
                await (0, service_1.sleep)(1000);
                continue;
            }
            else {
                walletProvider = modal.getWalletProvider();
            }
            service_1.Trace.debug("walletProvider", walletProvider);
            if (walletProvider) {
                const chainInfo = (0, Constant_1.getCurrentAddressInfo)().getChainInfo(SdkProvider_1.SdkProvider.currentChainType);
                if (modal.getState().selectedNetworkId !== chainInfo.chainId) {
                    await modal.switchNetwork(chainInfo.chainId);
                    continue;
                }
            }
            if (walletProvider) {
                await modal.close();
                break;
            }
        }
        service_1.Trace.debug("connect walletProvider", walletProvider);
        const walletConnectProvider = new ethers6_1.BrowserProvider(walletProvider, "any");
        const walletConnect = new WalletConnect_1.WalletConnect(walletConnectProvider);
        walletConnect.provider = walletConnectProvider;
        walletConnect.switchNetwork = async (_chainId) => {
            try {
                this.callBack.loading(true);
                await modal.switchNetwork(_chainId);
            }
            finally {
                this.callBack.loading(false);
            }
        };
        walletConnect.disconnectCallBack = () => {
            this.callBack.statusUpdate((0, BaseWallet_1.resetWalletConnectStatus)(this.id()));
            modal.close().catch();
            modal.disconnect().catch();
        };
        walletConnect.connectCallBack = () => {
            modal.close().catch();
        };
        let account = (await walletConnectProvider.getSigner()).getAddress();
        let chainId = (await walletConnectProvider.getNetwork()).chainId;
        modal.subscribeProvider((newState) => {
            if (newState && newState.provider) {
                if (newState.chainId !== chainId) {
                    BaseWallet_1.eventBus.emit("chainChanged", newState.chainId);
                    chainId = newState.chainId;
                    return;
                }
                if (account !== newState.address) {
                    BaseWallet_1.eventBus.emit("accountsChanged", [newState.address]);
                    account = newState.address;
                    return;
                }
            }
            if (newState && newState.isConnected === false) {
                this.callBack.statusUpdate((0, BaseWallet_1.resetWalletConnectStatus)(this.id()));
            }
            console.log("newState", newState);
        });
        return walletConnect;
    }
    installed() {
        return true;
    }
    provider() {
        const metadata = {
            name: "GodBlassYou",
            description: "GodBlassYou",
            url: "https://testnet.godblastyou.xyz/", // origin must match your domain & subdomain
            icons: ["https://testnet.godblastyou.xyz/ico.svg"],
        };
        const projectId = "d6f2f74ba9ba37fc9ff606137c48407d";
        const chains = service_1.ChainTypeList.map(it => {
            const chainInfo = (0, Constant_1.getCurrentAddressInfo)().getChainInfo(it);
            return {
                chainId: chainInfo.chainId,
                name: chainInfo.chainName,
                currency: "ETH",
                explorerUrl: chainInfo.scan,
                rpcUrl: chainInfo.rpc,
            };
        });
        const modal = (0, ethers5_1.createWeb3Modal)({
            ethersConfig: (0, ethers5_1.defaultConfig)({ metadata }),
            chains: chains,
            defaultChain: chains.find(it => it.chainId === (0, Constant_1.getCurrentAddressInfo)().getChainInfo(SdkProvider_1.SdkProvider.currentChainType).chainId),
            projectId,
        });
        return modal;
    }
}
exports.WalletConnectProvider = WalletConnectProvider;
exports.walletConnectProvider = new WalletConnectProvider();
