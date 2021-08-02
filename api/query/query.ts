import { queryField, nonNull, stringArg } from 'nexus';
import { GetUserDetailsResult } from '../types/getUserDetailsResult';
import { GetTodoListResult } from '../types/getTodoListResult';
import { GetInProgressListResult } from '../types/getInProgressListResult';
import { GetDoneListResult } from '../types/getDoneListResult';

import { getUserDetailsControllerFunc } from '../../controller/user';
import { getTodoListControllerFunc } from '../../controller/todo';
import { getInProgressListControllerFunc } from '../../controller/inProgress';
import { getDoneListControllerFunc } from '../../controller/done';

export const getUserDetails = queryField('getUserDetails', {
  type: nonNull(GetUserDetailsResult),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: getUserDetailsControllerFunc,
});

export const getTodoList = queryField('getTodoList', {
  type: nonNull(GetTodoListResult),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: getTodoListControllerFunc,
});

export const getInProgressList = queryField('getInProgressList', {
  type: nonNull(GetInProgressListResult),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: getInProgressListControllerFunc,
});

export const getDoneList = queryField('getDoneList', {
  type: nonNull(GetDoneListResult),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: getDoneListControllerFunc,
});
