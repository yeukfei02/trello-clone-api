import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  scalar JSON

  type Query {
    getUserDetails(userId: String!): GetUserDetailsResult!

    getTodoList(userId: String!): GetTodoListResult!
    getInProgressList(userId: String!): GetInProgressListResult!
    getDoneList(userId: String!): GetDoneListResult!
  }

  type Mutation {
    signup(data: SignupInput!): SignupResult!
    login(data: LoginInput!): LoginResult!
    changePassword(data: ChangePasswordInput!): ChangePasswordResult!

    addTodoData(data: AddTodoDataInput!): AddTodoDataResult!
    addInProgressData(data: AddInProgressDataInput!): AddInProgressDataResult!
    addDoneData(data: AddDoneDataInput!): AddDoneDataResult!

    deleteTodoDataById(id: String!): DeleteTodoDataByIdResult!
    deleteInProgressDataById(id: String!): DeleteInProgressDataByIdResult!
    deleteDoneDataById(id: String!): DeleteDoneDataByIdResult!
  }

  type GetUserDetailsResult {
    message: String!
    userDetails: UserDetails!
  }

  type UserDetails {
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
  }

  type GetTodoListResult {
    message: String!
    todo: [Todo!]!
  }

  type GetInProgressListResult {
    message: String!
    inProgress: [InProgress!]!
  }

  type GetDoneListResult {
    message: String!
    done: [Done!]!
  }

  type Todo {
    id: String!
    userId: String!
    title: String!
    description: String!
    dataType: String!
    createdAt: String!
    updatedAt: String!
  }

  type InProgress {
    id: String!
    userId: String!
    title: String!
    description: String!
    dataType: String!
    createdAt: String!
    updatedAt: String!
  }

  type Done {
    id: String!
    userId: String!
    title: String!
    description: String!
    dataType: String!
    createdAt: String!
    updatedAt: String!
  }

  type SignupResult {
    message: String!
  }

  type LoginResult {
    message: String!
    token: String
    userId: String
  }

  type ChangePasswordResult {
    message: String!
  }

  type AddTodoDataResult {
    message: String!
  }

  type AddInProgressDataResult {
    message: String!
  }

  type AddDoneDataResult {
    message: String!
  }

  type DeleteTodoDataByIdResult {
    message: String!
  }

  type DeleteInProgressDataByIdResult {
    message: String!
  }

  type DeleteDoneDataByIdResult {
    message: String!
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

  input ChangePasswordInput {
    id: String!
    currentPassword: String!
    newPassword: String!
  }

  input AddTodoDataInput {
    userId: String!
    title: String!
    description: String!
  }

  input AddInProgressDataInput {
    userId: String!
    title: String!
    description: String!
  }

  input AddDoneDataInput {
    userId: String!
    title: String!
    description: String!
  }
`;

export default typeDefs;
