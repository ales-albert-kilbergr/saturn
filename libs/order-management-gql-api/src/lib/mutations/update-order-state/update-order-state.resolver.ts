import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderModel, orderStateMachine, ORDER_MODEL } from '@oms/order-data';
import { OrderState } from '@oms/order-events';
import { UpdateOrderStateData } from './update-order-state.data';

@Resolver()
export class UpdateOrderStateResolver {
  constructor(
    @Inject(ORDER_MODEL)
    private orderModel: OrderModel
  ) {}

  @Mutation(() => UpdateOrderStateData, { name: 'updateOrderState' })
  public async resolve(
    @Args('orderId')
    orderId: string,
    @Args('state', { type: () => OrderState })
    state: OrderState
  ) {
    const order = await this.orderModel.findOne({ orderId });

    if (order.state !== state) {
      orderStateMachine(order, state);

      await order.save();
    }

    return { order };
  }
}
