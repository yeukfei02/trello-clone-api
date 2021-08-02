import { objectType } from 'nexus';

export const Todo = objectType({
  name: 'Todo',
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
