"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBaseWallet = exports.eventBus = exports.EventBus = exports.resetWalletConnectStatus = exports.ConnectorNameList = exports.ConnectorNames = void 0;
const service_1 = require("../service");
const WalletConnect_1 = require("../WalletConnect");
const Constant_1 = require("../Constant");
const SdkProvider_1 = require("../SdkProvider");
var ConnectorNames;
(function (ConnectorNames) {
    ConnectorNames["MetaMask"] = "MetaMask";
    ConnectorNames["Injected"] = "Injected";
    ConnectorNames["WalletConnect"] = "WalletConnect";
})(ConnectorNames || (exports.ConnectorNames = ConnectorNames = {}));
exports.ConnectorNameList = Object.values(ConnectorNames);
const resetWalletConnectStatus = (id) => {
    const params = {
        walletConnect: 'unlink',
        walletName: id,
        walletAddress: null,
        network: null,
    };
    return params;
};
exports.resetWalletConnectStatus = resetWalletConnectStatus;
class EventBus {
    constructor() {
        this.events = {};
    }
    emit(eventName, data) {
        // console.log("EVENT", eventName);
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn) => {
                fn(data);
            });
        }
    }
    on(eventName, fn) {
        // console.log("ON", eventName, fn);
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }
    onOne(eventName, fn) {
        // console.log("ON_ONE", eventName, fn);
        this.events[eventName] = [fn];
    }
    resetOn(eventName, fn) {
        this.events[eventName] = [];
        this.events[eventName].push(fn);
    }
    off(eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    // console.log("REMOVE", eventName, i, fn);
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
}
exports.EventBus = EventBus;
exports.eventBus = new EventBus();
class AbstractBaseWallet {
    resetConnect() {
        this.callBack = undefined;
        WalletConnect_1.ConnectManager.disConnect();
    }
    async connect(callBack) {
        this.callBack = callBack;
        const walletConnect = await this.getWalletConnect();
        await this.updateWallet(walletConnect);
        const that = this;
        exports.eventBus.resetOn("accountsChanged", async (args) => {
            service_1.Trace.log('accountsChanged', args);
            this.callBack.statusUpdate((0, exports.resetWalletConnectStatus)(that.id()));
            await that.updateWallet(await that.getWalletConnect());
        });
        exports.eventBus.resetOn("chainChanged", async (args) => {
            service_1.Trace.log('chainChanged', args);
            this.callBack.statusUpdate((0, exports.resetWalletConnectStatus)(that.id()));
            await that.updateWallet(await that.getWalletConnect());
        });
        return await WalletConnect_1.ConnectManager.connect(walletConnect);
    }
    async updateWallet(walletConnect) {
        try {
            const connectInfo = await WalletConnect_1.ConnectManager.connect(walletConnect);
            let chainInfo;
            try {
                chainInfo = (0, Constant_1.getCurrentAddressInfo)().getChainInfo(connectInfo.chainId);
            }
            catch (e) {
                chainInfo = (0, Constant_1.getCurrentAddressInfo)().getChainInfo(SdkProvider_1.SdkProvider.currentChainType);
            }
            if (chainInfo.chainType !== SdkProvider_1.SdkProvider.currentChainType) {
                SdkProvider_1.SdkProvider.fastSetChainType(chainInfo.chainType);
                this.callBack.chainUpdate(chainInfo.chainType);
            }
            service_1.Trace.log('connectInfo', connectInfo.chainId);
            if (connectInfo.chainId === chainInfo.chainId) {
                const walletConnectStatus = (0, exports.resetWalletConnectStatus)(this.id());
                walletConnectStatus.walletConnect = 'connect';
                walletConnectStatus.walletName = this.id();
                walletConnectStatus.walletAddress = connectInfo.account;
                walletConnectStatus.network = chainInfo.chainType;
                this.callBack.statusUpdate(walletConnectStatus);
            }
            else {
                this.callBack.loading(true);
                await walletConnect.switchNetwork(chainInfo.chainId);
                this.callBack.loading(false);
            }
        }
        catch (e) {
            service_1.Trace.error(e);
            this.disconnect(e.message);
        }
    }
    disconnect(error) {
        this.callBack.statusUpdate({
            ...(0, exports.resetWalletConnectStatus)(this.id()),
            walletConnect: 'unlink',
            error,
        });
        WalletConnect_1.ConnectManager.disConnect();
    }
}
exports.AbstractBaseWallet = AbstractBaseWallet;
