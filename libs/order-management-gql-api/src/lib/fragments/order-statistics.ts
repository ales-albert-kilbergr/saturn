import { Field, ObjectType } from '@nestjs/graphql';
import { UInt } from '@oms/nestjs-helpers';

@ObjectType()
export class OrderStatisticRecord {
  @Field(() => Date, { nullable: true })
  public timestamp: Date;
  @Field(() => UInt)
  public count: number;
  @Field(() => UInt)
  public sum: number;
  @Field(() => Date, { nullable: true })
  public first: Date;
  @Field(() => Date, { nullable: true })
  public last: Date;
}

@ObjectType()
export class OrderStatistics {
  @Field(() => [OrderStatisticRecord])
  public records: OrderStatisticRecord[];
  @Field(() => Date)
  public from: Date;
  @Field(() => Date)
  public to: Date;
  @Field(() => UInt)
  public bucketSize: number;
}
