/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const updateStudentCount = async (
  _snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<void> => {
  functions.logger.info("updateStudentCount", { structuredData: true });

  const {
    params: { documentId },
  } = context;

  const classCollection = await admin
    .firestore()
    .collection(`/classes/${documentId}/joined_students`)
    .get();

  const totalStudent = classCollection.docs.length;

  await admin.firestore().doc(`/classes/${documentId}`).update({
    totalStudent,
  });
};

export const Create = functions.firestore
  .document("/classes/{documentId}/joined_students/{studentId}")
  .onCreate(updateStudentCount);

export const Delete = functions.firestore
  .document("/classes/{documentId}/joined_students/{studentId}")
  .onDelete(updateStudentCount);
