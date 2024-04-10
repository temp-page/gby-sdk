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
    if (ENV === 'test') {
        const maintle = {
            chainId: 5003,
            chainName: 'Mantle Testnet',
            scan: 'https://explorer.sepolia.mantle.xyz',
            rpc: 'https://rpc.sepolia.mantle.xyz/',
            multicall: "0x521751C88EafdCAEd9cAbb4dB35a1400D6933428",
            chainType: service_1.ChainType.mantle,
            "USDC": address_json_1.default.USDC["5003"],
            "USDT": address_json_1.default.USDT["5003"],
            "GLP": address_json_1.default.ALP["5003"],
            "GBU": address_json_1.default.AgniPerp["5003"],
            Pyth: "0x98046Bd286715D3B0BC227Dd7a956b83D8978603",
            chainToken: "MNT",
        };
        const addressInfo = new service_1.AddressInfo([maintle]);
        addressInfo.baseApiUrl = "https://testnet.agni.finance";
        addressInfo.env = ENV;
        (0, Constant_1.updateCurrentAddressInfo)(addressInfo);
        WalletConnect_1.ConnectManager.chainMap['Mantle Testnet'] = [
            {
                chainId: '0x138b',
                chainName: 'Mantle Testnet',
                nativeCurrency: {
                    name: 'MNT',
                    symbol: 'MNT',
                    decimals: 18,
                },
                rpcUrls: ['https://rpc.testnet.mantle.xyz'],
                blockExplorerUrls: ['https://explorer.testnet.mantle.xyz/'],
            },
        ];
    }
    else if (ENV === 'prod' || ENV === 'prod_node') {
        throw new Error(`${ENV} is not support`);
    }
    else {
        throw new Error(`${ENV} is not support`);
    }
    service_1.Trace.debug('address config init', ENV);
}
exports.initAddress = initAddress;
