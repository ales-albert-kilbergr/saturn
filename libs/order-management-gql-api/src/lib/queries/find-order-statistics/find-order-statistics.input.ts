import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindOrderStatisticsFilterInput {
  @Field(() => Date, { nullable: true })
  from: Date;

  @Field(() => Date, { nullable: true })
  to: Date;

  @Field(() => Number, { nullable: true })
  bucketSize: number;
}
