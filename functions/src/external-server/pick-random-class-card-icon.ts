import * as admin from "firebase-admin";
import ClassCardIconModel from "../model/ClassCardIconModel";
import {
  getImageList,
  pickRandomClassCardIconArr,
  updateClassCardIcon,
} from "../shared/PickRandomClassCardIcon";

let firstTime = true;

const pickRandomClassCardIcon = async (
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<void> => {
  if (!firstTime) {
    snapshot.docChanges().map(async (e) => {
      if (e.type === "added") {
        const classId = e.doc.id;
        const images = await getImageList();
        const selectedIcon = pickRandomClassCardIconArr<ClassCardIconModel>(
          images
        );
        console.log(`selectedIcon ${selectedIcon}`);

        await updateClassCardIcon(classId, selectedIcon.iconData);
      }
    });
  } else firstTime = false;
};

admin.firestore().collection("/classes").onSnapshot(pickRandomClassCardIcon);
