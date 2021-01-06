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
            message: 'getUserDetails',
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

          if (trelloCloneTodoDataList) {
            const formattedTrelloCloneTodoDataList = trelloCloneTodoDataList.map((item: any, i: number) => {
              const obj = {
                dataType: 'todo',
              };
              const newObj = Object.assign(item, obj);
              return newObj;
            });

            response = {
              message: 'getTodoList',
              todo: formattedTrelloCloneTodoDataList,
            };
          }
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

          if (trelloCloneInProgressDataList) {
            const formattedTrelloCloneInProgressDataList = trelloCloneInProgressDataList.map((item: any, i: number) => {
              const obj = {
                dataType: 'inProgress',
              };
              const newObj = Object.assign(item, obj);
              return newObj;
            });

            response = {
              message: 'getInProgressList',
              inProgress: formattedTrelloCloneInProgressDataList,
            };
          }
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

          if (trelloCloneDoneDataList) {
            const formattedTrelloCloneDoneDataList = trelloCloneDoneDataList.map((item: any, i: number) => {
              const obj = {
                dataType: 'done',
              };
              const newObj = Object.assign(item, obj);
              return newObj;
            });

            response = {
              message: 'getDoneList',
              done: formattedTrelloCloneDoneDataList,
            };
          }
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

    changePassword: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const idInput = args.data.id;
        const currentPasswordInput = args.data.currentPassword;
        const newPasswordInput = args.data.newPassword;

        if (idInput && currentPasswordInput && newPasswordInput) {
          const trelloCloneUser = await TrelloCloneUser.query({ id: idInput }).exec();
          const trelloCloneUserList = trelloCloneUser.toJSON();

          if (trelloCloneUserList) {
            const trelloCloneUserFromDB = trelloCloneUserList[0];
            const hashPasswordFromDB = trelloCloneUserFromDB.password;
            const isCurrentPasswordValid = bcrypt.compareSync(currentPasswordInput, hashPasswordFromDB);
            if (isCurrentPasswordValid) {
              const newHashPassword = bcrypt.hashSync(newPasswordInput);
              await TrelloCloneUser.update({ id: idInput }, { password: newHashPassword });

              response = {
                message: 'changePassword',
              };
            } else {
              response = {
                message: 'changePassword error, wrong current password',
              };
            }
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
            message: 'addTodoData',
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
            message: 'addInProgressData',
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
            message: 'addDoneData',
          };
        }
      }

      return response;
    },

    deleteTodoDataById: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const idInput = args.id;
        if (idInput) {
          const trelloCloneTodoData = await TrelloCloneTodoData.get({ id: idInput });
          if (trelloCloneTodoData) await trelloCloneTodoData.delete();

          response = {
            message: 'deleteTodoDataById',
          };
        }
      }

      return response;
    },

    deleteInProgressDataById: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const idInput = args.id;
        if (idInput) {
          const trelloCloneInProgressData = await TrelloCloneInProgressData.get({ id: idInput });
          if (trelloCloneInProgressData) await trelloCloneInProgressData.delete();

          response = {
            message: 'deleteInProgressDataById',
          };
        }
      }

      return response;
    },

    deleteDoneDataById: async (parent: any, args: any, context: any, info: any): Promise<any> => {
      let response = {};

      const token = context.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded) {
        const idInput = args.id;
        if (idInput) {
          const trelloCloneDoneData = await TrelloCloneDoneData.get({ id: idInput });
          if (trelloCloneDoneData) await trelloCloneDoneData.delete();

          response = {
            message: 'deleteDoneDataById',
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
