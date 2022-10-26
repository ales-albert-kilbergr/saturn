import { gql, TypePolicy } from '@apollo/client';

export interface IOrderStatisticRecord {
  timestamp: Date;
  count: number;
  sum: number;
  first: Date;
  last: Date;
}

export const ORDER_STATISTIC_RECORD_FRAGMENT = gql`
  fragment OrderStatisticRecordFragment on OrderStatisticRecord {
    timestamp
    count
    sum
    first
    last
  }
`;

export const ORDER_STATISTIC_RECORD_POLICY_TYPE: TypePolicy = {
  keyFields: ['timestamp'],
};
