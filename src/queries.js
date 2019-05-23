import { gql } from 'apollo-boost';

const MarketContractFragments = {
  allData: gql`
    fragment MarketContractData on MarketContract {
      id
      name
      priceCap
      priceFloor
      isSettled
      settlementPrice
      lastPrice
      expirationTimestamp
      settlementTimeStamp
      oracleUrl
    }
  `,
  meta: gql`
    fragment ContractMeta on MarketContract {
      name
      priceFloor
      priceCap
      priceDecimalPlaces
      qtyMultiplier
      expirationTimestamp
    }
  `,
  fees: gql`
    fragment ContractFees on MarketContract {
      collateralTokenFeePerUnit
      mktTokenFeePerUnit
    }
  `,
  collateral: gql`
    fragment ContractCollateral on MarketContract {
      collateralTokenAddress
      collateralPerUnit
    }
  `,
  oracleData: gql`
    fragment OracleData on MarketContract {
      oracleUrl
      oracleStatistic
    }
  `
};

const PositionTokenFragments = {
  allData: gql`
    fragment PositionTokenData on PositionToken {
      id
      name
      symbol
      decimals
      marketSide
    }
  `
};

export const PositionTokensQuery = gql`
  query {
    positionTokens(first: 10) {
      ...PositionTokenData
    }
  }
  ${PositionTokenFragments.allData}
`;

export const AllMarketContractsQuery = gql`
  query {
    marketContracts(first: 10) {
      ...MarketContractData
    }
  }
  ${MarketContractFragments.allData}
`;

export const AllMarketContractsWithPositionTokensQuery = gql`
  query {
    marketContracts(first: 10) {
      ...MarketContractData
      shortPositionToken {
        ...PositionTokenData
      }
      longPositionToken {
        ...PositionTokenData
      }
    }
  }
  ${PositionTokenFragments.allData}
  ${MarketContractFragments.allData}
`;

export const PositionTokenOwnerWithAddress = gql`
  query($ownerAddress: String) {
    positionTokenOwners(where: { owner: $ownerAddress }) {
      id
      owner
      token {
        ...PositionTokenData
      }
      balance
    }
  }
  ${PositionTokenFragments.allData}
`;

export const AllMarketContractsWithPositionTokensExpiringWithinQuery = gql`
  query($gt: BigInt, $lt: BigInt) {
    marketContracts(
      first: 10
      where: { expirationTimestamp_gt: $gt, expirationTimestamp_lt: $lt }
    ) {
      ...MarketContractData
      shortPositionToken {
        ...PositionTokenData
      }
      longPositionToken {
        ...PositionTokenData
      }
    }
  }
  ${PositionTokenFragments.allData}
  ${MarketContractFragments.allData}
`;
