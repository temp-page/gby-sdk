"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeEventBus = exports.TradeEventBus = void 0;
const wallet_1 = require("../../../wallet");
class TradeEventBus extends wallet_1.EventBus {
    emitAll(eventName, data) {
        super.emit(`${eventName}`, data);
        for (let i = 1; i <= 20; i++) {
            super.emit(`${eventName}_${i}`, data);
        }
    }
    removeAll(eventName) {
        super.resetOff(`${eventName}`);
        for (let i = 1; i <= 20; i++) {
            super.resetOff(`${eventName}_${i}`);
        }
    }
}
exports.TradeEventBus = TradeEventBus;
TradeEventBus.TOPIC_PRE_OPEN_POSITION = "preOpenPosition";
TradeEventBus.TOPIC_PAIR_PRICE = "pairPrice";
TradeEventBus.TOPIC_ALL_PRICE = "allPrice";
TradeEventBus.TOPIC_KLINE = "pairKline";
TradeEventBus.TOPIC_POSITIONS = "TOPIC_POSITIONS";
TradeEventBus.SYS_TOPIC_TICKS_UPDATE = "SYS_TOPIC_TICKS_UPDATE";
TradeEventBus.SYS_TOPIC_TICK_DATA_UPDATE = "SYS_TOPIC_TICK_DATA_UPDATE";
TradeEventBus.SYS_TOPIC_POSITIONS = "SYS_TOPIC_POSITIONS";
exports.tradeEventBus = new TradeEventBus();
