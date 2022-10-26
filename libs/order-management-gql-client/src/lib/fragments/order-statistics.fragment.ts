import { gql, TypePolicy } from '@apollo/client';
import {
  IOrderStatisticRecord,
  ORDER_STATISTIC_RECORD_FRAGMENT,
} from './order-statistic-record.fragment';

export interface IOrderStatistics {
  records: IOrderStatisticRecord[];
  from: Date;
  to: Date;
  bucketSize: number;
}

export const ORDER_STATISTICS_FRAGMENT_GQL = gql`
  fragment OrderStatisticsFragment on OrderStatistics {
    records {
      ...OrderStatisticRecordFragment
    }
    from
    to
    bucketSize
  }
  ${ORDER_STATISTIC_RECORD_FRAGMENT}
`;

export const ORDER_STATISTICS_POLICY_TYPE: TypePolicy = {
  keyFields: ['__typename'],
};
