import firebase from 'firebase';
import { firebaseConfig } from '../util/configs/firebase';

export interface BaseApiOptions {
  /**
   * for using the firebase emulator
   * @default false
   */
  useEmulator?: boolean;
  /**
   * host for firebase emulator
   * @default localhost
   */
  host?: string;
}

class BaseApi {
  options?: BaseApiOptions;

  static defaultOptions: BaseApiOptions = {
    host: 'localhost',
    useEmulator: process.env.NODE_ENV === 'development',
  };

  constructor(options: BaseApiOptions = BaseApi.defaultOptions) {
    // firebase has not been initialized
    if (firebase.apps.length === 0) {
      this.options = options;

      firebase.initializeApp(firebaseConfig);

      const host: string = options.host || 'localhost';

      firebase.firestore().useEmulator(host, 8080);
      firebase.database().useEmulator(host, 9000);

      const disableWarnings = {
        disableWarnings: true,
      };

      // this is the bug of firebase package
      // firebase package doesn't provide the right typings
      // @see https://github.com/firebase/firebase-js-sdk/issues/4223
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      firebase.auth().useEmulator(`http://${host}:9099`, disableWarnings);
    }
  }
}

export default BaseApi;
