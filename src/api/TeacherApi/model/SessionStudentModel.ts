import { UserRole } from '../../index';

export interface SessionStudentInterface {
  studentId: string;
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

  constructor(data: SessionStudentInterface) {
    const { lastUpdateTime, sessionTime, whom, present, studentId } = data;

    if (lastUpdateTime !== undefined) this.lastUpdateTime = lastUpdateTime;
    if (sessionTime !== undefined) this.sessionTime = sessionTime;
    if (whom !== undefined) this.whom = whom;
    if (present !== undefined) this.present = present;
    this.studentId = studentId;
  }

  // noinspection DuplicatedCode
  static Update(
    data: Partial<SessionStudentInterface>,
  ): Partial<SessionStudentInterface> {
    const { lastUpdateTime, present, sessionTime, studentId, whom } = data;
    const obj: Partial<SessionStudentInterface> = {};

    if (present !== undefined) obj.present = present;
    if (sessionTime !== undefined) obj.sessionTime = sessionTime;
    if (studentId !== undefined) obj.studentId = studentId;
    if (whom !== undefined) obj.whom = whom;
    if (lastUpdateTime !== undefined) obj.lastUpdateTime = lastUpdateTime;

    return obj;
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  toJson(): SessionStudentInterface {
    const { studentId, present, whom, sessionTime, lastUpdateTime } = this;

    return {
      studentId,
      present,
      whom,
      sessionTime,
      lastUpdateTime,
    };
  }
}
