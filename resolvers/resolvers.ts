import GraphQLJSON from 'graphql-type-json';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import TrelloCloneUser from '../model/TrelloCloneUser';

const resolvers = {
  Query: {
    getTodoList: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const userIdInput = args.userId;
        if (userIdInput) {
          response = {
            message: 'getTodoList',
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
          response = {
            message: 'getInProgressList',
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
          response = {
            message: 'getDoneList',
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
  },

  JSON: {
    __serialize(value: any): any {
      return GraphQLJSON.parseValue(value);
    },
  },
};

export default resolvers;
