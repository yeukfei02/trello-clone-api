import { inputObjectType } from 'nexus';

export const ChangePasswordInput = inputObjectType({
  name: 'ChangePasswordInput',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('currentPassword');
    t.nonNull.string('newPassword');
  },
});
