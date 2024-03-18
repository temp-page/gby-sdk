export declare class StorageProvider {
    type: 'web' | 'node';
    constructor();
    get(key: string): string;
    getArray(key: string): any[];
    getObj(key: string): any;
    set(key: string, value: string): void;
    setJson(key: string, value: any): void;
    clearKey(key: string): void;
    clear(): void;
}
export declare const storageProvider: StorageProvider;
