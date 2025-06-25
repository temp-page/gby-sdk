"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAddress = void 0;
const Constant_1 = require("../Constant");
const WalletConnect_1 = require("../WalletConnect");
const service_1 = require("../service");
const address_json_1 = __importDefault(require("./address.json"));
function initAddress(ENV) {
    if (ENV === 'prod' || ENV === 'prod_node') {
        const maintle = {
            chainId: 43111,
            chainName: 'Hemi',
            scan: 'https://explorer.hemi.xyz',
            rpc: 'https://rpc.hemi.network/rpc/',
            multicall: "0x823873487984b1757C5899e2aed3cb50C5DC45a2",
            chainType: service_1.ChainType.hemi,
            "USDC": address_json_1.default.USDC["43111"],
            "USDT": address_json_1.default.USDT["43111"],
            "GLP": address_json_1.default.ALP["43111"],
            "GBU": address_json_1.default.AgniPerp["43111"],
            Pyth: "0x2880aB155794e7179c9eE2e38200202908C17B43",
            tradeReward: "",
            chainToken: "ETH",
            txBaseConfig: {
            // gasPrice: "20000000",
            }
        };
        const addressInfo = new service_1.AddressInfo([maintle]);
        addressInfo.baseApiUrl = "https://perpstreet.xyz";
        addressInfo.wsUrl = addressInfo.baseApiUrl + "/prep_api/ws";
        addressInfo.graphUrl = addressInfo.baseApiUrl + "/graph/subgraphs/name";
        addressInfo.env = ENV;
        (0, Constant_1.updateCurrentAddressInfo)(addressInfo);
        WalletConnect_1.ConnectManager.chainMap[service_1.ChainType.hemi] = [
            {
                chainId: '0xA867',
                chainName: 'Hemi',
                nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc.hemi.network/rpc'],
                blockExplorerUrls: ['https://explorer.hemi.xyz/'],
            },
        ];
    }
    else if (ENV == 'test') {
        const maintle = {
            chainId: 743111,
            chainName: 'Hemi Sepolia',
            scan: 'https://testnet.explorer.hemi.xyz',
            rpc: 'https://testnet.rpc.hemi.network/rpc',
            multicall: "0x3116B07D1a70B14a2bFC2706528d037d47a4636d",
            chainType: service_1.ChainType.hemi,
            "USDC": address_json_1.default.USDC["743111"],
            "USDT": address_json_1.default.USDT["743111"],
            "GLP": address_json_1.default.ALP["743111"],
            "GBU": address_json_1.default.AgniPerp["743111"],
            Pyth: "0x2880aB155794e7179c9eE2e38200202908C17B43",
            tradeReward: "0x67EAcd7055c636552995d72874BB9344454B3F20",
            chainToken: "ETH",
            txBaseConfig: {
            // gasPrice: "20000000",
            }
        };
        const addressInfo = new service_1.AddressInfo([maintle]);
        addressInfo.baseApiUrl = "https://testnet.perpstreet.xyz";
        addressInfo.wsUrl = addressInfo.baseApiUrl + "/prep_api/ws";
        addressInfo.graphUrl = addressInfo.baseApiUrl + "/graph/subgraphs/name";
        addressInfo.env = ENV;
        (0, Constant_1.updateCurrentAddressInfo)(addressInfo);
        WalletConnect_1.ConnectManager.chainMap[service_1.ChainType.hemi] = [
            {
                chainId: '0xb56c7',
                chainName: 'Hemi Sepolia',
                nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc.hemi.network/rpc'],
                blockExplorerUrls: ['https://explorer.hemi.xyz/'],
            },
        ];
    }
    else {
        throw new Error(`${ENV} is not support`);
    }
    service_1.Trace.debug('address config init', ENV);
}
exports.initAddress = initAddress;
