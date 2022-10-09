import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Order, OrderModel, ORDER_MODEL } from '@oms/order-data';
import { FilterQuery } from 'mongoose';
import { FindOrderListData } from './find-order-list.data';
import {
  FindOrderListFilterInput,
  FindOrderListPagingInput,
} from './find-order-list.input';

@Resolver()
export class FindOrderListResolver {
  constructor(
    @Inject(ORDER_MODEL)
    private orderModel: OrderModel
  ) {}

  @Query(() => FindOrderListData, {
    name: 'findOrderList',
  })
  public async resolve(
    @Args('paging', { nullable: true })
    paging?: FindOrderListPagingInput,
    @Args('filter', { nullable: true })
    filter?: FindOrderListFilterInput
  ) {
    const filterQuery: FilterQuery<Order> = {};

    if (filter?.state) {
      filterQuery.state = filter.state;
    }

    const orders = await this.orderModel.find(filterQuery, undefined, {
      skip: paging?.offset || 0,
      limit: paging?.limit || 100,
    });

    const count = await this.orderModel.count(filterQuery);

    return {
      list: {
        items: orders,
        paging: paging || { offset: 0, limit: 100 },
        count,
        filter,
      },
    };
  }
}
