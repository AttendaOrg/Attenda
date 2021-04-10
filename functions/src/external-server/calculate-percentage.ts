import * as admin from "firebase-admin";
import {
  CalculatePercentageFun,
  CalculateSingleStudentPercentageFun,
} from "../shared/CalculatePercentage";

let firstTimeCalculatePercentage = true;

const calculatePercentage = async (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<void> => {
  if (!firstTimeCalculatePercentage) {
    snapshot.docChanges().map(async (e) => {
      if (e.type === "modified") {
        CalculatePercentageFun(e.doc.data());
      }
    });
  } else firstTimeCalculatePercentage = false;
};

let firstTimeCalculateSingleStudentPercentage = true;
const calculateSingleStudentPercentage = async (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<void> => {
  if (!firstTimeCalculateSingleStudentPercentage) {
    snapshot.docChanges().map(async (e) => {
      if (e.type === "modified") {
        CalculateSingleStudentPercentageFun(e.doc.data());
      }
    });
  } else firstTimeCalculateSingleStudentPercentage = false;
};

admin.firestore().collection("/sessions").onSnapshot(calculatePercentage);

admin
  .firestore()
  .collection("/sessions_students")
  .onSnapshot(calculateSingleStudentPercentage);
