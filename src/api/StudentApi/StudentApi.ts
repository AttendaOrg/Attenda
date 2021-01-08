import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';

export default class StudentApi extends AuthApi {
  static readonly ROOT_COLLECTION_NAME = 'teachers';

  createUser = async (name: string): Promise<WithError<boolean>> => {
    if (await this.isLoggedIn()) {
      try {
        await firebase
          .firestore()
          .collection(StudentApi.ROOT_COLLECTION_NAME)
          .add({ name });

        return this.success(true);
      } catch (error) {
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
      }
    } else {
      // user is not logged in
      return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
    }
  };
}
