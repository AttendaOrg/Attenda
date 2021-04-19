import * as admin from "firebase-admin";
import ClassCardIconModel, {
  ClassCardIconCategory,
  ClassCardIconProps,
} from "../model/ClassCardIconModel";

let cacheList: ClassCardIconModel[] = [];

export const pickRandomClassCardIconArr = <T>(arr: T[] = []) => {
  const len = arr.length;
  const random = Math.random();
  return arr[Math.round(len * random)];
};

export const getImageList = async (): Promise<ClassCardIconModel[]> => {
  console.log("cacheList", cacheList);

  if (cacheList.length > 0) return cacheList;

  const data = await admin
    .firestore()
    .collection("class_card_icons")
    .where("category", "==", ClassCardIconCategory.GENERAL)
    .get();

  cacheList = data.docs.map(
    (doc) =>
      new ClassCardIconModel((doc.data() as unknown) as ClassCardIconProps)
  );

  console.log("cacheList", cacheList);
  return cacheList;
};

export const updateClassCardIcon = async (
  classId: string,
  classIcon: string
) => {
  await admin.firestore().collection("classes").doc(classId).update({
    classIcon,
  });
};
