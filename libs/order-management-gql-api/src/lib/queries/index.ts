import { FindOrderCountResolver } from './find-order-count/find-order-count.resolver';
import { FindOrderListResolver } from './find-order-list';
import { FindOrderStatisticsResovler } from './find-order-statistics/find-order-statistics.query';

export const QUERIES = [
  FindOrderListResolver,
  FindOrderCountResolver,
  FindOrderStatisticsResovler,
];
