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
    params: { classId },
  } = context;

  const classCollection = await admin
    .firestore()
    .collection(`/classes/${classId}/joined_students`)
    .get();

  const totalStudent = classCollection.docs.length;

  await admin.firestore().doc(`/classes/${classId}`).update({
    totalStudent,
  });
};

export const OnStudentJoin = functions.firestore
  .document("/classes/{classId}/joined_students/{studentId}")
  .onCreate(updateStudentCount);

export const OnStudentLeave = functions.firestore
  .document("/classes/{classId}/joined_students/{studentId}")
  .onDelete(updateStudentCount);
