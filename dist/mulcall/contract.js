"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulContract = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("./abi");
class MulContract {
    get address() {
        return this._address;
    }
    get abi() {
        return this._abi;
    }
    get functions() {
        return this._functions;
    }
    get mulContractConfig() {
        return this._mulContractConfig;
    }
    constructor(address, abi, config = undefined) {
        this._address = address;
        this._abi = toFragment(abi);
        this._functions = this._abi.filter(it => it).filter(x => x.type === 'function').map(x => ethers_1.FunctionFragment.from(x));
        const callFunctions = this._functions.filter(x => x.stateMutability === 'pure' || x.stateMutability === 'view');
        for (const callFunction of callFunctions) {
            const { name } = callFunction;
            const getCall = makeCallFunction(this, name);
            if (!this[name])
                defineReadOnly(this, name, getCall);
        }
        if (config) {
            this._mulContractConfig = config;
            if (config.redstoneWrapper) {
                if (!config.contract) {
                    throw new Error('contract is required');
                }
            }
        }
        else {
            this._mulContractConfig = {
                redstoneWrapper: false
            };
        }
    }
}
exports.MulContract = MulContract;
function toFragment(abi) {
    return abi.map((item) => ethers_1.Fragment.from(item));
}
function makeCallFunction(contract, name) {
    return (...params) => {
        const { address } = contract;
        const f1 = contract.functions.find(f => f.name === name);
        const f2 = contract.functions.find(f => f.name === name);
        const call = {
            contract: {
                address,
            },
            name,
            inputs: f1?.inputs,
            outputs: f2?.outputs,
            params,
            callData() {
                return Promise.resolve("");
            }
        };
        call.callData = async () => {
            if (contract.mulContractConfig.redstoneWrapper) {
                const populateTransaction = await contract.mulContractConfig.contract.populateTransaction[name](...params);
                return populateTransaction.data;
            }
            return abi_1.Abi.encode(name, call.inputs, call.params);
        };
        return call;
    };
}
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value,
        writable: false,
    });
}
