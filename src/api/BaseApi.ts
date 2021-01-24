import firebase from 'firebase';
import { firebaseConfig } from '../util/configs/firebase';

const DEFAULT_HOST: string =
  process.env.REACT_NATIVE_FIREBASE_EMULATOR_HOST ?? 'localhost';
const defaultUseEmulator = process.env.NODE_ENV === 'development';

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

/**
 * by default firebase services connect to emulator in development mode
 * if you want to change the behavior pass **{useEmulator: true}** in constructor
 */
class BaseApi {
  options?: BaseApiOptions;

  static readonly BasicErrors = BasicErrors;

  static readonly convertErrorToMsg = convertErrorToMsg;

  static defaultOptions: BaseApiOptions = {
    host: DEFAULT_HOST,
    useEmulator: defaultUseEmulator,
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
      const defaultOptions =
        process.env.NODE_ENV === 'testing'
          ? BaseApi.testOptions
          : BaseApi.defaultOptions;

      this.options = { ...defaultOptions, ...options };
      firebase.initializeApp(firebaseConfig);

      const host: string = options.host ?? DEFAULT_HOST;

      // if the env is testing we do not need the persistence
      if (process.env.NODE_ENV !== 'testing') {
        if (options.persistence ?? BaseApi.defaultOptions.persistence) {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        }
        // for some reason firestore is not respecting useEmulator in public ip
        // `firebase.firestore().useEmulator` works fine in node environment
        // bellow code is for web and android only
        // if the bellow code used in a node env the request doesn't complete
        firebase.firestore().settings({
          experimentalForceLongPolling: true,
          merge: true,
        });
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
