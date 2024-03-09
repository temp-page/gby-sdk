"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LpServiceAbi = exports.VaultServiceAbi = exports.TESTERC20Abi = exports.PortalAbi = exports.Multicall2Abi = exports.IERC20Abi = void 0;
const IERC20_json_1 = __importDefault(require("./IERC20.json"));
const Multicall2_json_1 = __importDefault(require("./Multicall2.json"));
const Portal_json_1 = __importDefault(require("./gby/service/Portal.json"));
const USDT_json_1 = __importDefault(require("./gby/USDT.json"));
const VaultService_json_1 = __importDefault(require("./gby/service/VaultService.json"));
const LpService_json_1 = __importDefault(require("./gby/service/LpService.json"));
exports.IERC20Abi = IERC20_json_1.default;
exports.Multicall2Abi = Multicall2_json_1.default;
exports.PortalAbi = Portal_json_1.default;
exports.TESTERC20Abi = USDT_json_1.default;
exports.VaultServiceAbi = VaultService_json_1.default;
exports.LpServiceAbi = LpService_json_1.default;
