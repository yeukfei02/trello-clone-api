import { list, nonNull, objectType } from 'nexus';
import { InProgress } from './inProgress';

export const GetInProgressListResult = objectType({
  name: 'GetInProgressListResult',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.field('inProgress', { type: nonNull(list(nonNull(InProgress))) });
  },
});
