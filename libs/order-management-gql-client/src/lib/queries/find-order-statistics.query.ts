import { gql } from '@apollo/client';
import { ORDER_STATISTICS_FRAGMENT_GQL } from '../fragments';

export const FIND_ORDER_STATISTICS_QUERY = gql`
  query FindOrderStatistics($filter: FindOrderStatisticsFilterInput!) {
    findOrderStatistics(filter: $filter) {
      statistics {
        ...OrderStatisticsFragment
      }
    }
  }
  ${ORDER_STATISTICS_FRAGMENT_GQL}
`;
