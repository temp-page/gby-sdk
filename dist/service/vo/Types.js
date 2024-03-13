"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceAndAllowance = exports.Balance = exports.DEFAULT_ICON = exports.ETH_ADDRESS = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.ETH_ADDRESS = 'MNT';
exports.DEFAULT_ICON = 'data:image/svg+xml;base64,IDxzdmcgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICAgIDxwYXRoCiAgICAgICAgZmlsbFJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTEyIDI0QzE4LjYyNzQgMjQgMjQgMTguNjI3NCAyNCAxMkMyNCA1LjM3MjU4IDE4LjYyNzQgMCAxMiAwQzUuMzcyNTggMCAwIDUuMzcyNTggMCAxMkMwIDE4LjYyNzQgNS4zNzI1OCAyNCAxMiAyNFpNMTEuODY4NSAxOC4yNDAxQzEyLjE5ODIgMTguMjQyMyAxMi41MTYgMTguMTE3MyAxMi43NTU4IDE3Ljg5MVYxNy45MDU1QzEyLjg3NzYgMTcuNzg5MyAxMi45NzQgMTcuNjQ5MyAxMy4wMzkxIDE3LjQ5NDFDMTMuMTA0MSAxNy4zMzg5IDEzLjEzNjUgMTcuMTcyIDEzLjEzNCAxNy4wMDM3QzEzLjE0MDcgMTYuODQwNSAxMy4xMTE2IDE2LjY3NzggMTMuMDQ4OCAxNi41MjcxQzEyLjk4NiAxNi4zNzYzIDEyLjg5MDkgMTYuMjQxMSAxMi43NzA0IDE2LjEzMUMxMi42NTE3IDE2LjAxNDUgMTIuNTEwNSAxNS45MjM0IDEyLjM1NTUgMTUuODYzNEMxMi4yMDA0IDE1LjgwMzQgMTIuMDM0NyAxNS43NzU2IDExLjg2ODUgMTUuNzgxOUMxMS43MDQ3IDE1Ljc3NjggMTEuNTQxNSAxNS44MDUxIDExLjM4OSAxNS44NjUxQzExLjIzNjQgMTUuOTI1MSAxMS4wOTc3IDE2LjAxNTYgMTAuOTgxMyAxNi4xMzFDMTAuODYwNyAxNi4yNDExIDEwLjc2NTcgMTYuMzc2MyAxMC43MDI4IDE2LjUyNzFDMTAuNjQgMTYuNjc3OCAxMC42MTA5IDE2Ljg0MDUgMTAuNjE3NiAxNy4wMDM3QzEwLjYxNTYgMTcuMTY2MyAxMC42NDY3IDE3LjMyNzYgMTAuNzA5MyAxNy40Nzc2QzEwLjc3MTggMTcuNjI3NyAxMC44NjQ0IDE3Ljc2MzQgMTAuOTgxMyAxNy44NzY0QzExLjA5NjUgMTcuOTk0NCAxMS4yMzQ2IDE4LjA4NzYgMTEuMzg3MyAxOC4xNTAxQzExLjUzOTkgMTguMjEyNyAxMS43MDM2IDE4LjI0MzMgMTEuODY4NSAxOC4yNDAxWk0xMy43NzQgMTIuNTM4MkMxNC4yODM2IDEyLjExOTkgMTQuNzY5MiAxMS42NzMxIDE1LjIyODUgMTEuMjAwMVYxMS4yMTQ2QzE1LjY5NTcgMTAuNjIyNSAxNS45NDcxIDkuODg4ODIgMTUuOTQxMyA5LjEzNDYxQzE1Ljk2NTEgOC42NzM1OCAxNS44ODQ2IDguMjEzMTIgMTUuNzA1OCA3Ljc4NzUxQzE1LjUyNyA3LjM2MTkgMTUuMjU0NSA2Ljk4MjEyIDE0LjkwODUgNi42NzY0M0MxNC4xMzY5IDYuMDU5OTMgMTMuMTU4MSA1Ljc2MzE1IDEyLjE3NCA1Ljg0NzM0QzExLjYyODggNS44MTYwMSAxMS4wODMgNS44OTY2NCAxMC41NzAyIDYuMDg0MjZDMTAuMDU3NCA2LjI3MTg4IDkuNTg4NDEgNi41NjI1MSA5LjE5MjE3IDYuOTM4MjVDOC44Mjc0MyA3LjMyNjU4IDguNTQ0MjQgNy43ODQxMSA4LjM1OTM3IDguMjgzNzhDOC4xNzQ0OSA4Ljc4MzQ1IDguMDkxNjcgOS4zMTUxMSA4LjExNTgxIDkuODQ3MzRIOS44NjEyN0M5LjgyNzI2IDkuMjMwODcgOS45OTAyOCA4LjYxOTU3IDEwLjMyNjcgOC4xMDE4OEMxMC41MjA5IDcuODQ3OCAxMC43NzU5IDcuNjQ2NjggMTEuMDY4MiA3LjUxNzA0QzExLjM2MDUgNy4zODc0IDExLjY4MDggNy4zMzM0MiAxMS45OTk0IDcuMzYwMDZDMTIuMjYzNiA3LjM0MzI4IDEyLjUyODUgNy4zNzk3IDEyLjc3ODMgNy40NjcxNEMxMy4wMjgyIDcuNTU0NTkgMTMuMjU3OSA3LjY5MTI5IDEzLjQ1NCA3Ljg2OTE1QzEzLjgwMDcgOC4yMjkzNCAxMy45OTgyIDguNzA3NDYgMTQuMDA2NyA5LjIwNzM0QzEzLjk5MzUgOS42NjY3NCAxMy44MjQyIDEwLjEwOCAxMy41MjY3IDEwLjQ1ODJMMTMuMjM1OCAxMC43NzgyQzEyLjQ4MjMgMTEuMzg1OSAxMS44MzM3IDEyLjExMzIgMTEuMzE1OCAxMi45MzFDMTEuMDY2MyAxMy40MzY3IDEwLjk0NjMgMTMuOTk2NSAxMC45NjY3IDE0LjU2MDFWMTQuODUxSDEyLjc4NDlWMTQuNTYwMUMxMi43Nzc4IDE0LjE2NDQgMTIuODczIDEzLjc3MzYgMTMuMDYxMyAxMy40MjU1QzEzLjIzMTcgMTMuMDgxNiAxMy40NzQ5IDEyLjc3ODggMTMuNzc0IDEyLjUzODJaIgogICAgICAgIGZpbGw9IiNCRUMzQ0IiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgZmlsbFJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAgICAgZD0iTTEyIDIzQzE4LjA3NTEgMjMgMjMgMTguMDc1MSAyMyAxMkMyMyA1LjkyNDg3IDE4LjA3NTEgMSAxMiAxQzUuOTI0ODcgMSAxIDUuOTI0ODcgMSAxMkMxIDE4LjA3NTEgNS45MjQ4NyAyMyAxMiAyM1pNMTIgMjRDMTguNjI3NCAyNCAyNCAxOC42Mjc0IDI0IDEyQzI0IDUuMzcyNTggMTguNjI3NCAwIDEyIDBDNS4zNzI1OCAwIDAgNS4zNzI1OCAwIDEyQzAgMTguNjI3NCA1LjM3MjU4IDI0IDEyIDI0WiIKICAgICAgICBmaWxsPSIjRTJFOEYwIgogICAgICAvPgogICAgPC9zdmc+';
class Balance {
    constructor(token, user, balance) {
        this.token = token;
        this.user = user;
        this.balance = balance;
    }
    select(rate) {
        let selectRate = rate;
        if (rate === 'max')
            selectRate = '100';
        return new bignumber_js_1.default(this.balance).multipliedBy(selectRate).div('100').toFixed();
    }
    static unavailable(token) {
        return new Balance(token, '', '0');
    }
}
exports.Balance = Balance;
class BalanceAndAllowance extends Balance {
    constructor(token, user, balance, allowance, spender) {
        super(token, user, balance);
        this.allowance = allowance;
        this.spender = spender;
    }
    showApprove(inputAmount) {
        if (this.token.address === exports.ETH_ADDRESS || this.spender === '')
            return false;
        return new bignumber_js_1.default(inputAmount).comparedTo(this.allowance) > 0;
    }
    approve(connectInfo) {
        return connectInfo.erc20().approve(this.spender, this.token.erc20Address());
    }
    // 生成一个不可用的余额是0的
    static unavailable(token) {
        return new BalanceAndAllowance(token, '', '0', '0', '');
    }
}
exports.BalanceAndAllowance = BalanceAndAllowance;
