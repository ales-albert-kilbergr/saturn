import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOrderData } from './create-order.data';
import { CreateOrderInput } from './create-order.input';
import { OrderCreatedEvent } from '@oms/order-events';
import { Producer } from 'kafkajs';
import { Inject } from '@nestjs/common';
import { KAFKA_PRODUCER } from '../../kafka.providers';

@Resolver()
export class CreateOrderResolver {
  constructor(
    @Inject(KAFKA_PRODUCER)
    private kafkaProducer: Producer
  ) {}

  @Mutation(() => CreateOrderData, {
    name: 'createOrder',
  })
  public async resolve(
    @Args('payload')
    payload: CreateOrderInput
  ) {
    const event = OrderCreatedEvent.create({
      order: payload,
    });
    console.log(event);

    await this.kafkaProducer.send({
      topic: 'saturn.order.v1',
      messages: [
        {
          value: JSON.stringify(event),
          key: event.data.order.orderId,
        },
      ],
    });

    return {
      dummy: true,
    };
  }
}
