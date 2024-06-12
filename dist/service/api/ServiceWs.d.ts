import WebSocket from 'ws';
export declare class ServiceWs {
    ws: WebSocket;
    connect(): void;
    disconnect(): void;
}
export declare const serviceWs: ServiceWs;
