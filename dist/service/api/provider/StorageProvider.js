"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageProvider = exports.StorageProvider = void 0;
const tool_1 = require("../../tool");
let data = {};
class StorageProvider {
    constructor() {
        if (typeof localStorage !== 'undefined') {
            this.type = 'web';
        }
        else {
            this.type = 'node';
        }
        tool_1.Trace.debug('StorageProvider.constructor', this.type);
    }
    get(key) {
        switch (this.type) {
            case 'web':
                return localStorage.getItem(key) || '';
            case 'node':
                return data[key] || '';
        }
        return '';
    }
    getArray(key) {
        const str = this.get(key);
        let dataList;
        if (str) {
            try {
                const data = JSON.parse(str);
                if (Array.isArray(data))
                    dataList = data;
            }
            catch (e) {
                tool_1.Trace.debug('StorageProvider.getArray', e);
            }
        }
        return dataList;
    }
    getObj(key) {
        const str = this.get(key);
        let result = null;
        if (str) {
            try {
                const data = JSON.parse(str);
                if (!Array.isArray(data))
                    result = data;
            }
            catch (e) {
                tool_1.Trace.debug('StorageProvider.getObj', e);
            }
        }
        return result;
    }
    set(key, value) {
        switch (this.type) {
            case 'web':
                localStorage.setItem(key, value);
                break;
            case 'node':
                data[key] = value;
                break;
        }
    }
    setJson(key, value) {
        this.set(key, JSON.stringify(value));
    }
    clearKey(key) {
        switch (this.type) {
            case 'web':
                localStorage.removeItem(key);
                break;
            case 'node':
                delete data[key];
                break;
        }
    }
    clear() {
        switch (this.type) {
            case 'web':
                localStorage.clear();
                break;
            case 'node':
                data = {};
                break;
        }
    }
}
exports.StorageProvider = StorageProvider;
exports.storageProvider = new StorageProvider();
