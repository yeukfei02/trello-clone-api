import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import TrelloCloneTodoData from '../model/TrelloCloneTodoData';

export const getTodoListControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const addTodoDataControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const deleteTodoDataByIdControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};
