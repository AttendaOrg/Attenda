/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { RandomIdGenerator } from "./util/randomId";

const generateClassId = async (
  _snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<void> => {
  functions.logger.info("generateClassId", { structuredData: true });

  const {
    params: { classId },
  } = context;

  await admin.firestore().doc(`/classes/${classId}`).update({
    classCode: RandomIdGenerator.generate(),
  });
};

export const GenerateClassIdFunction = functions.firestore
  .document("/classes/{classId}")
  .onCreate(generateClassId);
