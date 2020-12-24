import GraphQLJSON from 'graphql-type-json';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import TrelloCloneUser from '../model/TrelloCloneUser';
import TrelloCloneTodoData from '../model/TrelloCloneTodoData';
import TrelloCloneInProgressData from '../model/TrelloCloneInProgressData';
import TrelloCloneDoneData from '../model/TrelloCloneDoneData';

const resolvers = {
  Query: {
    getUserDetails: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.userId;
        if (userIdInput) {
          const trelloCloneUser = await TrelloCloneUser.query({ id: { eq: userIdInput } }).exec();
          const trelloCloneUserObj = trelloCloneUser.toJSON();
          const userDetails = {
            id: trelloCloneUserObj[0].id,
            email: trelloCloneUserObj[0].email,
            firstName: trelloCloneUserObj[0].firstName,
            lastName: trelloCloneUserObj[0].lastName,
            createdAt: trelloCloneUserObj[0].createdAt,
            updatedAt: trelloCloneUserObj[0].updatedAt,
          };

          response = {
            message: 'getTodoList',
            userDetails: userDetails,
          };
        }
      }

      return response;
    },

    getTodoList: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.userId;
        if (userIdInput) {
          const trelloCloneTodoData = await TrelloCloneTodoData.scan({ userId: { eq: userIdInput } }).exec();
          const trelloCloneTodoDataList = trelloCloneTodoData.toJSON();

          response = {
            message: 'getTodoList',
            todo: trelloCloneTodoDataList,
          };
        }
      }

      return response;
    },

    getInProgressList: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.userId;
        if (userIdInput) {
          const trelloCloneInProgressData = await TrelloCloneInProgressData.scan({
            userId: { eq: userIdInput },
          }).exec();
          const trelloCloneInProgressDataList = trelloCloneInProgressData.toJSON();

          response = {
            message: 'getInProgressList',
            inProgress: trelloCloneInProgressDataList,
          };
        }
      }

      return response;
    },

    getDoneList: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.userId;
        if (userIdInput) {
          const trelloCloneDoneData = await TrelloCloneDoneData.scan({ userId: { eq: userIdInput } }).exec();
          const trelloCloneDoneDataList = trelloCloneDoneData.toJSON();

          response = {
            message: 'getDoneList',
            done: trelloCloneDoneDataList,
          };
        }
      }

      return response;
    },
  },

  Mutation: {
    signup: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const emailInput = args.data.email;
      const passwordInput = args.data.password;
      const firstNameInput = args.data.firstName;
      const lastNameInput = args.data.lastName;

      if (emailInput && passwordInput && firstNameInput && lastNameInput) {
        const trelloCloneUser = await TrelloCloneUser.scan({ email: { eq: emailInput } }).exec();
        const trelloCloneUserList = trelloCloneUser.toJSON();
        if (_.isEmpty(trelloCloneUserList)) {
          const newTrelloCloneUser = new TrelloCloneUser({
            id: uuidv4(),
            email: emailInput,
            password: bcrypt.hashSync(passwordInput),
            firstName: firstNameInput,
            lastName: lastNameInput,
          });
          await newTrelloCloneUser.save();

          response = {
            message: 'signup',
          };
        } else {
          response = {
            message: 'signup fail, email already exists',
          };
        }
      }

      return response;
    },

    login: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const emailInput = args.data.email;
      const passwordInput = args.data.password;

      if (emailInput && passwordInput) {
        const trelloCloneUser = await TrelloCloneUser.scan({ email: { eq: emailInput } }).exec();
        const trelloCloneUserList = trelloCloneUser.toJSON();

        if (trelloCloneUserList) {
          const trelloCloneUserFromDB = trelloCloneUserList[0];
          const hashPassword = trelloCloneUserFromDB.password;
          const isPasswordValid = bcrypt.compareSync(passwordInput, hashPassword);
          if (isPasswordValid) {
            const token = jwt.sign({ email: emailInput }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

            response = {
              message: 'login',
              token: token,
              userId: trelloCloneUserFromDB.id,
            };
          } else {
            response = {
              message: 'login error, wrong password',
              token: '',
              userId: '',
            };
          }
        }
      }

      return response;
    },

    addTodoData: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.data.userId;
        const titleInput = args.data.title;
        const descriptionInput = args.data.description;
        if (userIdInput) {
          const newTrelloCloneTodoData = new TrelloCloneTodoData({
            id: uuidv4(),
            userId: userIdInput,
            title: titleInput,
            description: descriptionInput,
          });
          await newTrelloCloneTodoData.save();

          response = {
            message: 'addTodo',
          };
        }
      }

      return response;
    },

    addInProgressData: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.data.userId;
        const titleInput = args.data.title;
        const descriptionInput = args.data.description;
        if (userIdInput) {
          const newTrelloCloneInProgressData = new TrelloCloneInProgressData({
            id: uuidv4(),
            userId: userIdInput,
            title: titleInput,
            description: descriptionInput,
          });
          await newTrelloCloneInProgressData.save();

          response = {
            message: 'addInProgress',
          };
        }
      }

      return response;
    },

    addDoneData: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.data.userId;
        const titleInput = args.data.title;
        const descriptionInput = args.data.description;
        if (userIdInput) {
          const newTrelloCloneDoneData = new TrelloCloneDoneData({
            id: uuidv4(),
            userId: userIdInput,
            title: titleInput,
            description: descriptionInput,
          });
          await newTrelloCloneDoneData.save();

          response = {
            message: 'addDone',
          };
        }
      }

      return response;
    },
  },

  JSON: {
    __serialize(value: any): any {
      return GraphQLJSON.parseValue(value);
    },
  },
};

export default resolvers;
