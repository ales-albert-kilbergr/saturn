import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Order, OrderModel, ORDER_MODEL } from '@oms/order-data';
import { OrderState } from '@oms/order-events';
import { FilterQuery } from 'mongoose';
import { FindOrderCountData } from './find-order-count.data';

@Resolver()
export class FindOrderCountResolver {
  constructor(
    @Inject(ORDER_MODEL)
    private orderModel: OrderModel
  ) {}

  @Query(() => FindOrderCountData, {
    name: 'findOrderCount',
  })
  public async resolver(
    @Args('state', { type: () => OrderState, nullable: true })
    state?: OrderState
  ) {
    const filterQuery: FilterQuery<Order> = {};

    if (state) {
      filterQuery.state = state;
    }

    const count = await this.orderModel.count(filterQuery);

    return {
      orderCount: {
        count,
        state,
      },
    };
  }
}
