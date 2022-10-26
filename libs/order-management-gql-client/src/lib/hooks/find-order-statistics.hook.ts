import { useQuery } from '@apollo/client';
import { IOrderStatistics } from '../fragments';
import { FIND_ORDER_STATISTICS_QUERY } from '../queries';

export interface IFindOrderStatisticsVariables {
  filter: {
    from?: Date;
    to?: Date;
    bucketSize?: number;
  };
}

export interface IFindOrderStatisticsData {
  findOrderStatistics: {
    statistics: IOrderStatistics;
  };
}

export function useFindOrderStatistics(
  variables: IFindOrderStatisticsVariables
) {
  const query = useQuery<
    IFindOrderStatisticsData,
    IFindOrderStatisticsVariables
  >(FIND_ORDER_STATISTICS_QUERY, {
    variables,
  });

  return query;
}
