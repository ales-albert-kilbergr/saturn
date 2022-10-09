import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';
import { OrderManagementConsumerConfig } from './order-management-consumer.config';
import { OrderCreatedEvent, ORDER_TOPICS } from '@oms/order-events';
import { OrderModel, ORDER_MODEL } from '@oms/order-data';
@Injectable()
export class OrderManagementConsumerService implements OnModuleInit {
  public readonly consumer = this.kafka.consumer(this.config.consumer);

  public logger = new Logger(this.constructor.name);

  constructor(
    private kafka: Kafka,
    private config: OrderManagementConsumerConfig,
    @Inject(ORDER_MODEL)
    private orderModel: OrderModel
  ) {}

  public async onModuleInit() {
    await this.consumer.connect();

    await this.consumer.subscribe({
      topic: ORDER_TOPICS.ORDER_V1,
    });

    await this.consumer.run({
      eachMessage: async (eachMessagePayload) => {
        try {
          await this.consumeIncommingEvent(eachMessagePayload);
        } catch (error) {
          // Do nothing, skip the error and go for another message.
          // Just log the error
          this.logger.error(error.message);
        }
      },
      ...(this.config.consumerRun || {}),
    });
  }

  protected async consumeIncommingEvent(eventPayload: EachMessagePayload) {
    const event = eventPayload.message;
    // Skip broken or invalid messages
    if (!event?.key || !event?.value) {
      return Promise.resolve();
    }
    // Event.key is a topic partition key, which servers to group events and
    // ensure its order. The id might be an id of a conversation or a bot or
    // of any other entity which the topic is about.
    const decodedValue = await JSON.parse(event.value.toString('utf8'));

    switch (decodedValue.type) {
      case OrderCreatedEvent.EVENT_TYPE:
        await new this.orderModel(decodedValue.data.order).save();
        break;
    }
  }
}
