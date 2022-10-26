import { Field, ObjectType } from '@nestjs/graphql';
import { OrderStatistics } from '../../fragments';

@ObjectType()
export class FindOrderStatisticsData {
  @Field(() => OrderStatistics)
  public statistics: OrderStatistics;
}
