import { list, nonNull, objectType } from 'nexus';
import { Done } from './done';

export const GetDoneListResult = objectType({
  name: 'GetDoneListResult',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.field('done', { type: nonNull(list(nonNull(Done))) });
  },
});
