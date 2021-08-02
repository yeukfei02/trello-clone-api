import { list, nonNull, objectType } from 'nexus';
import { Todo } from './todo';

export const GetTodoListResult = objectType({
  name: 'GetTodoListResult',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.field('todo', { type: nonNull(list(nonNull(Todo))) });
  },
});
