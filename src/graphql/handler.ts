import { ApolloServer } from 'apollo-server-lambda';
import { schema } from '../../api/schema';

import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

const server = new ApolloServer({
  schema,
  tracing: true,
  introspection: true,
  playground: {
    endpoint: '/prod',
  },
  context: ({ event, context }) => {
    const token =
      event.headers && event.headers.Authorization ? event.headers.Authorization.replace('Bearer ', '') : '';

    const data = {
      event: event,
      context: context,
      token: token,
    };
    return data;
  },
});

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
