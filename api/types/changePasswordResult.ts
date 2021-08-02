import { objectType } from 'nexus';

export const ChangePasswordResult = objectType({
  name: 'ChangePasswordResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
