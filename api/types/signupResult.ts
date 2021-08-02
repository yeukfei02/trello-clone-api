import { objectType } from 'nexus';

export const SignupResult = objectType({
  name: 'SignupResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
