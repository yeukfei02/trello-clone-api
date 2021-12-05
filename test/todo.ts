import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ec2y8ai7oa.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

export const todoTest = (): void => {
  test('addTodoData', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const ADD_TODO_DATA = gql`
      mutation addTodoData($data: AddTodoDataInput!) {
        addTodoData(data: $data) {
          message
        }
      }
    `;
    const variables = {
      data: {
        userId: userId,
        title: faker.name.title(),
        description: faker.lorem.text(),
      },
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await graphQLClient.request(ADD_TODO_DATA, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.addTodoData.message).toBeDefined();
  });

  test('deleteTodoDataById', async () => {
    const token = await getToken();
    const tokenDataById = await getTodoDataId();

    const DELETE_TODO_DATA_BY_ID = gql`
      mutation deleteTodoDataById($id: String!) {
        deleteTodoDataById(id: $id) {
          message
        }
      }
    `;
    const variables = {
      id: tokenDataById,
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await graphQLClient.request(DELETE_TODO_DATA_BY_ID, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.deleteTodoDataById.message).toBeDefined();
  });

  test('getTodoList', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const GET_TODO_LIST = gql`
      query getTodoList($userId: String!) {
        getTodoList(userId: $userId) {
          message
          todo {
            id
            userId
            title
            description
            dataType
            createdAt
            updatedAt
          }
        }
      }
    `;
    const variables = {
      userId: userId,
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await graphQLClient.request(GET_TODO_LIST, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.getTodoList.message).toBeDefined();
    expect(response.getTodoList.todo).toBeDefined();
  });
};

async function getToken() {
  const LOGIN = gql`
    mutation login($data: LoginInput!) {
      login(data: $data) {
        message
        token
        userId
      }
    }
  `;
  const variables = { data: { email: 'yeukfei02@gmail.com', password: 'test' } };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const token = response.login.token;
  return token;
}

async function getUserId() {
  const LOGIN = gql`
    mutation login($data: LoginInput!) {
      login(data: $data) {
        message
        token
        userId
      }
    }
  `;
  const variables = { data: { email: 'yeukfei02@gmail.com', password: 'test' } };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const userId = response.login.userId;
  return userId;
}

async function getTodoDataId() {
  const token = await getToken();
  const userId = await getUserId();

  const GET_TODO_LIST = gql`
    query getTodoList($userId: String!) {
      getTodoList(userId: $userId) {
        message
        todo {
          id
          userId
          title
          description
          dataType
          createdAt
          updatedAt
        }
      }
    }
  `;
  const variables = {
    userId: userId,
  };
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const response = await graphQLClient.request(GET_TODO_LIST, variables, headers);
  console.log('response = ', response);

  const todoDataId = response.getTodoList.todo[0].id;
  return todoDataId;
}
