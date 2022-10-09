import { logLevel } from 'kafkajs';

export const environment = {
  production: false,
  logLevel: 'debug',
  gqlDebug: true,
  /**
   * Turn on graphql playground in browser at [hostname]:[port]/graphql
   *
   * Possible values: `apollo-sandbox`, `graphql-playground` false.
   *
   * graphql-playground:
   * https://github.com/graphql/graphql-playground
   *
   * apollo-sandbox:
   * https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/
   */
  gqlPlayground: 'apollo-sandbox',
  kafkaClientLogLevel: logLevel.DEBUG,
};
