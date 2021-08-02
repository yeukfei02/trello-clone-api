import { objectType } from 'nexus';

export const LoginResult = objectType({
  name: 'LoginResult',
  definition(t) {
    t.nonNull.string('message');
    t.string('token');
    t.string('userId');
  },
});
