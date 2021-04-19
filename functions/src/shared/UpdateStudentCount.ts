import * as admin from "firebase-admin";
export const updateStudentCountFun = async (classId: string): Promise<void> => {
  const classCollection = await admin
    .firestore()
    .collection(`/classes/${classId}/joined_students`)
    .get();

  const totalStudent = classCollection.docs.length;

  await admin.firestore().doc(`/classes/${classId}`).update({
    totalStudent,
  });
};
