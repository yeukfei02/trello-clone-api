import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ec2y8ai7oa.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

export const inProgressTest = (): void => {
  test('addInProgressData', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const ADD_IN_PROGRESS_DATA = gql`
      mutation addInProgressData($data: AddInProgressDataInput!) {
        addInProgressData(data: $data) {
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
    const response = await graphQLClient.request(ADD_IN_PROGRESS_DATA, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.addInProgressData.message).toBeDefined();
  });

  test('deleteInProgressDataById', async () => {
    const token = await getToken();
    const inProgressDataId = await getInProgressDataId();

    const DELETE_IN_PROGRESS_DATA_BY_ID = gql`
      mutation deleteInProgressDataById($id: String!) {
        deleteInProgressDataById(id: $id) {
          message
        }
      }
    `;
    const variables = {
      id: inProgressDataId,
    };
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await graphQLClient.request(DELETE_IN_PROGRESS_DATA_BY_ID, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.deleteInProgressDataById.message).toBeDefined();
  });

  test('getInProgressList', async () => {
    const token = await getToken();
    const userId = await getUserId();

    const GET_IN_PROGRESS_LIST = gql`
      query getInProgressList($userId: String!) {
        getInProgressList(userId: $userId) {
          message
          inProgress {
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
    const response = await graphQLClient.request(GET_IN_PROGRESS_LIST, variables, headers);
    console.log('response = ', response);

    expect(response).toBeDefined();
    expect(response.getInProgressList.message).toBeDefined();
    expect(response.getInProgressList.inProgress).toBeDefined();
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

async function getInProgressDataId() {
  const token = await getToken();
  const userId = await getUserId();

  const GET_IN_PROGRESS_LIST = gql`
    query getInProgressList($userId: String!) {
      getInProgressList(userId: $userId) {
        message
        inProgress {
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
  const response = await graphQLClient.request(GET_IN_PROGRESS_LIST, variables, headers);
  console.log('response = ', response);

  const inProgressDataId = response.getInProgressList.inProgress[0].id;
  return inProgressDataId;
}
