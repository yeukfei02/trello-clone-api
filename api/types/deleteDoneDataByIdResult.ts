import { objectType } from 'nexus';

export const DeleteDoneDataByIdResult = objectType({
  name: 'DeleteDoneDataByIdResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
