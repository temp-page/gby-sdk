"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceWs = exports.ServiceWs = void 0;
const BaseApi_1 = require("./base/BaseApi");
const tool_1 = require("../tool");
class ServiceWs {
    send(data) {
        if (this.ws) {
            this.ws.send(JSON.stringify(data));
        }
    }
    error(m) {
        console.error(m);
    }
    open() {
        console.log('Connected to server');
        this.send({
            "method": "subscribe.ticks.all",
            "params": [],
            "id": 0
        });
    }
    close() {
        console.log('disconnected');
        if (!this.ws.isClose) {
            (0, tool_1.sleep)(2000).then(() => {
                exports.serviceWs.connect();
            });
        }
    }
    onMessage(message) {
        console.log('received: %s', message);
        const wsMessage = JSON.parse(message);
        if (wsMessage.method === 'ping') {
            this.send({
                method: 'pong',
                id: Math.floor(Math.random() * 1000000)
            });
        }
        if (wsMessage.method === 'subscribe.ticks.all.response') {
            tool_1.tradeEventBus.emitAll(tool_1.TradeEventBus.SYS_TOPIC_TICK_DATA_UPDATE, wsMessage.result);
        }
    }
    connect() {
        if (this.ws) {
            this.ws.isClose = true;
            this.ws.terminate();
        }
        const url = BaseApi_1.BASE_API.address().wsUrl;
        let ws = undefined;
        if (typeof window !== 'undefined' && 'WebSocket' in window) {
            ws = new window.WebSocket(url);
            ws.onopen = () => {
                this.open();
            };
            ws.onerror = (e) => {
                this.error(e);
            };
            ws.onclose = () => {
                this.close();
            };
            ws.onmessage = (message) => {
                this.onMessage(message.data);
            };
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const WebSocket = require('ws');
            ws = new WebSocket(url);
            ws.on('open', () => {
                this.open();
            });
            ws.on('error', (e) => {
                this.error(e);
            });
            ws.on('close', () => {
                this.close();
            });
            ws.on('message', (message) => {
                this.onMessage(message);
            });
        }
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
