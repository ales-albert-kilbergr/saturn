import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Order, OrderModel, ORDER_MODEL } from '@oms/order-data';
import { FilterQuery } from 'mongoose';
import { FindOrderStatisticsData } from './find-order-statistics.data';
import { FindOrderStatisticsFilterInput } from './find-order-statistics.input';

@Resolver()
export class FindOrderStatisticsResovler {
  constructor(
    @Inject(ORDER_MODEL)
    private orderModel: OrderModel
  ) {}

  @Query(() => FindOrderStatisticsData, {
    name: 'findOrderStatistics',
  })
  public async resolve(
    @Args('filter')
    filter: FindOrderStatisticsFilterInput
  ) {
    const to = filter.to || new Date();
    const from = this.normalizeFromDate(filter.from, to);
    const bucketSize = filter.bucketSize || 1000 * 60 * 10; // 10 minutes

    const boundaries = this.computeBucketBoundaries(from, to, bucketSize);

    const records = await this.orderModel
      .aggregate([
        {
          $match: {
            createdAt: { $gte: from, $lte: to },
          },
        },
        {
          $unwind: '$items',
        },
        {
          $group: {
            _id: '$_id',
            createdAt: { $first: '$createdAt' },
            sum: {
              $sum: { $multiply: ['$items.price.amount', '$items.count'] },
            },
          },
        },
        {
          $bucket: {
            groupBy: '$createdAt',
            boundaries,
            default: new Date(to.getTime() + bucketSize),
            output: {
              count: { $sum: 1 },
              sum: {
                $sum: '$sum',
              },
              first: { $first: '$createdAt' },
              last: { $last: '$createdAt' },
            },
          },
        },
        {
          $addFields: {
            timestamp: '$_id',
          },
        },
      ])
      .sort({ createdAt: 1 });

    return {
      statistics: {
        from,
        to,
        bucketSize,
        records,
      },
    };
  }

  private normalizeFromDate(from: Date | undefined, to: Date) {
    const normalizedFrom = from || new Date();
    if (!from) {
      normalizedFrom.setHours(to.getHours() - 48);
    }
    return normalizedFrom;
  }

  private computeBucketBoundaries(
    from: Date,
    to: Date,
    bucketSize: number
  ): Date[] {
    const boundaries: Date[] = [];
    const currDate = new Date(from);

    while (currDate.getTime() < to.getTime()) {
      boundaries.push(new Date(currDate));
      currDate.setTime(currDate.getTime() + bucketSize);
    }

    return boundaries;
  }
}
