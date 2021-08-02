import { objectType } from 'nexus';

export const DeleteTodoDataByIdResult = objectType({
  name: 'DeleteTodoDataByIdResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
