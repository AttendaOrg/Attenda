/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import SessionInfoModel, {
  SessionInfoInterface,
} from "./model/SessionInfoModel";
import SessionStudentModel, {
  SessionStudentInterface,
} from "./model/SessionStudentModel";
const CLASSES_COLLECTION_NAME = "classes";

// const CLASSES_INVITE_STUDENT_COLLECTION_NAME = "invite_students";

const CLASSES_JOINED_STUDENT_COLLECTION_NAME = "joined_students";

const CLASSES_SESSIONS_COLLECTION_NAME = "sessions";

const CLASSES_SESSIONS_STUDENT_COLLECTION_NAME = "sessions_students";

// #region functions

const parseHrtimeToSeconds = (hrtime: [number, number]): string =>
  (hrtime[0] + hrtime[1] / 1e9).toFixed(3);

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
  try {
    const startTime = process.hrtime();
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

          console.log(
            `CalculatePercentage:(${studentId}) totalAttendancePercentage(${totalAttendancePercentage}) = (${studentAttendanceCount} * 100) / ${totalNumOfSession};`
          );

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
    const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    console.log("It takes " + elapsedSeconds + "seconds");
    functions.logger.info(
      "CalculatePercentage: It takes " + elapsedSeconds + "seconds",
      {
        structuredData: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const CalculateSingleStudentPercentage = async (
  _snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  context: functions.EventContext
): Promise<void> => {
  try {
    const startTime = process.hrtime();
    functions.logger.info(`CalculateSingleStudentPercentage`);
    const d = _snapshot.after.data() as SessionStudentInterface;
    const info = new SessionStudentModel(d);

    const { studentId, classId } = info;

    const totalNumOfSession: number = await getTotalSessionCount(classId);

    const studentAttendanceCount: number = await getAttendedSessionCount(
      classId,
      studentId
    );
    const totalAttendancePercentage =
      (studentAttendanceCount * 100) / totalNumOfSession;

    console.log(
      `CalculateSingleStudentPercentage: totalAttendancePercentage(${totalAttendancePercentage}) = (${studentAttendanceCount} * 100) / ${totalNumOfSession};`
    );

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

    const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    console.log("It takes " + elapsedSeconds + "seconds");
    functions.logger.info(
      "CalculateSingleStudentPercentage: It takes " +
        elapsedSeconds +
        "seconds",
      {
        structuredData: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const CalculatePercentageFunction = functions.firestore
  .document("/sessions/{sessionId}")
  .onUpdate(CalculatePercentage);

export const CalculateSingleStudentPercentageFunction = functions.firestore
  .document("/sessions_students/{SessionStudentId}")
  .onUpdate(CalculateSingleStudentPercentage);
