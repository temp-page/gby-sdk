"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceWs = exports.ServiceWs = void 0;
const BaseApi_1 = require("./base/BaseApi");
const tool_1 = require("../tool");
const ws_1 = __importDefault(require("ws"));
class ServiceWs {
    connect() {
        if (this.ws) {
            this.ws.isClose = true;
            this.ws.terminate();
        }
        const url = BaseApi_1.BASE_API.address().wsUrl;
        const ws = new ws_1.default(url);
        const send = (data) => {
            ws.send(JSON.stringify(data));
        };
        ws.on('open', () => {
            console.log('Connected to server');
            send({
                "method": "subscribe.ticks.all",
                "params": [],
                "id": 0
            });
        });
        ws.on('error', console.error);
        ws.on('close', () => {
            console.log('disconnected');
            if (!this.ws.isClose) {
                (0, tool_1.sleep)(2000).then(() => {
                    exports.serviceWs.connect();
                });
            }
        });
        ws.on('message', (message) => {
            console.log('received: %s', message);
            const wsMessage = JSON.parse(message);
            if (wsMessage.method === 'ping') {
                send({
                    method: 'pong',
                    id: Math.floor(Math.random() * 1000000)
                });
            }
            if (wsMessage.method === 'subscribe.ticks.all.response') {
                tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.SYS_TOPIC_TICK_DATA_UPDATE, wsMessage.result);
            }
        });
        this.ws = ws;
    }
    disconnect() {
        if (this.ws) {
            this.ws.isClose = true;
            this.ws.terminate();
        }
    }
}
exports.ServiceWs = ServiceWs;
exports.serviceWs = new ServiceWs();
