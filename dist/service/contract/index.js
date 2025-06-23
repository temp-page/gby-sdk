"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeRewardsAbi = exports.IpythAbi = exports.ReferralServiceAbi = exports.RoleServiceAbi = exports.PriceServiceAbi = exports.PositionServiceAbi = exports.TargetServiceAbi = exports.BoostTradeServicesAbi = exports.MarketTradeServicesAbi = exports.LpServiceAbi = exports.VaultServiceAbi = exports.USDTAbi = exports.Multicall2Abi = exports.IERC20Abi = void 0;
const IERC20_json_1 = __importDefault(require("../../abi/IERC20.json"));
exports.IERC20Abi = IERC20_json_1.default;
__exportStar(require("./IERC20Contract"), exports);
const Multicall2_json_1 = __importDefault(require("../../abi/Multicall2.json"));
exports.Multicall2Abi = Multicall2_json_1.default;
__exportStar(require("./Multicall2Contract"), exports);
const USDT_json_1 = __importDefault(require("../../abi/USDT.json"));
exports.USDTAbi = USDT_json_1.default;
__exportStar(require("./USDTContract"), exports);
const VaultService_json_1 = __importDefault(require("../../abi/service/VaultService.json"));
exports.VaultServiceAbi = VaultService_json_1.default;
__exportStar(require("./VaultServiceContract"), exports);
const LpService_json_1 = __importDefault(require("../../abi/service/LpService.json"));
exports.LpServiceAbi = LpService_json_1.default;
__exportStar(require("./LpServiceContract"), exports);
const MarketTradeServices_json_1 = __importDefault(require("../../abi/service/MarketTradeServices.json"));
exports.MarketTradeServicesAbi = MarketTradeServices_json_1.default;
__exportStar(require("./MarketTradeServicesContract"), exports);
const BoostTradeServices_json_1 = __importDefault(require("../../abi/service/BoostTradeServices.json"));
exports.BoostTradeServicesAbi = BoostTradeServices_json_1.default;
__exportStar(require("./BoostTradeServicesContract"), exports);
const TargetService_json_1 = __importDefault(require("../../abi/service/TargetService.json"));
exports.TargetServiceAbi = TargetService_json_1.default;
__exportStar(require("./TargetServiceContract"), exports);
const PositionService_json_1 = __importDefault(require("../../abi/service/PositionService.json"));
exports.PositionServiceAbi = PositionService_json_1.default;
__exportStar(require("./PositionServiceContract"), exports);
const PriceService_json_1 = __importDefault(require("../../abi/service/PriceService.json"));
exports.PriceServiceAbi = PriceService_json_1.default;
__exportStar(require("./PriceServiceContract"), exports);
const RoleService_json_1 = __importDefault(require("../../abi/service/RoleService.json"));
exports.RoleServiceAbi = RoleService_json_1.default;
__exportStar(require("./RoleServiceContract"), exports);
const ReferralService_json_1 = __importDefault(require("../../abi/service/ReferralService.json"));
exports.ReferralServiceAbi = ReferralService_json_1.default;
__exportStar(require("./ReferralServiceContract"), exports);
const Ipyth_json_1 = __importDefault(require("../../abi/pyth/Ipyth.json"));
exports.IpythAbi = Ipyth_json_1.default;
__exportStar(require("./IpythContract"), exports);
const TradeRewards_json_1 = __importDefault(require("../../abi/TradeRewards.json"));
exports.TradeRewardsAbi = TradeRewards_json_1.default;
__exportStar(require("./TradeRewardsContract"), exports);
