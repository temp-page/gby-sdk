"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCallService = void 0;
const mulcall_1 = require("../mulcall");
const tool_1 = require("./tool");
const ConnectInfo_1 = require("../ConnectInfo");
const contract_1 = require("./contract");
let MultiCallService = class MultiCallService {
    constructor(connectInfo) {
        this.connectInfo = connectInfo;
        this.multicall2Contract = connectInfo.create(contract_1.Multicall2Contract);
    }
    async multicallExecute(calls) {
        const res = await (0, mulcall_1.multicallExecute)(this.multicall2Contract.contract, calls);
        return res;
    }
    async callObj(...shapeWithLabels) {
        const calls = [];
        for (const shapeWithLabel of shapeWithLabels) {
            for (const key in shapeWithLabel) {
                if (Object.prototype.hasOwnProperty.call(shapeWithLabel, key)) {
                    if (typeof shapeWithLabel[key] !== 'string') {
                        calls.push(shapeWithLabel[key]);
                    }
                }
            }
        }
        const callResult = await this.multicallExecute(calls);
        let index = 0;
        const result = [];
        for (const shapeWithLabel of shapeWithLabels) {
            const resultItem = {};
            for (const key in shapeWithLabel) {
                if (Object.prototype.hasOwnProperty.call(shapeWithLabel, key)) {
                    const value = shapeWithLabel[key];
                    if (typeof value === 'string') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        resultItem[key] = value;
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        resultItem[key] = callResult[index];
                        index++;
                    }
                }
            }
            result.push(resultItem);
        }
        return result;
    }
    async singleCallObj(call) {
        const res = await this.multicallExecute([call]);
        return res[0];
    }
};
exports.MultiCallService = MultiCallService;
exports.MultiCallService = MultiCallService = __decorate([
    (0, tool_1.CacheKey)('MultiCallService'),
    __metadata("design:paramtypes", [ConnectInfo_1.ConnectInfo])
], MultiCallService);
