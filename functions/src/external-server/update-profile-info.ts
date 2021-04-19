import * as admin from "firebase-admin";
import AccountInfo, {
  AccountInfoProps,
  UserRole,
} from "../model/AccountInfoModel";

let firstTime = true;

const updateJoinClassData = async (
  studentId: string,
  profilePicUrl: string | null = null
): Promise<void> => {
  const joinedStudents = await admin
    .firestore()
    .collectionGroup("joined_students")
    .where("studentId", "==", studentId)
    .get();

  const batch = admin.firestore().batch();

  joinedStudents.docs.forEach((doc) => {
    console.log(`update joined class info`);

    batch.update(doc.ref, {
      profilePicUrl,
    });
  });
  await batch.commit();
};

const updateSessionStudentData = async (
  studentId: string,
  profilePicUrl: string | null = null
): Promise<void> => {
  const joinedStudents = await admin
    .firestore()
    .collection("sessions_students")
    .where("studentId", "==", studentId)
    .get();

  const batch = admin.firestore().batch();

  joinedStudents.docs.forEach((doc) => {
    console.log(`update session student info`);

    batch.update(doc.ref, {
      profilePicUrl,
    });
  });
  await batch.commit();
};

const update_acc_info = async (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<void> => {
  console.log("update_acc_info");

  if (!firstTime) {
    snapshot.docChanges().map(async (e) => {
      if (e.type === "modified") {
        const userId = e.doc.id;
        const infoData = e.doc.data() as AccountInfoProps;
        const accInfo = new AccountInfo(infoData);
        if (accInfo.role === UserRole.STUDENT) {
          await updateJoinClassData(userId, accInfo.profilePicUrl);
          await updateSessionStudentData(userId, accInfo.profilePicUrl);
        }
      }
    });
  } else firstTime = false;
};

admin.firestore().collection("/acc_metadata").onSnapshot(update_acc_info);
