import { objectType } from 'nexus';

export const AddTodoDataResult = objectType({
  name: 'AddTodoDataResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
