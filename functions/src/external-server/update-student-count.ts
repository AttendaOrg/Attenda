import * as admin from "firebase-admin";
import { updateStudentCountFun } from "../shared/UpdateStudentCount";

let firstTime = true;

admin
  .firestore()
  .collectionGroup("joined_students")
  .onSnapshot((snapshot) => {
    if (!firstTime) {
      snapshot.docChanges().map(async (e) => {
        console.log("update student count " + e.type);
        const classId = e?.doc?.ref?.parent?.parent?.id;

        if (
          e.type === "added" ||
          e.type === "removed" ||
          e.type === "modified"
        ) {
          if (classId) {
            await updateStudentCountFun(classId);
          } else {
            console.log("class id not found ");
          }
        } else {
          console.log("skipping ");
        }
      });
    } else firstTime = false;
  });
