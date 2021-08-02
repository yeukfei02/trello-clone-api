import { objectType } from 'nexus';
import { UserDetails } from './userDetails';

export const GetUserDetailsResult = objectType({
  name: 'GetUserDetailsResult',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.field('userDetails', { type: UserDetails });
  },
});
