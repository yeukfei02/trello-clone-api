import { objectType } from 'nexus';

export const UserDetails = objectType({
  name: 'UserDetails',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
  },
});
