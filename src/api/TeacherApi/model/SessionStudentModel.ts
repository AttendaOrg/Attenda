import { UserRole } from '../../index';

export interface SessionStudentInterface {
  studentId: string;
  classId: string;
  sessionId: string;
  present?: boolean;
  whom?: UserRole;
  sessionTime?: Date;
  lastUpdateTime?: Date;
  studentName: string | null;
}

export default class SessionStudentModel implements SessionStudentInterface {
  studentId: string;

  present = false;

  whom: UserRole = UserRole.STUDENT;

  sessionTime: Date = new Date();

  lastUpdateTime: Date = new Date();

  classId: string;

  sessionId: string;

  studentName: string | null;

  constructor(data: SessionStudentInterface) {
    const {
      lastUpdateTime,
      sessionTime,
      whom,
      present,
      studentId,
      classId,
      sessionId,
      studentName,
    } = data;

    if (lastUpdateTime !== undefined) this.lastUpdateTime = lastUpdateTime;
    if (sessionTime !== undefined) this.sessionTime = sessionTime;
    if (whom !== undefined) this.whom = whom;
    if (present !== undefined) this.present = present;
    this.studentId = studentId;
    this.classId = classId;
    this.sessionId = sessionId;
    this.studentName = studentName;
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
      studentName,
    } = data;
    const obj: Partial<SessionStudentInterface> = {};

    if (present !== undefined) obj.present = present;
    if (sessionTime !== undefined) obj.sessionTime = sessionTime;
    if (studentId !== undefined) obj.studentId = studentId;
    if (whom !== undefined) obj.whom = whom;
    if (lastUpdateTime !== undefined) obj.lastUpdateTime = lastUpdateTime;
    if (sessionId !== undefined) obj.sessionId = sessionId;
    if (classId !== undefined) obj.classId = classId;
    if (studentName !== undefined) obj.studentName = studentName;

    return obj;
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  setStudentName(name: string): void {
    this.studentName = name;
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
      studentName,
    } = this;

    return {
      studentId,
      present,
      whom,
      sessionTime,
      lastUpdateTime,
      classId,
      sessionId,
      studentName,
    };
  }
}
