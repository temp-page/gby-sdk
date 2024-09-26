"use strict";
// 价格数据
// 个人数量数据
// 统计类数值
// BTCUSD
// 保留2位小数，如60000.00
// 保留4位小数，如0.0774
// 保留1位小数
// ETHUSD
// 保留2位小数，如4000.00
// 保留2位小数，如0.0774
// 保留1位小数
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecision = exports.PrecisionConfig = void 0;
exports.PrecisionConfig = {
    "BTC": {
        price: 2,
        personal: 4,
        statistics: 1
    },
    "ETH": {
        price: 2,
        personal: 4,
        statistics: 1
    },
    "ALP": {
        price: 2,
        personal: 2,
        statistics: 1
    },
    "EURFX": {
        price: 4,
        personal: 4,
        statistics: 4
    },
    "MNT": {
        price: 6,
        personal: 4,
        statistics: 4
    },
    default: {
        price: 2,
        personal: 4,
        statistics: 1
    }
};
const getPrecision = (symbol = 'default') => {
    return exports.PrecisionConfig[symbol] || exports.PrecisionConfig.default;
};
exports.getPrecision = getPrecision;
