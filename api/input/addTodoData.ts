import { inputObjectType } from 'nexus';

export const AddTodoDataInput = inputObjectType({
  name: 'AddTodoDataInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('title');
    t.nonNull.string('description');
  },
});
