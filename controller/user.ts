import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import TrelloCloneUser from '../model/TrelloCloneUser';

export const getUserDetailsControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const signupControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
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
};

export const loginControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
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
        const token = jwt.sign({ email: emailInput }, process.env.JWT_SECRET ? process.env.JWT_SECRET : '', {
          expiresIn: '1d',
        });

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
};

export const changePasswordControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};
