import { inputObjectType } from 'nexus';

export const AddDoneDataInput = inputObjectType({
  name: 'AddDoneDataInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('title');
    t.nonNull.string('description');
  },
});
