"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectedWallet = exports.metamaskProvider = exports.InjectedWallet = exports.MetaMaskProvider = exports.AbsMetaMaskProvider = void 0;
const BaseWallet_1 = require("./BaseWallet");
const get_1 = __importDefault(require("lodash/get"));
const BasicException_1 = require("../BasicException");
const ethers6_1 = require("ethers6");
const WalletConnect_1 = require("../WalletConnect");
const lodash_1 = require("lodash");
class AbsMetaMaskProvider extends BaseWallet_1.AbstractBaseWallet {
    async getWalletConnect() {
        const _ethereum = this.provider();
        if (!_ethereum)
            throw new BasicException_1.BasicException('Check your wallet!');
        await _ethereum.enable();
        const walletConnect = new WalletConnect_1.WalletConnect(new ethers6_1.BrowserProvider(_ethereum, 'any'), _ethereum);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        walletConnect.switchNetwork = async (_chainId) => {
            return that.addMetamaskChain(_chainId);
        };
        walletConnect.connectCallBack = () => {
        };
        walletConnect.disconnectCallBack = () => {
            that.callBack.statusUpdate((0, BaseWallet_1.resetWalletConnectStatus)(that.id()));
        };
        const provider = walletConnect.provider;
        provider.on("accountsChanged", (...args) => {
            (0, lodash_1.debounce)(this.accountChanged, 500)(args);
        });
        provider.on("chainChanged", (...args) => {
            (0, lodash_1.debounce)(this.chainChanged, 500)(args);
        });
        provider.on("disconnect", () => {
            (0, lodash_1.debounce)(this.disconnect, 500)();
        });
        return walletConnect;
    }
    accountChanged(args) {
        BaseWallet_1.eventBus.emit("accountsChanged", args);
    }
    chainChanged(args) {
        BaseWallet_1.eventBus.emit("chainChanged", args);
    }
    installed() {
        return this.provider() !== undefined;
    }
    provider() {
        if (typeof window === "undefined") {
            return undefined;
        }
        return (0, get_1.default)(window, 'ethereum');
    }
    async addMetamaskChain(chainId) {
        const chainName = WalletConnect_1.ConnectManager.getChainName(chainId);
        if (!chainName) {
            return;
        }
        const _ethereum = this.provider();
        if (!_ethereum)
            return;
        const data = WalletConnect_1.ConnectManager.chainMap[chainName];
        if (!data)
            return;
        let addEthereumChainParams;
        let switchParams;
        if (typeof data === 'string') {
            addEthereumChainParams = undefined;
            switchParams = undefined;
        }
        else {
            addEthereumChainParams = data;
            switchParams = [
                {
                    chainId: data[0].chainId,
                },
            ];
        }
        try {
            await _ethereum.request({
                method: "wallet_switchEthereumChain",
                params: switchParams,
            });
        }
        catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await _ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: addEthereumChainParams,
                    });
                }
                catch (addError) {
                    throw new BasicException_1.BasicException('Failed to add chain to MetaMask');
                }
            }
            else {
                throw new BasicException_1.BasicException('Failed to switch chain');
            }
        }
    }
}
exports.AbsMetaMaskProvider = AbsMetaMaskProvider;
class MetaMaskProvider extends AbsMetaMaskProvider {
    downloadLink() {
        return "https://metamask.io/download/";
    }
    id() {
        return BaseWallet_1.ConnectorNames.MetaMask;
    }
}
exports.MetaMaskProvider = MetaMaskProvider;
class InjectedWallet extends AbsMetaMaskProvider {
    downloadLink() {
        return "";
    }
    id() {
        return BaseWallet_1.ConnectorNames.Injected;
    }
}
exports.InjectedWallet = InjectedWallet;
exports.metamaskProvider = new MetaMaskProvider();
exports.injectedWallet = new InjectedWallet();
