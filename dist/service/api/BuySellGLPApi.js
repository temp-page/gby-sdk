"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuySellGLPApi = void 0;
const tool_1 = require("../tool");
const vo_1 = require("../vo");
const ApiProvider_1 = require("./provider/ApiProvider");
const BaseApi_1 = require("./base/BaseApi");
const abi_1 = require("../abi");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
let BuySellGLPApi = class BuySellGLPApi {
    async lpBalance(chainType, account = tool_1.INVALID_ADDRESS) {
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const glpToken = (await ApiProvider_1.apiProvider.tokenApi().getTokenByContract(chainInfo, [chainInfo.GLP]))[0];
        return (await connectInfo.erc20().batchGetBalanceInfo(account, [glpToken]))[glpToken.address];
    }
    async tokens(chainType, account = undefined) {
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const glpContract = connectInfo.create(abi_1.ERC20Contract, chainInfo.GLP);
        const vaultServiceContract = connectInfo.create(abi_1.VaultServiceContract);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [glp, ...tokenConfigs] = await connectInfo.multiCall().callObj({
            totalSupply: glpContract.multicall_totalSupply(),
            decimals: glpContract.multicall_decimals(),
        }, ...vaultTokens.map(it => {
            return {
                price: pythApi.priceBySymbol(it.token.symbol),
                tokenConfig: vaultServiceContract.multicall_getTokenConfig(it.address),
                tokenAmount: vaultServiceContract.multicall_getTokenAmount(it.address),
            };
        }));
        let balances = undefined;
        if (account) {
            balances = await connectInfo.erc20().batchGetBalanceInfo(account, vaultTokens.map(it => it.token));
        }
        return vaultTokens.map((it, index) => {
            let feeBasisPoints = "0";
            let taxBasisPoints = "0";
            {
                const vaultTokenIndex = index;
                const tokenPrice = tokenConfigs[vaultTokenIndex].price;
                const vaultValue = vaultTokens.map((it, index) => {
                    const tokenPrice = tokenConfigs[index].price;
                    const tokenAmount = tokenConfigs[index].tokenAmount;
                    return abi_1.VaultServiceContract.getVaultValue(it.token, tokenAmount, tokenPrice);
                }).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(0), "0");
                const inputValue = new bignumber_js_1.default("1").multipliedBy(10 ** it.token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
                const tokenValue = abi_1.VaultServiceContract.getVaultValue(it.token, inputValue, tokenPrice);
                const tokenValueInVault = abi_1.VaultServiceContract.getVaultValue(it.token, tokenConfigs[vaultTokenIndex].tokenAmount, tokenPrice);
                const feePoint = abi_1.LPServiceContract.getGlpFeePoint(tokenValue, vaultValue, tokenValueInVault, true, tokenConfigs[vaultTokenIndex].tokenConfig, vaultTokens[vaultTokenIndex].weight);
                feeBasisPoints = new bignumber_js_1.default(feePoint).div(1e4).multipliedBy("100").toFixed();
            }
            {
                const vaultTokenIndex = index;
                const tokenPrice = tokenConfigs[vaultTokenIndex].price;
                const vaultValue = vaultTokens.map((it, index) => {
                    const tokenPrice = tokenConfigs[index].price;
                    const tokenAmount = tokenConfigs[index].tokenAmount;
                    return abi_1.VaultServiceContract.getVaultValue(it.token, tokenAmount, tokenPrice);
                }).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(0), "0");
                const amountGLP = new bignumber_js_1.default("1").multipliedBy(10 ** parseInt(glp.decimals)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
                const alpPrice = abi_1.LPServiceContract.getGlpPrice(vaultValue, glp.totalSupply);
                const valueGLP = new bignumber_js_1.default(amountGLP).multipliedBy(alpPrice).div(1e8).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
                const tokenValueInVault = abi_1.VaultServiceContract.getVaultValue(it.token, tokenConfigs[vaultTokenIndex].tokenAmount, tokenPrice);
                const feePoint = abi_1.LPServiceContract.getGlpFeePoint(valueGLP, vaultValue, tokenValueInVault, false, tokenConfigs[vaultTokenIndex].tokenConfig, vaultTokens[vaultTokenIndex].weight);
                taxBasisPoints = new bignumber_js_1.default(feePoint).div(1e4).multipliedBy("100").toFixed();
            }
            if (balances === undefined) {
                return vo_1.BuySellTokenBalance.unavailableData(it.token, feeBasisPoints, taxBasisPoints);
            }
            const balance = balances[it.token.address];
            return vo_1.BuySellTokenBalance.availableData(balance, feeBasisPoints, taxBasisPoints);
        });
    }
    async buyInfo(chainType, token, account = tool_1.INVALID_ADDRESS) {
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const balance = (await connectInfo.erc20().batchGetBalanceAndAllowance(account, chainInfo.GBU, [token]))[token.address];
        const glpContract = connectInfo.create(abi_1.ERC20Contract, chainInfo.GLP);
        const vaultServiceContract = connectInfo.create(abi_1.VaultServiceContract);
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [glp, ...prices] = await connectInfo.multiCall().callObj({
            totalSupply: glpContract.multicall_totalSupply(),
            decimals: glpContract.multicall_decimals(),
            balance: glpContract.multicall_balanceOf(account ? account : tool_1.INVALID_ADDRESS),
        }, ...vaultTokens.map(it => {
            return {
                price: pythApi.priceBySymbol(it.token.symbol),
                tokenAmount: vaultServiceContract.multicall_getTokenAmount(it.address),
                tokenConfig: vaultServiceContract.multicall_getTokenConfig(it.address)
            };
        }));
        const preBuy = async (inputAmount, fee = true) => {
            const vaultTokenIndex = vaultTokens.findIndex(it => it.token.address === token.address);
            const tokenPrice = prices[vaultTokenIndex].price;
            const vaultValue = vaultTokens.map((it, index) => {
                const tokenPrice = prices[index].price;
                const tokenAmount = prices[index].tokenAmount;
                return abi_1.VaultServiceContract.getVaultValue(it.token, tokenAmount, tokenPrice);
            }).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(0), "0");
            const inputValue = new bignumber_js_1.default(inputAmount).multipliedBy(10 ** token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const tokenValue = abi_1.VaultServiceContract.getVaultValue(token, inputValue, tokenPrice);
            const tokenValueInVault = abi_1.VaultServiceContract.getVaultValue(token, prices[vaultTokenIndex].tokenAmount, tokenPrice);
            const feePoint = fee ? abi_1.LPServiceContract.getGlpFeePoint(tokenValue, vaultValue, tokenValueInVault, true, prices[vaultTokenIndex].tokenConfig, vaultTokens[vaultTokenIndex].weight) : 0;
            // TODO not impl
            const apy = "10%";
            const tokenValueAfterFee = new bignumber_js_1.default(tokenValue).multipliedBy(1e4 - feePoint).div(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const alpPrice = abi_1.LPServiceContract.getGlpPrice(vaultValue, glp.totalSupply);
            const alpAmount = new bignumber_js_1.default(alpPrice).lte("0") ? "0" : new bignumber_js_1.default(tokenValueAfterFee).multipliedBy(1e8).div(alpPrice).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const feeAmount = new bignumber_js_1.default(inputValue).multipliedBy(feePoint).div(1e4).dp(0, bignumber_js_1.default.ROUND_DOWN).div(10 ** token.decimals).toFixed();
            const preBuyGLPInfo = {
                feePercent: new bignumber_js_1.default(feePoint).div(1e4).multipliedBy(100).toFixed(),
                youWillGet: new bignumber_js_1.default(alpAmount).div(10 ** parseInt(glp.decimals, 10)).toFixed(),
                feeAmount,
                apy: apy
            };
            return preBuyGLPInfo;
        };
        const buy = async (inputAmount, connectInfo) => {
            const preBuyGLPInfo = await preBuy(inputAmount);
            const vaultToken = vaultTokens.find(it => it.token.address === token.address);
            const inputValue = new bignumber_js_1.default(inputAmount).multipliedBy(10 ** token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const min = new bignumber_js_1.default(preBuyGLPInfo.youWillGet).multipliedBy(10 ** parseInt(glp.decimals, 10)).multipliedBy(0.99).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const priceFeedsUpdateData = await ApiProvider_1.apiProvider.pythApi().priceFeedsUpdateDataByTokens(vaultTokens.map(it => it.token.symbol));
            return await connectInfo.create(abi_1.LPServiceContract).mintALP(vaultToken.assetID, inputValue, min, priceFeedsUpdateData);
        };
        const preBuyGLPInfo = await preBuy("1", false);
        const glpPrice = preBuyGLPInfo.youWillGet;
        const buyGLPInfo = {
            preBuy,
            buy,
            price: glpPrice,
            priceInvert: new bignumber_js_1.default("1").div(glpPrice).toFixed(),
            balance,
            glpBalance: new bignumber_js_1.default(glp.balance).div(10 ** parseInt(glp.decimals, 10)).toFixed()
        };
        return buyGLPInfo;
    }
    async sellInfo(chainType, token, account = tool_1.INVALID_ADDRESS) {
        const vaultTokens = await ApiProvider_1.apiProvider.tokenApi().vaultTokenList(chainType);
        const addressInfo = BaseApi_1.BASE_API.address();
        const chainInfo = addressInfo.getChainInfo(chainType);
        const connectInfo = BaseApi_1.BASE_API.connectInfo(chainInfo);
        const glpToken = (await ApiProvider_1.apiProvider.tokenApi().getTokenByContract(chainInfo, [chainInfo.GLP]))[0];
        const balanceAndAllowances = await connectInfo.erc20().batchGetBalanceAndAllowance(account, chainInfo.GBU, [glpToken, token]);
        const glpBalance = balanceAndAllowances[glpToken.address];
        const tokenBalance = balanceAndAllowances[token.address];
        const glpContract = connectInfo.create(abi_1.ERC20Contract, chainInfo.GLP);
        const vaultServiceContract = connectInfo.create(abi_1.VaultServiceContract);
        const lpServiceContract = connectInfo.create(abi_1.LPServiceContract);
        const multiCallContract = connectInfo.multiCall();
        const pythApi = await ApiProvider_1.apiProvider.pythApi().initPriceIds(chainType);
        const [glp, ...prices] = await connectInfo.multiCall().callObj({
            totalSupply: glpContract.multicall_totalSupply(),
            decimals: glpContract.multicall_decimals(),
            blockTime: multiCallContract.multicall_getCurrentBlockTimestamp(),
            accountLatestMintTime: lpServiceContract.multicall_getAccountLatestMintTime(account),
            coolingDuration: lpServiceContract.multicall_getCoolingDuration(),
        }, ...vaultTokens.map(it => {
            return {
                price: pythApi.priceBySymbol(it.token.symbol),
                tokenAmount: vaultServiceContract.multicall_getTokenAmount(it.address),
                tokenConfig: vaultServiceContract.multicall_getTokenConfig(it.address)
            };
        }));
        const preSell = async (inputAmount = "0", fee = true) => {
            const vaultTokenIndex = vaultTokens.findIndex(it => it.token.address === token.address);
            const tokenPrice = prices[vaultTokenIndex].price;
            const vaultValue = vaultTokens.map((it, index) => {
                const tokenPrice = prices[index].price;
                const tokenAmount = prices[index].tokenAmount;
                return abi_1.VaultServiceContract.getVaultValue(it.token, tokenAmount, tokenPrice);
            }).reduce((a, b) => new bignumber_js_1.default(a).plus(b).toFixed(0), "0");
            const amountGLP = new bignumber_js_1.default(inputAmount).multipliedBy(10 ** glpToken.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const alpPrice = abi_1.LPServiceContract.getGlpPrice(vaultValue, glp.totalSupply);
            const valueGLP = new bignumber_js_1.default(amountGLP).multipliedBy(alpPrice).div(1e8).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const tokenValueInVault = abi_1.VaultServiceContract.getVaultValue(token, prices[vaultTokenIndex].tokenAmount, tokenPrice);
            const feePoint = fee ? abi_1.LPServiceContract.getGlpFeePoint(valueGLP, vaultValue, tokenValueInVault, false, prices[vaultTokenIndex].tokenConfig, vaultTokens[vaultTokenIndex].weight) : 0;
            const valueAfterFee = new bignumber_js_1.default(valueGLP).multipliedBy(1e4 - feePoint).div(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const decimals = token.decimals;
            const tokenAmount = new bignumber_js_1.default(valueAfterFee).multipliedBy(10 ** decimals).div(tokenPrice).dp(0, bignumber_js_1.default.ROUND_DOWN).div(1e10).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const feeValue = new bignumber_js_1.default(valueGLP).multipliedBy(feePoint).div(1e4).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const feeAmount = new bignumber_js_1.default(feeValue).multipliedBy(10 ** decimals).div(tokenPrice).dp(0, bignumber_js_1.default.ROUND_DOWN).div(1e10).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const preSellGLPInfo = {
                feePercent: new bignumber_js_1.default(feePoint).div(1e4).multipliedBy(100).toFixed(),
                youWillGet: new bignumber_js_1.default(tokenAmount).div(10 ** token.decimals).toFixed(),
                feeAmount: new bignumber_js_1.default(feeAmount).div(10 ** token.decimals).toFixed(),
            };
            return preSellGLPInfo;
        };
        const sell = async (inputAmount, connectInfo) => {
            const preBuyGLPInfo = await preSell(inputAmount);
            const vaultToken = vaultTokens.find(it => it.token.address === token.address);
            const inputValue = new bignumber_js_1.default(inputAmount).multipliedBy(10 ** glpToken.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const min = new bignumber_js_1.default(preBuyGLPInfo.youWillGet).multipliedBy(10 ** token.decimals).multipliedBy(0.99).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
            const priceFeedsUpdateData = await ApiProvider_1.apiProvider.pythApi().priceFeedsUpdateDataByTokens(vaultTokens.map(it => it.token.symbol));
            return await connectInfo.create(abi_1.LPServiceContract).burnALP(vaultToken.assetID, inputValue, min, priceFeedsUpdateData);
        };
        const preSellGLPInfo = await preSell("1", false);
        const glpPrice = preSellGLPInfo.youWillGet;
        const countDown = bignumber_js_1.default.max("0", new bignumber_js_1.default(glp.accountLatestMintTime).plus(glp.coolingDuration).minus(glp.blockTime)).toNumber();
        // todo not impl
        const stakeGLP = "10";
        const sellGLPInfo = {
            preSell,
            sell,
            price: new bignumber_js_1.default("1").div(glpPrice).toFixed(),
            priceInvert: glpPrice,
            balance: glpBalance,
            tokenBalance: tokenBalance.balance,
            countDown,
            stakeGLP
        };
        return sellGLPInfo;
    }
};
exports.BuySellGLPApi = BuySellGLPApi;
exports.BuySellGLPApi = BuySellGLPApi = __decorate([
    (0, tool_1.CacheKey)('BuySellGLPApi')
], BuySellGLPApi);
