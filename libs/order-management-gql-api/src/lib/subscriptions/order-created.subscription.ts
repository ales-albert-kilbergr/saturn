import { Resolver, Subscription } from '@nestjs/graphql';
import { EventBus } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { OrderCreatedData } from './order-created.data';

@Resolver()
export class OrderCreatedResolver {
  constructor(private eventBus: EventBus, private pubSub: PubSub) {}

  // ...
  @Subscription(() => OrderCreatedData, {
    name: 'onOrderCreated',
  })
  public resolve() {
    return this.pubSub.asyncIterator('orderCreated');
  }
}
