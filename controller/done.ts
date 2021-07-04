import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import TrelloCloneDoneData from '../model/TrelloCloneDoneData';

export const getDoneListControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const addDoneDataControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const deleteDoneDataByIdControllerFunc = async (
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
      const trelloCloneDoneData = await TrelloCloneDoneData.get({ id: idInput });
      if (trelloCloneDoneData) await trelloCloneDoneData.delete();

      response = {
        message: 'deleteDoneDataById',
      };
    }
  }

  return response;
};
