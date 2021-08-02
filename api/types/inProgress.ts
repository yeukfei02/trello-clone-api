import { objectType } from 'nexus';

export const InProgress = objectType({
  name: 'InProgress',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('userId');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('dataType');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
  },
});
