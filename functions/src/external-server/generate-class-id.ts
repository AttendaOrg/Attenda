import * as admin from "firebase-admin";
import { generateClassIdFun } from "../shared/GenerateClassId";

let firstTime = true;

const generateClassId = async (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<void> => {
  if (!firstTime) {
    snapshot.docChanges().map(async (e) => {
      if (e.type === "added") {
        const classId = e.doc.id;
        generateClassIdFun(classId);
      }
    });
  } else firstTime = false;
};

admin.firestore().collection("/classes").onSnapshot(generateClassId);
