import { ApolloServer, gql } from 'apollo-server';
import { schema } from '../api/schema';

import { createTestClient } from 'apollo-server-testing';

const server = new ApolloServer({
  schema,
});
const { mutate } = createTestClient(server);

export const loginTest = (): void => {
  describe('login test', () => {
    test('login test', async () => {
      const LOGIN = gql`
        mutation login($data: LoginInput!) {
          login(data: $data) {
            message
            token
            userId
          }
        }
      `;
      const response = await mutate({
        mutation: LOGIN,
        variables: { data: { email: 'yeukfei02@gmail.com', password: 'test' } },
      });
      console.log('response = ', response);

      // expect(response.data).toBeDefined();
      // expect(response.data.message).toBeDefined();
      // expect(response.data.token).toBeDefined();
      // expect(response.data.userId).toBeDefined();
      // expect(response.errors).toBeUndefined();
    });
  });
};
