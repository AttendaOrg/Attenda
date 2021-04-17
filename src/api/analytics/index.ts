/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const ENV_URL = process.env.REACT_NATIVE_ANALYTICS_ROOT_URL;
const ENV_PROD_URL =
  process.env.REACT_NATIVE_ANALYTICS_PRODUCTION_ROOT_URL ??
  'http://localhost:5005';

console.log(
  process.env.REACT_NATIVE_ANALYTICS_ROOT_URL,
  process.env.REACT_NATIVE_ANALYTICS_PRODUCTION_ROOT_URL,
);
console.log(ENV_URL, ENV_PROD_URL);

const ANALYTICS_ROOT_URL: string =
  process.env.NODE_ENV === 'production'
    ? ENV_PROD_URL
    : ENV_URL ?? 'http://localhost:5005';

interface AnalyticsSendData {
  name: string;
  count: number;
}

export enum AnalyticsApiDocs {
  USER_ROLE_READ = 'user_role (read)',
  USER_ROLE_WRITE = 'user_role (write)',
  USER_ROLE_UPDATE = 'user_role (UPDATE)',
  ACC_INFO_READ = 'acc_info (read)',
  ACC_INFO_WRITE = 'acc_info (write)',
  ACC_INFO_UPDATE = 'acc_info (update)',
  CLASS_READ = 'class (read)',
  CLASS_WRITE = 'class (write)',
  CLASS_UPDATE = 'class (update)',
  INVITE_EMAIL_READ = 'invite_email (read)',
  INVITE_EMAIL_WRITE = 'invite_email (write)',
  INVITE_EMAIL_UPDATE = 'invite_email (update)',
  JOINED_STUDENTS_READ = 'joined_students (read)',
  JOINED_STUDENTS_WRITE = 'joined_students (write)',
  JOINED_STUDENTS_UPDATE = 'joined_students (update)',
  CLASS_SESSION_READ = 'class_session (read)',
  CLASS_SESSION_WRITE = 'class_session (write)',
  CLASS_SESSION_UPDATE = 'class_session (update)',
  CLASS_SESSION_DELETE = 'class_session (delete)',
  CLASS_SESSION_STUDENTS_READ = 'class_session_students (read)',
  CLASS_SESSION_STUDENTS_WRITE = 'class_session_students (write)',
  CLASS_SESSION_STUDENTS_UPDATE = 'class_session_students (update)',
  CLASS_SESSION_STUDENTS_DELETE = 'class_session_students (delete)',
  CLASS_CARD_ICON_READ = 'class_card_icon (read)',
  CLASS_CARD_ICON_WRITE = 'class_card_icon (write)',
  CLASS_CARD_ICON_UPDATE = 'class_card_icon (update)',
}

export default class AnalyticsApi {
  static readonly USER_ID_STORE_NAME = 'userId';

  private userId: string;

  private sessionId: string;

  private buffer: AnalyticsSendData[] = [];

  private isLocked = false;

  constructor() {
    let uId = '';
    const randomUid = uuid();

    // if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    //   const { LocalStorage } = require('node-localstorage');

    //   localStorage = new LocalStorage('./scratch');
    //   const localUId = localStorage.getItem(AnalyticsApi.USER_ID_STORE_NAME);

    //   if (typeof localUId !== 'string') uId = randomUid;
    //   else uId = localUId;

    //   localStorage.setItem(AnalyticsApi.USER_ID_STORE_NAME, randomUid);
    // } else {
    const AsyncStorage = require('@react-native-async-storage/async-storage')
      .default;

    const localUId = AsyncStorage.getItem(AnalyticsApi.USER_ID_STORE_NAME);

    if (typeof localUId !== 'string') uId = randomUid;
    else uId = localUId;

    AsyncStorage.setItem(AnalyticsApi.USER_ID_STORE_NAME, randomUid);
    // }

    this.userId = uId;
    this.sessionId = uuid();

    // this.sendPing();
  }

  sendPing = async (): Promise<boolean> => {
    this.isLocked = true;
    try {
      const resp = await axios.get(`${ANALYTICS_ROOT_URL}/api/hi`);

      console.log(resp);

      this.isLocked = false;
      this.startLoop();

      return true;
    } catch (e) {
      console.log(e);
    }

    return false;
  };

  private startLoop = async (): Promise<void> => {
    if (this.buffer.length !== 0) {
      const [data, ...rest] = this.buffer;

      console.log(`Processing buffer buffer[${0}]`, this.buffer[0]);

      await this.sendDataToServer(data);

      this.buffer = [...rest];

      this.startLoop();
    }
  };

  private sendDataToServer = async (data: AnalyticsSendData): Promise<void> => {
    await axios.post(`${ANALYTICS_ROOT_URL}/api/add`, {
      ...data,
      userId: this.userId,
      sessionId: this.sessionId,
      time: new Date().toISOString(),
    });
  };

  sendData(data: AnalyticsSendData): void {
    if (this.buffer.length === 0 && this.isLocked === false)
      this.sendDataToServer(data);
    else this.buffer.push(data);
  }

  sendSingle(name: string): void {
    this.sendData({
      name,
      count: 1,
    });
  }

  sendMultiple(name: string, count: number): void {
    this.sendData({
      name,
      count,
    });
  }
}

export const analyticsApi = new AnalyticsApi();
