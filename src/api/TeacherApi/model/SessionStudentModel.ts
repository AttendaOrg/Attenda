import { UserRole } from '../../index';

export interface SessionStudentInterface {
  studentId: string;
  classId: string;
  sessionId: string;
  present?: boolean;
  whom?: UserRole;
  sessionTime?: Date;
  lastUpdateTime?: Date;
}

export default class SessionStudentModel implements SessionStudentInterface {
  studentId: string;

  present = false;

  whom: UserRole = UserRole.STUDENT;

  sessionTime: Date = new Date();

  lastUpdateTime: Date = new Date();

  classId: string;

  sessionId: string;

  constructor(data: SessionStudentInterface) {
    const {
      lastUpdateTime,
      sessionTime,
      whom,
      present,
      studentId,
      classId,
      sessionId,
    } = data;

    if (lastUpdateTime !== undefined) this.lastUpdateTime = lastUpdateTime;
    if (sessionTime !== undefined) this.sessionTime = sessionTime;
    if (whom !== undefined) this.whom = whom;
    if (present !== undefined) this.present = present;
    this.studentId = studentId;
    this.classId = classId;
    this.sessionId = sessionId;
  }

  // noinspection DuplicatedCode
  static Update(
    data: Partial<SessionStudentInterface>,
  ): Partial<SessionStudentInterface> {
    const {
      lastUpdateTime,
      present,
      sessionTime,
      studentId,
      whom,
      sessionId,
      classId,
    } = data;
    const obj: Partial<SessionStudentInterface> = {};

    if (present !== undefined) obj.present = present;
    if (sessionTime !== undefined) obj.sessionTime = sessionTime;
    if (studentId !== undefined) obj.studentId = studentId;
    if (whom !== undefined) obj.whom = whom;
    if (lastUpdateTime !== undefined) obj.lastUpdateTime = lastUpdateTime;
    if (sessionId !== undefined) obj.sessionId = sessionId;
    if (classId !== undefined) obj.classId = classId;

    return obj;
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  toJson(): SessionStudentInterface {
    const {
      studentId,
      present,
      whom,
      sessionTime,
      lastUpdateTime,
      sessionId,
      classId,
    } = this;

    return {
      studentId,
      present,
      whom,
      sessionTime,
      lastUpdateTime,
      classId,
      sessionId,
    };
  }
}
