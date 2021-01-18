import firebase from 'firebase';
import { firebaseConfig } from '../util/configs/firebase';

const DEFAULT_HOST = 'localhost';

export interface BaseApiOptions {
  /**
   * for using the firebase emulator
   * @default false
   */
  useEmulator: boolean;
  /**
   * host for firebase emulator
   * @default localhost
   */
  host: string;

  /**
   * store the user login session
   * for test files disable it
   */
  persistence: boolean;
}

export enum BasicErrors {
  USER_NOT_AUTHENTICATED,
  EXCEPTION,
  AUTH_EMAIL_ALREADY_IN_USE,
  AUTH_WRONG_PASSWORD,
  AUTH_USER_NOT_FOUND,
  NO_CLASS_FOUND,
  INVALID_INPUT,
  MAC_ID_DOES_NOT_MATCH,
}

export const convertErrorToMsg = (errCode: BasicErrors | null): string => {
  switch (errCode) {
    case BasicErrors.USER_NOT_AUTHENTICATED:
      return 'USER_NOT_AUTHENTICATED';
    case BasicErrors.EXCEPTION:
      return 'EXCEPTION';
    case BasicErrors.AUTH_EMAIL_ALREADY_IN_USE:
      return 'AUTH_EMAIL_ALREADY_IN_USE';
    case BasicErrors.AUTH_WRONG_PASSWORD:
      return 'AUTH_WRONG_PASSWORD';
    case BasicErrors.AUTH_USER_NOT_FOUND:
      return 'AUTH_USER_NOT_FOUND';
    case BasicErrors.INVALID_INPUT:
      return 'INVALID_INPUT';
    default:
      return 'unknown';
  }
};

export type WithError<Success, Error = BasicErrors> = [
  Success | null,
  Error | null,
];

class BaseApi {
  options?: BaseApiOptions;

  static readonly BasicErrors = BasicErrors;

  static readonly convertErrorToMsg = convertErrorToMsg;

  static defaultOptions: BaseApiOptions = {
    host: DEFAULT_HOST,
    useEmulator: process.env.NODE_ENV === 'development',
    persistence: true,
  };

  static testOptions: BaseApiOptions = {
    host: DEFAULT_HOST,
    useEmulator: true,
    persistence: false,
  };

  constructor(options: Partial<BaseApiOptions> = {}) {
    // firebase has not been initialized

    if (firebase.apps.length === 0) {
      this.options = { ...BaseApi.defaultOptions, ...options };
      firebase.initializeApp(firebaseConfig);

      const host: string = options.host ?? DEFAULT_HOST;

      if (options.persistence ?? BaseApi.defaultOptions.persistence) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      }

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

  error = <T>(error: T): WithError<null, T> => {
    return [null, error];
  };

  success = <T>(success: T): WithError<T, null> => {
    return [success, null];
  };
}

export default BaseApi;
