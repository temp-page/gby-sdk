"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPServiceMath = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class LPServiceMath {
    static getGlpPrice(vaultValue, glpAmount) {
        if (new bignumber_js_1.default(vaultValue).eq(0) || new bignumber_js_1.default(glpAmount).eq(0)) {
            return new bignumber_js_1.default(100000000).toFixed(0);
        }
        else {
            return new bignumber_js_1.default(vaultValue).multipliedBy(1e8).dividedBy(new bignumber_js_1.default(glpAmount)).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
    }
    static getGlpFeePoint(value, vaultValue, tokenValueInVault, isMint, token, tokenTargetWeights) {
        if (token.isDynamicFee == false) {
            return isMint ? parseInt(token.feeBasisPoints) : parseInt(token.taxBasisPoints);
        }
        const lpUPnL = "0";
        const tokenlpUPnL = "0";
        const vaultNetValue = new bignumber_js_1.default(vaultValue).plus(lpUPnL);
        if (vaultNetValue.lt(0)) {
            throw new Error("LP balance is insufficient");
        }
        const tokenNetValueInVault = new bignumber_js_1.default(tokenValueInVault).plus(tokenlpUPnL);
        const targetValue = vaultNetValue.multipliedBy(tokenTargetWeights).dividedBy(1e4).dp(0, bignumber_js_1.default.ROUND_DOWN);
        let postValue;
        if (isMint) {
            postValue = tokenNetValueInVault.plus(value);
        }
        else {
            postValue = tokenNetValueInVault.minus(value);
        }
        const preDiff = tokenNetValueInVault.gt(targetValue) ? tokenNetValueInVault.minus(targetValue) : targetValue.minus(tokenNetValueInVault);
        const postDiff = postValue.gt(targetValue) ? postValue.minus(targetValue) : targetValue.minus(postValue);
        if (postDiff.lt(preDiff)) {
            const feeAdjust = new bignumber_js_1.default(token.taxBasisPoints).multipliedBy(preDiff).dividedBy(targetValue).dp(0, bignumber_js_1.default.ROUND_DOWN);
            if (new bignumber_js_1.default(token.feeBasisPoints).gt(feeAdjust)) {
                return new bignumber_js_1.default(token.feeBasisPoints).minus(feeAdjust).toNumber();
            }
            else {
                return 0;
            }
        }
        else {
            const avgDiff = preDiff.plus(postDiff).dividedBy(2).dp(0, bignumber_js_1.default.ROUND_DOWN);
            let feeAdjust;
            if (avgDiff.gt(targetValue)) {
                feeAdjust = token.taxBasisPoints;
            }
            else {
                feeAdjust = new bignumber_js_1.default(token.taxBasisPoints).multipliedBy(avgDiff).dividedBy(targetValue).dp(0, bignumber_js_1.default.ROUND_DOWN);
            }
            return new bignumber_js_1.default(token.feeBasisPoints).plus(feeAdjust).toNumber();
        }
    }
}
exports.LPServiceMath = LPServiceMath;
