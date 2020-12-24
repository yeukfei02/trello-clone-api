// import { importSchema } from 'graphql-import';

// const typeDefs = importSchema('schema/schema.graphql');

import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  scalar JSON

  type Query {
    getTodoList(userId: String!): GetTodoListResult!
    getInProgressList(userId: String!): GetInProgressListResult!
    getDoneList(userId: String!): GetDoneListResult!
  }

  type Mutation {
    signup(data: SignupInput!): SignupResult!
    login(data: LoginInput!): LoginResult!
  }

  type GetTodoListResult {
    message: String!
  }

  type GetInProgressListResult {
    message: String!
  }
  type GetDoneListResult {
    message: String!
  }

  type SignupResult {
    message: String!
  }

  type LoginResult {
    message: String!
    token: String!
    userId: String!
  }

  input SignupInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
