import { Query, Resolver } from '@nestjs/graphql';
import { OrderProducerStatusFragment } from '../../fragments';

@Resolver()
export class GetOrderProducerStatusQuery {
  @Query(() => OrderProducerStatusFragment, {
    name: 'getOrderProducerStatus',
  })
  public resolve(): Promise<OrderProducerStatusFragment> {
    return Promise.resolve({
      health: true,
    });
  }
}
