import { OnOrderStateUpdatedResolver } from './on-state-updated/on-state-updated.subscription';
import { OrderCreatedResolver } from './order-created.subscription';

export const SUBSCRIPTIONS = [
  OrderCreatedResolver,
  OnOrderStateUpdatedResolver,
];
