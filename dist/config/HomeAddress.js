"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAddress = void 0;
const Constant_1 = require("../Constant");
const WalletConnect_1 = require("../WalletConnect");
const service_1 = require("../service");
function initAddress(ENV) {
    if (ENV === 'test') {
        const maintle = {
            chainId: 5001,
            chainName: 'Mantle Testnet',
            scan: 'https://explorer.testnet.mantle.xyz',
            rpc: 'https://rpc.testnet.mantle.xyz',
            multicall: "0xcb77b6BED230d16Bd4C7896AfC51390ec9e9b9cD",
            chainType: service_1.ChainType.mantle,
            "USDC": "0x9f110230b925cC995d492672ab971aADCeD4295e",
            "USDT": "0xEa707245498BCeF15527f8dc62513D2B4a7CA675",
            "GLP": "0xD55E4A5FD2758829D3BeF1F2e46A74A11492d449",
            "ServiceService": "0x4adD798e85aAFd3921b5B2d2B395E13035691258",
            "GBU": "0x5f39b532718c0Cff63638C080C2CADCE1aF81E53",
            "RoleService": "0x547097bcd2237e7C810dF2D9b99b645d5f740b0B",
            "VaultService": "0x1cf6D908aAC7190Ed0BCF4FB6fF6a5f3Ac7b1B98",
            "PriceService": "0xe7eedd0316DB45fc11FcBD4A0B61E65eF2fFcAB2",
            "LpService": "0xB51CEBE06C76aDfAC5B3679bC43b168A1a027b8A",
            "Portal": "0x2f9d8f7D30338c38Abc958660cE065Bd4Ca61504",
            "TargetService": "0x3AE04AFb1191F89Fc8614402Cf5d2ec71A666f18",
            "MarketTradeServices": "0x98F5aC378A1D7B69DB0ac7de27CA117e37b43ee3",
            PositionService: "0x0938e7f5737574Ecd3AF395794Dd21318754Fd59",
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
            "ServiceService": "0x9E656bF831D41e7D57154eb95c591035A8ba1545",
            "GBU": "0x0f4E4959F2b0E6EF57fC7D27D1bf908c18869981",
            "RoleService": "0xccC4f2bffb355D536a08B2b3F2D44D0AA8F185bc",
            "VaultService": "0x69Df84Ca4DdfF8c48CaE245938128A891dd82115",
            "PriceService": "0x79c704ab6D56e3BB3B0623FD687030bE54E240FD",
            "LpService": "0x99fFEef6BA07e9060c73ED84ae6E2ABc6DB74411",
            "Portal": "0x58257211E89a1549B605433F640bdE81Fa9d8f90",
            "TargetService": "0xdFDDA5Cc69b7246B477E64FC345783014a1aeA88",
            "MarketTradeServices": "0x121459918f358425a6593A944ac95b8883D2CB9F",
            "PositionService": "0xC1A28e19aad6994d751CDaCa421fD1A23432B153",
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
