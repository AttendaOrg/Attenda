/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import ClassCardIconModel from "./model/ClassCardIconModel";
import {
  getImageList,
  pickRandomClassCardIconArr,
  updateClassCardIcon,
} from "./shared/PickRandomClassCardIcon";

const generateClassId = async (
  _snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<void> => {
  functions.logger.info("generateClassId", { structuredData: true });

  const {
    params: { classId },
  } = context;

  const images = await getImageList();
  const selectedIcon = pickRandomClassCardIconArr<ClassCardIconModel>(images);
  console.log(`selectedIcon ${selectedIcon}`);

  await updateClassCardIcon(classId, selectedIcon.iconData);
};

export const GenerateClassIdFunction = functions.firestore
  .document("/classes/{classId}")
  .onCreate(generateClassId);
