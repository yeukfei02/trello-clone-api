import { objectType } from 'nexus';

export const AddInProgressDataResult = objectType({
  name: 'AddInProgressDataResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
