import { Resolver, Subscription } from '@nestjs/graphql';
import { EventBus } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { OnOrderStateUpdatedData } from './on-state-updated.data';

@Resolver()
export class OnOrderStateUpdatedResolver {
  constructor(private eventBus: EventBus, private pubSub: PubSub) {}

  // ...
  @Subscription(() => OnOrderStateUpdatedData, {
    name: 'onOrderStateUpdated',
  })
  public resolve() {
    return this.pubSub.asyncIterator('orderStateUpdated');
  }
}
