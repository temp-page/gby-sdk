"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONST = void 0;
const ethers6_1 = require("ethers6");
class CONST {
}
exports.CONST = CONST;
//TARGET_TYPE
// uint8 public constant TARGET_TYPE_CRYPTO = 0;
// uint8 public constant TARGET_TYPE_STOCKS = 1;
// uint8 public constant TARGET_TYPE_FOREX = 2;
// uint8 public constant TARGET_TYPE_INDICES = 3;
// uint8 public constant TARGET_TYPE_COMMODITIES = 4;
//
// //TARGET_STATUS
// uint8 public constant TARGET_STATUS_NORNAL = 0;
// uint8 public constant TARGET_STATUS_DISABLE_OPEN = 1;
// uint8 public constant TARGET_STATUS_DISABLE_CLOSE = 2;
// uint8 public constant TARGET_STATUS_PAUSE = 3;
//
// //TRADE_TYPE
// uint8 public constant TRADE_TYPE_OPEN = 1;
// uint8 public constant TRADE_TYPE_CLOSE = 2;
//
// //TRADE_STATE
// uint8 public constant TRADE_STATE_PENDING = 0;
// uint8 public constant TRADE_STATE_DONE = 1;
// uint8 public constant TRADE_STATE_REJECT = 2;
//
// //POSITION_EXIT_REASON
// uint8 public constant POSITION_EXIT_REASON_NULL = 0;
// uint8 public constant POSITION_EXIT_REASON_USER_CLOSE = 1;
// uint8 public constant POSITION_EXIT_REASON_TP = 2;
// uint8 public constant POSITION_EXIT_REASON_SL = 3;
// uint8 public constant POSITION_EXIT_REASON_LQ = 4;
//
// //POSITION_TYPE
// uint8 public constant POSITION_TYPE_NULL = 0;
// uint8 public constant POSITION_TYPE_MARKET = 1;
// uint8 public constant POSITION_TYPE_BOOST = 2;
// uint8 public constant PRICE_DECIMALS = 8;
//     uint8 public constant QTY_DECIMALS = 10;
//     uint8 public constant USD_DECIMALS = 18;
CONST.TARGET_TYPE_CRYPTO = 0;
CONST.TARGET_TYPE_STOCKS = 1;
CONST.TARGET_TYPE_FOREX = 2;
CONST.TARGET_TYPE_INDICES = 3;
CONST.TARGET_TYPE_COMMODITIES = 4;
CONST.TARGET_STATUS_NORNAL = 0;
CONST.TARGET_STATUS_DISABLE_OPEN = 1;
CONST.TARGET_STATUS_DISABLE_CLOSE = 2;
CONST.TARGET_STATUS_PAUSE = 3;
CONST.TRADE_TYPE_OPEN = 1;
CONST.TRADE_TYPE_CLOSE = 2;
CONST.TRADE_STATE_PENDING = 0;
CONST.TRADE_STATE_DONE = 1;
CONST.POSITION_EXIT_REASON_NULL = 0;
CONST.POSITION_EXIT_REASON_USER_CLOSE = 1;
CONST.POSITION_EXIT_REASON_TP = 2;
CONST.POSITION_EXIT_REASON_SL = 3;
CONST.POSITION_EXIT_REASON_LQ = 4;
CONST.POSITION_TYPE_NULL = 0;
CONST.POSITION_TYPE_MARKET = 1;
CONST.POSITION_TYPE_BOOST = 2;
CONST.RATIO_DECIMALS = 4;
CONST.PRICE_DECIMALS = 8;
CONST.QTY_DECIMALS = 10;
CONST.USD_DECIMALS = 18;
CONST.LIQUIDATION = "150000";
//    bytes32 constant SUPER_ADMIN_ROLE = keccak256("SUPER_ADMIN_ROLE");
//     bytes32 constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
//     bytes32 constant DEPLOYER_ADMIN_ROLE = keccak256("DEPLOYER_ADMIN_ROLE");
//     bytes32 constant TOKEN_OPERATE_ROLE = keccak256("TOKEN_OPERATE_ROLE");
//     bytes32 constant TOKEN_OPERATE_ADMIN_ROLE = keccak256("TOKEN_OPERATE_ADMIN_ROLE");
//     bytes32 constant ALP_OPERATE_ROLE = keccak256("ALP_OPERATE_ROLE");
//     bytes32 constant ALP_OPERATE_ADMIN_ROLE = keccak256("ALP_OPERATE_ADMIN_ROLE");
//     bytes32 constant PRICE_OPERATE_ROLE = keccak256("PRICE_OPERATE_ROLE");
//     bytes32 constant PRICE_OPERATE_ADMIN_ROLE = keccak256("PRICE_OPERATE_ADMIN_ROLE");
//     bytes32 constant TARGET_OPERATE_ROLE = keccak256("TARGET_OPERATE_ROLE");
//     bytes32 constant TARGET_OPERATE_ADMIN_ROLE = keccak256("TARGET_OPERATE_ADMIN_ROLE");
//     bytes32 constant TRADE_OPERATE_ROLE = keccak256("TRADE_OPERATE_ROLE");
//     bytes32 constant TRADE_OPERATE_ADMIN_ROLE = keccak256("TRADE_OPERATE_ADMIN_ROLE");
//     bytes32 constant BROKER_OPERATE_ROLE = keccak256("BROKER_OPERATE_ROLE");
//     bytes32 constant BROKER_OPERATE_ADMIN_ROLE = keccak256("BROKER_OPERATE_ADMIN_ROLE");
//
//     bytes32 constant PRICE_FEEDER_ROLE = keccak256("PRICE_FEEDER_ROLE");
//     bytes32 constant PRICE_FEEDER_ADMIN_ROLE = keccak256("PRICE_FEEDER_ADMIN_ROLE");
//
//     bytes32 constant PRICE_KEEPER_ROLE = keccak256("PRICE_KEEPER_ROLE");
//     bytes32 constant PRICE_KEEPER_ADMIN_ROLE = keccak256("PRICE_KEEPER_ADMIN_ROLE");
CONST.DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
CONST.SUPER_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("SUPER_ADMIN_ROLE"));
CONST.DEPLOYER_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("DEPLOYER_ROLE"));
CONST.DEPLOYER_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("DEPLOYER_ADMIN_ROLE"));
CONST.TOKEN_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TOKEN_OPERATE_ROLE"));
CONST.TOKEN_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TOKEN_OPERATE_ADMIN_ROLE"));
CONST.ALP_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("ALP_OPERATE_ROLE"));
CONST.ALP_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("ALP_OPERATE_ADMIN_ROLE"));
CONST.PRICE_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_OPERATE_ROLE"));
CONST.PRICE_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_OPERATE_ADMIN_ROLE"));
CONST.TARGET_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TARGET_OPERATE_ROLE"));
CONST.TARGET_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TARGET_OPERATE_ADMIN_ROLE"));
CONST.TRADE_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TRADE_OPERATE_ROLE"));
CONST.TRADE_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("TRADE_OPERATE_ADMIN_ROLE"));
CONST.BROKER_OPERATE_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("BROKER_OPERATE_ROLE"));
CONST.BROKER_OPERATE_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("BROKER_OPERATE_ADMIN_ROLE"));
CONST.PRICE_FEEDER_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_FEEDER_ROLE"));
CONST.PRICE_FEEDER_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_FEEDER_ADMIN_ROLE"));
CONST.PRICE_KEEPER_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_KEEPER_ROLE"));
CONST.PRICE_KEEPER_ADMIN_ROLE = (0, ethers6_1.keccak256)((0, ethers6_1.toUtf8Bytes)("PRICE_KEEPER_ADMIN_ROLE"));
