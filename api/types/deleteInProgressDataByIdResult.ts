import { objectType } from 'nexus';

export const DeleteInProgressDataByIdResult = objectType({
  name: 'DeleteInProgressDataByIdResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
