import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherClass from './model/TeacherClass';

export default class TeacherApi extends AuthApi {
  static readonly ROOT_COLLECTION_NAME = 'teachers';

  static readonly CLASSES_COLLECTION_NAME = 'classes';

  createUser = async (name: string): Promise<WithError<string>> => {
    if (await this.isLoggedIn()) {
      try {
        const doc = await firebase
          .firestore()
          .collection(`${TeacherApi.ROOT_COLLECTION_NAME}`)
          .add({ name });

        return this.success(doc.id);
      } catch (error) {
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
      }
    } else {
      // user is not logged in
      return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
    }
  };

  createClass = async (
    userId: string,
    teacherClass: TeacherClass,
  ): Promise<WithError<string>> => {
    try {
      const doc = await firebase
        .firestore()
        .collection(
          `${TeacherApi.ROOT_COLLECTION_NAME}/${userId}/${TeacherApi.CLASSES_COLLECTION_NAME}`,
        )
        .add(teacherClass.toJson());

      return this.success(doc.id);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAllClass = async (userId: string): Promise<WithError<TeacherClass[]>> => {
    try {
      const classes = await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .get();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cc = classes.docs.map(e => new TeacherClass(e.data() as any));

      return this.success(cc);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  isClassExist = async (
    userId: string,
    classId: string,
  ): Promise<WithError<boolean>> => {
    try {
      const doc = await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .get();

      return this.success(doc.exists);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateClass = async (
    userId: string,
    title: string,
    section: string,
    description?: string,
  ): Promise<WithError<boolean>> => {
    try {
      await firebase
        .firestore()
        .collection(
          `${TeacherApi.ROOT_COLLECTION_NAME}/${userId}/${TeacherApi.CLASSES_COLLECTION_NAME}`,
        )
        .add({
          class_code: '',
          description: description ?? '',
          invite_link: '',
          isActiveInvite: false,
          section,
          title,
        });

      return this.success(true);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };
}
