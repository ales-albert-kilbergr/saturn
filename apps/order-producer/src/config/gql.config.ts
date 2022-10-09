import { ApolloDriverConfig } from '@nestjs/apollo';
import { registerAs } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { environment } from '../environments/environment';

export const gqlApiConfig = registerAs('gqlApiConfig', async () => {
  const gqlPlayground: string | boolean =
    process.env.GQL_PLAYGROUND || environment.gqlPlayground;
  const plugins = [];

  if (gqlPlayground === 'apollo-sandbox') {
    plugins.push(ApolloServerPluginLandingPageLocalDefault());
  }

  const config: ApolloDriverConfig = {
    autoSchemaFile: true,
    debug: Boolean(process.env.GQL_DEBUG) || environment.gqlDebug,
    playground: gqlPlayground === 'graphql-playground',
    plugins,
    cors: {
      origin: 'https://studio.apollographql.com',
      credentials: true,
    },
  };

  return config;
});
