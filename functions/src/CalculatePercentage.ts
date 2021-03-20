/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import SessionInfoModel, {
  SessionInfoInterface,
} from "./model/SessionInfoModel";
const CLASSES_COLLECTION_NAME = "classes";

// const CLASSES_INVITE_STUDENT_COLLECTION_NAME = "invite_students";

const CLASSES_JOINED_STUDENT_COLLECTION_NAME = "joined_students";

const CLASSES_SESSIONS_COLLECTION_NAME = "sessions";

const CLASSES_SESSIONS_STUDENT_COLLECTION_NAME = "sessions_students";

// #region functions
const getTotalSessionCount = async (classId: string): Promise<number> => {
  const totalMatchedSession = await admin
    .firestore()
    .collection(CLASSES_SESSIONS_COLLECTION_NAME)
    .where("classId", "==", classId)
    .where("isLive", "==", false)
    .get();

  return totalMatchedSession.docs.length;
};

const getAttendedSessionCount = async (
  classId: string,
  studentId: string
): Promise<number> => {
  const totalMatchedSession = await admin
    .firestore()
    .collection(CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
    .where("classId", "==", classId)
    .where("studentId", "==", studentId)
    .where("present", "==", true)
    .get();

  return totalMatchedSession.docs.length;
};
// #endregion

const CalculatePercentage = async (
  _snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  context: functions.EventContext
): Promise<void> => {
  functions.logger.info("CalculatePercentage", { structuredData: true });
  const d = _snapshot.after.data() as SessionInfoInterface;
  const info = new SessionInfoModel(d);

  if (info.isLive === true) {
    functions.logger.info("CalculatePercentage: session is running skip..", {
      structuredData: true,
    });
    return;
  }

  const { classId } = info;

  const totalNumOfSession: number = await getTotalSessionCount(classId);

  const joinedStudentCollections = await admin
    .firestore()
    .collection(CLASSES_COLLECTION_NAME)
    .doc(classId)
    .collection(CLASSES_JOINED_STUDENT_COLLECTION_NAME)
    .get();

  await Promise.all(
    joinedStudentCollections.docs
      .map((e) => e.id)
      .map(async (studentId) => {
        const studentAttendanceCount: number = await getAttendedSessionCount(
          classId,
          studentId
        );
        const totalAttendancePercentage =
          (studentAttendanceCount * 100) / totalNumOfSession;

        const studentDoc = await admin
          .firestore()
          .collection(CLASSES_COLLECTION_NAME)
          .doc(classId)
          .collection(CLASSES_JOINED_STUDENT_COLLECTION_NAME)
          .doc(studentId)
          .get();

        studentDoc.ref.update({
          totalAttendancePercentage,
        });
      })
  );
};

export const CalculatePercentageFunction = functions.firestore
  .document("/sessions/{sessionId}")
  .onUpdate(CalculatePercentage);

export const CalculatePercentageFunction2 = functions.firestore
  .document("/sessions/{sessionId}")
  .onCreate((s, q) => {
    functions.logger.info("OnCreate", { structuredData: true });
    console.log(s, q);
  });
