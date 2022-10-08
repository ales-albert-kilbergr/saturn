export class OrderBaseEvent {
  public readonly meta = Object.freeze({
    producer: 'order.producer',
    createdAtUTC: new Date().toUTCString(),
  });
}
