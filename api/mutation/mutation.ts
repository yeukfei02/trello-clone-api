import { mutationField, nonNull, stringArg } from 'nexus';
import { SignupResult } from '../types/signupResult';
import { LoginResult } from '../types/loginResult';
import { ChangePasswordResult } from '../types/changePasswordResult';
import { AddTodoDataResult } from '../types/addTodoDataResult';
import { AddInProgressDataResult } from '../types/addInProgressDataResult';
import { AddDoneDataResult } from '../types/addDoneDataResult';
import { DeleteTodoDataByIdResult } from '../types/deleteTodoDataByIdResult';
import { DeleteInProgressDataByIdResult } from '../types/deleteInProgressDataByIdResult';
import { DeleteDoneDataByIdResult } from '../types/deleteDoneDataByIdResult';

import { SignupInput } from '../input/signup';
import { LoginInput } from '../input/login';
import { ChangePasswordInput } from '../input/changePassword';
import { AddTodoDataInput } from '../input/addTodoData';
import { AddInProgressDataInput } from '../input/addInProgressData';
import { AddDoneDataInput } from '../input/addDoneData';

import { signupControllerFunc, loginControllerFunc, changePasswordControllerFunc } from '../../controller/user';
import { addTodoDataControllerFunc, deleteTodoDataByIdControllerFunc } from '../../controller/todo';
import { addInProgressDataControllerFunc, deleteInProgressDataByIdControllerFunc } from '../../controller/inProgress';
import { addDoneDataControllerFunc, deleteDoneDataByIdControllerFunc } from '../../controller/done';

export const signup = mutationField('signup', {
  type: nonNull(SignupResult),
  args: {
    data: nonNull(SignupInput),
  },
  resolve: signupControllerFunc,
});

export const login = mutationField('login', {
  type: nonNull(LoginResult),
  args: {
    data: nonNull(LoginInput),
  },
  resolve: loginControllerFunc,
});

export const changePassword = mutationField('changePassword', {
  type: nonNull(ChangePasswordResult),
  args: {
    data: nonNull(ChangePasswordInput),
  },
  resolve: changePasswordControllerFunc,
});

export const addTodoData = mutationField('addTodoData', {
  type: nonNull(AddTodoDataResult),
  args: {
    data: nonNull(AddTodoDataInput),
  },
  resolve: addTodoDataControllerFunc,
});

export const addInProgressData = mutationField('addInProgressData', {
  type: nonNull(AddInProgressDataResult),
  args: {
    data: nonNull(AddInProgressDataInput),
  },
  resolve: addInProgressDataControllerFunc,
});

export const addDoneData = mutationField('addDoneData', {
  type: nonNull(AddDoneDataResult),
  args: {
    data: nonNull(AddDoneDataInput),
  },
  resolve: addDoneDataControllerFunc,
});

export const deleteTodoDataById = mutationField('deleteTodoDataById', {
  type: nonNull(DeleteTodoDataByIdResult),
  args: {
    id: nonNull(stringArg()),
  },
  resolve: deleteTodoDataByIdControllerFunc,
});

export const deleteInProgressDataById = mutationField('deleteInProgressDataById', {
  type: nonNull(DeleteInProgressDataByIdResult),
  args: {
    id: nonNull(stringArg()),
  },
  resolve: deleteInProgressDataByIdControllerFunc,
});

export const deleteDoneDataById = mutationField('deleteDoneDataById', {
  type: nonNull(DeleteDoneDataByIdResult),
  args: {
    id: nonNull(stringArg()),
  },
  resolve: deleteDoneDataByIdControllerFunc,
});
