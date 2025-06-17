"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultServiceMath = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class VaultServiceMath {
    static getVaultValue(token, amount, price) {
        let value;
        if (token.decimals != 10) {
            // value = ((amount * 1e10) * price) / (10 ** decimals);
            value = new bignumber_js_1.default(amount).multipliedBy(1e10).multipliedBy(price).dividedBy(10 ** token.decimals).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        else {
            // value = amount * price;
            value = new bignumber_js_1.default(amount).multipliedBy(price).toFixed(0, bignumber_js_1.default.ROUND_DOWN);
        }
        return value;
    }
}
exports.VaultServiceMath = VaultServiceMath;
