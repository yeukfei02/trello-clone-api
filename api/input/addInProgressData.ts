import { inputObjectType } from 'nexus';

export const AddInProgressDataInput = inputObjectType({
  name: 'AddInProgressDataInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('title');
    t.nonNull.string('description');
  },
});
