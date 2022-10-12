const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  '/graphql': {
    target: process.env.ORDER_MANAGEMENT_SERVICE_PROXY,
    secure: false,
    ws: true,
  },
  '/subscriptions': {
    target: process.env.ORDER_MANAGEMENT_SERVICE_PROXY,
    secure: false,
    ws: true,
  },
};
