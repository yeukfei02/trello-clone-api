import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ec2y8ai7oa.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

export const doneTest = (): void => {
  test('addDoneData', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const ADD_DONE_DATA = gql`
      mutation addDoneData($data: AddDoneDataInput!) {
        addDoneData(data: $data) {
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
    const response = await graphQLClient.request(ADD_DONE_DATA, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.addDoneData.message).toBeDefined();
  });

  test('deleteDoneDataById', async () => {
    const token = await getToken();
    const doneDataById = await getDoneDataId();

    const DELETE_DONE_DATA_BY_ID = gql`
      mutation deleteDoneDataById($id: String!) {
        deleteDoneDataById(id: $id) {
          message
        }
      }
    `;
    const variables = {
      id: doneDataById,
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await graphQLClient.request(DELETE_DONE_DATA_BY_ID, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.deleteDoneDataById.message).toBeDefined();
  });

  test('getDoneList', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const GET_DONE_LIST = gql`
      query getDoneList($userId: String!) {
        getDoneList(userId: $userId) {
          message
          done {
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
    const response = await graphQLClient.request(GET_DONE_LIST, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.getDoneList.message).toBeDefined();
    expect(response.getDoneList.done).toBeDefined();
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

async function getDoneDataId() {
  const token = await getToken();
  const userId = await getUserId();

  const GET_DONE_LIST = gql`
    query getDoneList($userId: String!) {
      getDoneList(userId: $userId) {
        message
        done {
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
  const response = await graphQLClient.request(GET_DONE_LIST, variables, headers);
  console.log('response = ', response);

  const doneDataById = response.getDoneList.done[0].id;
  return doneDataById;
}
