/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';

interface StudentApiInterface {
  /**
   * validate if the user can join the class
   * @param classCode
   * @param rollNo
   */
  validateClassJoin(
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean>>;
  /**
   * join the class
   * @param classCode
   * @param rollNo
   */
  joinClass(classCode: string, rollNo: string): Promise<WithError<boolean>>;

  /**
   * get the list of all enrolled class list
   * @param page
   * @returns unknown TODO: figure out the data structure
   */
  getEnrolledClassList(page: string): Promise<WithError<unknown[]>>;

  // TODO: get the class info from TeacherApi ?
  // getClassInfo(classCode: string): ClassInfo;

  /**
   * give present to the class session
   * @param classId
   * @param sessionId
   * TODO: don't send the mac id to the server send a hash of it for privacy reason
   * @param macId
   */
  giveResponse(
    classId: string,
    sessionId: string,
    macId: string,
  ): Promise<WithError<boolean>>;
  /**
   * get attendance report of a class
   * @param classId
   * @returns unknown TODO: figure out the data structure
   */
  getAttendanceReport(classId: string): Promise<WithError<unknown>>;
}

export default class StudentApi extends AuthApi implements StudentApiInterface {
  validateClassJoin = (
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean, BasicErrors>> => {
    throw new Error('Method not implemented.');
  };

  joinClass = (
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean, BasicErrors>> => {
    throw new Error('Method not implemented.');
  };

  getEnrolledClassList = (
    page: string,
  ): Promise<WithError<unknown[], BasicErrors>> => {
    throw new Error('Method not implemented.');
  };

  giveResponse = (
    classId: string,
    sessionId: string,
    macId: string,
  ): Promise<WithError<boolean, BasicErrors>> => {
    throw new Error('Method not implemented.');
  };

  getAttendanceReport = (
    classId: string,
  ): Promise<WithError<unknown, BasicErrors>> => {
    throw new Error('Method not implemented.');
  };

  static readonly ROOT_COLLECTION_NAME = 'students';
}
