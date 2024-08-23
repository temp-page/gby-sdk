"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepIncreaseReferrerShareLogsGql = exports.PrepClaimShareLogsGql = void 0;
const graphql_request_1 = require("graphql-request");
function PrepClaimShareLogsGql(account) {
    return {
        gql: (0, graphql_request_1.gql) `
      query getPools($account: String!) {
        claimShareLogs(where:{account:$account} orderBy:block orderDirection:desc) {
          timestamp
          hash
          tokenAddress
          amount
          token {
            tokenName
            tokenAddress
          }
        }
      }
    `,
        params: {
            account
        },
    };
}
exports.PrepClaimShareLogsGql = PrepClaimShareLogsGql;
function PrepIncreaseReferrerShareLogsGql(account) {
    return {
        gql: (0, graphql_request_1.gql) `
      query getPools($account: String!) {
        increaseReferrerShareLogs:increaseReferrerShareUserTokenAggregations(
          where: {account: $account}
          orderBy: dateJoin
          orderDirection: desc
        ) {
          timestamp:dateJoin
          volume
          fromUser
          amount
          totalCloseFee
          totalOpenFee
          token {
            tokenName
            tokenAddress
            decimals
          }
        }
      }
    `,
        params: {
            account
        },
    };
}
exports.PrepIncreaseReferrerShareLogsGql = PrepIncreaseReferrerShareLogsGql;
