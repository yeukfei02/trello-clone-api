import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import TrelloCloneInProgressData from '../model/TrelloCloneInProgressData';

export const getInProgressListControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const addInProgressDataControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<any> => {
  let response = {};

  const token = context.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
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
};

export const deleteInProgressDataByIdControllerFunc = async (
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
      const trelloCloneInProgressData = await TrelloCloneInProgressData.get({ id: idInput });
      if (trelloCloneInProgressData) await trelloCloneInProgressData.delete();

      response = {
        message: 'deleteInProgressDataById',
      };
    }
  }

  return response;
};
