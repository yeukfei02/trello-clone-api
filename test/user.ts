import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://ec2y8ai7oa.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

const email = faker.internet.email();
const password = 'test';
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

export const userTest = (): void => {
  describe('user test', () => {
    test('signup', async () => {
      const SIGNUP = gql`
        mutation signup($data: SignupInput!) {
          signup(data: $data) {
            message
          }
        }
      `;
      const variables = {
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      };
      const response = await graphQLClient.request(SIGNUP, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.signup.message).toBeDefined();
    });

    test('login', async () => {
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

      expect(response).toBeDefined();
      expect(response.login.message).toBeDefined();
      expect(response.login.token).toBeDefined();
      expect(response.login.userId).toBeDefined();
    });

    test('getUserDetails', async () => {
      const token = await getToken();
      const userId = await getUserId();

      const GET_USER_DETAILS = gql`
        query getUserDetails($userId: String!) {
          getUserDetails(userId: $userId) {
            message
            userDetails {
              id
              email
              firstName
              lastName
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
      const response = await graphQLClient.request(GET_USER_DETAILS, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.getUserDetails.message).toBeDefined();
      expect(response.getUserDetails.userDetails).toBeDefined();
    });
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
