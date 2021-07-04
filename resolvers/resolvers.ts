import {
  getUserDetailsControllerFunc,
  signupControllerFunc,
  loginControllerFunc,
  changePasswordControllerFunc,
} from '../controller/user';
import {
  getTodoListControllerFunc,
  addTodoDataControllerFunc,
  deleteTodoDataByIdControllerFunc,
} from '../controller/todo';
import {
  getInProgressListControllerFunc,
  addInProgressDataControllerFunc,
  deleteInProgressDataByIdControllerFunc,
} from '../controller/inProgress';
import {
  getDoneListControllerFunc,
  addDoneDataControllerFunc,
  deleteDoneDataByIdControllerFunc,
} from '../controller/done';
import GraphQLJSON from 'graphql-type-json';

const resolvers = {
  Query: {
    getUserDetails: getUserDetailsControllerFunc,

    getTodoList: getTodoListControllerFunc,
    getInProgressList: getInProgressListControllerFunc,
    getDoneList: getDoneListControllerFunc,
  },

  Mutation: {
    signup: signupControllerFunc,
    login: loginControllerFunc,
    changePassword: changePasswordControllerFunc,

    addTodoData: addTodoDataControllerFunc,
    addInProgressData: addInProgressDataControllerFunc,
    addDoneData: addDoneDataControllerFunc,

    deleteTodoDataById: deleteTodoDataByIdControllerFunc,
    deleteInProgressDataById: deleteInProgressDataByIdControllerFunc,
    deleteDoneDataById: deleteDoneDataByIdControllerFunc,
  },

  JSON: {
    __serialize(value: any): any {
      return GraphQLJSON.parseValue(value);
    },
  },
};

export default resolvers;
