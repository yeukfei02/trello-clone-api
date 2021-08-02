import { objectType } from 'nexus';

export const AddDoneDataResult = objectType({
  name: 'AddDoneDataResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
