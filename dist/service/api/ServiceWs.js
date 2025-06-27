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
        tool_1.Trace.error(m);
    }
    open() {
        tool_1.Trace.log('Connected to server');
        this.send({
            "method": "subscribe.ticks.all",
            "params": [],
            "id": 0
        });
    }
    close(currentWs) {
        tool_1.Trace.log('disconnected', currentWs.isClose);
        if (!currentWs.isClose) {
            (0, tool_1.sleep)(2000).then(() => {
                exports.serviceWs.connect();
            });
        }
    }
    terminate() {
        console.log('terminate');
        this.ws.isClose = true;
        try {
            if (this.type === 'node') {
                this.ws.terminate();
            }
            else {
                this.ws.close();
            }
        }
        catch (e) {
            tool_1.Trace.error('WebSocket terminate error: %s', e);
        }
    }
    onMessage(message) {
        tool_1.Trace.log('received: %s', message);
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
            this.terminate();
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
                this.close(ws);
            };
            ws.onmessage = (message) => {
                this.onMessage(message.data);
            };
            this.type = 'web';
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
                this.close(ws);
            });
            ws.on('message', (message) => {
                this.onMessage(message);
            });
            this.type = 'node';
        }
        this.ws = ws;
    }
    disconnect() {
        if (this.ws) {
            this.terminate();
        }
    }
}
exports.ServiceWs = ServiceWs;
exports.serviceWs = new ServiceWs();
