"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAddress = void 0;
const Constant_1 = require("../Constant");
const WalletConnect_1 = require("../WalletConnect");
const service_1 = require("../service");
function initAddress(ENV) {
    if (ENV === 'test') {
        const maintle = {
            chainId: 5003,
            chainName: 'Mantle Testnet',
            scan: 'https://explorer.sepolia.mantle.xyz',
            rpc: 'https://rpc.sepolia.mantle.xyz/',
            multicall: "0x521751C88EafdCAEd9cAbb4dB35a1400D6933428",
            chainType: service_1.ChainType.mantle,
            "USDC": "0xF99BE30A9952b225E6Ba984daC660ca57fB7be4E",
            "USDT": "0x49a93fC43fAEe19c1f43569b9956c66f1a9cDb8B",
            "GLP": "0xc0b2c64FB74A9DAbE91034EEfCFcf310eFe32B08",
            "GBU": "0x5e02B2D58EC935F2b891208cB6428BF221A3C738",
            chainToken: "MNT",
            dataFeeds: ["USDT", "USDC", "ETH", "BTC"]
        };
        const blast = {
            chainId: 168587773,
            chainName: 'Blast Sepolia Testnet',
            scan: 'https://testnet.blastscan.io',
            rpc: 'https://sepolia.blast.io',
            multicall: "0x373f3fdfb285Ae566246bE1BD524fD00819EEc52",
            chainType: service_1.ChainType.blast,
            "USDC": "0xA4e78768E3626f89999583664Ed9245F19ff76Aa",
            "USDT": "0x4a9963b2cD4443dFF540aAeC226dDb1D408E84a9",
            "GLP": "0xCa7907357E565509D768642882813e34821ccbEa",
            "GBU": "0x0f4E4959F2b0E6EF57fC7D27D1bf908c18869981",
            chainToken: "ETH",
            dataFeeds: ["USDT", "USDC", "ETH", "BTC"]
        };
        const addressInfo = new service_1.AddressInfo([maintle, blast]);
        addressInfo.baseApiUrl = "https://testnet.godblastyou.xyz";
        (0, Constant_1.updateCurrentAddressInfo)(addressInfo);
        WalletConnect_1.ConnectManager.chainMap['Blast Sepolia Testnet'] = [
            {
                chainId: '0xa0c71fd',
                chainName: 'Blast Sepolia Testnet',
                nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://blast-sepolia.blockpi.network/v1/rpc/public'],
                blockExplorerUrls: ['https://testnet.blastscan.io'],
            },
        ];
        WalletConnect_1.ConnectManager.chainMap['Mantle Testnet'] = [
            {
                chainId: '0x1389',
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
    }
    else {
        throw new Error(`${ENV} is not support`);
    }
    service_1.Trace.debug('address config init', ENV);
}
exports.initAddress = initAddress;
