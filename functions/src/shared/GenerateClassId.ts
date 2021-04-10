/* eslint-disable object-curly-spacing */
import * as admin from "firebase-admin";
import { RandomIdGenerator } from "../util/randomId";

export const generateClassIdFun = async (classId: string) => {
  await admin.firestore().doc(`/classes/${classId}`).update({
    classCode: RandomIdGenerator.generate(),
  });
};
