import type WS from 'ws';
export declare class ServiceWs {
    ws: WS;
    type: string;
    private send;
    private error;
    private open;
    private close;
    private terminate;
    private onMessage;
    connect(): void;
    disconnect(): void;
}
export declare const serviceWs: ServiceWs;
