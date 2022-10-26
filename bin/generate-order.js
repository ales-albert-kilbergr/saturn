#!/usr/bin/env node
const crypto = require('crypto');
const graphql = require('graphql-request');
// SCRIPT CONFIG
const TICK_INTERVAL = 1000 * 2;
const MAX_ORDERS_PER_SECOND = 5;
const MAX_ITEMS_PER_ORDER = 10;

/**
 * @typedef OrderGeneratorOptions
 * @property {number} tickInterval
 * @property {number} maxOrdersPerSecond
 * @property {number} maxItemsPerOrder
 */

const CREATE_ORDER_MUTATION = graphql.gql`
  mutation CreateOrder($payload: CreateOrderInput!) {
    createOrder(payload: $payload) {
      dummy
    }
  }
`;
/**
 *
 * @param {OrderGeneratorOptions} options
 */
async function tick(options) {
  const ordersCount = crypto.randomInt(0, options.maxOrdersPerSecond);
  let totalPrice = 0;

  const orderVariables = Array(ordersCount)
    .fill(null)
    .map((_, ix) => ({
      items: Array(crypto.randomInt(1, options.maxItemsPerOrder))
        .fill(null)
        .map((_, ix) => {
          const price = crypto.randomInt(1, 100);
          totalPrice += price;
          return {
            name: `Item X ${crypto.randomBytes(6).toString('hex')}`,
            count: crypto.randomInt(1, 50),
            price: {
              currency: 'EUR',
              amount: price,
            },
          };
        }),
    }));

  console.log(
    `TICK: Generates ${ordersCount} orders with total price "${totalPrice}" EUR`
  );

  return Promise.all(
    orderVariables.map((order) =>
      graphql.request('http://localhost:3334/graphql', CREATE_ORDER_MUTATION, {
        payload: order,
      })
    )
  );
}
/**
 *
 * @param {OrderGeneratorOptions} options
 */
async function loop(options) {
  await tick(options);

  setTimeout(() => loop(options), options.tickInterval);
}

/**
 *
 * @param {OrderGeneratorOptions} options
 */
async function main(options) {
  await loop(options);
}

main({
  maxItemsPerOrder: MAX_ITEMS_PER_ORDER,
  maxOrdersPerSecond: MAX_ORDERS_PER_SECOND,
  tickInterval: TICK_INTERVAL,
});
