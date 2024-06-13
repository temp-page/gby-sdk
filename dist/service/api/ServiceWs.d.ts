import type WS from 'ws';
export declare class ServiceWs {
    ws: WS;
    private send;
    private error;
    private open;
    private close;
    private onMessage;
    connect(): void;
    disconnect(): void;
}
export declare const serviceWs: ServiceWs;
