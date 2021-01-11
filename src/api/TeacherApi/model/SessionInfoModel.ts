export interface SessionInfoInterface {
  classId: string;
  teacherId: string;
  sessionDate?: Date;
  lastUpdateTime?: Date;
  isLive?: boolean;
  macId: string;
}

export default class SessionInfoModel implements SessionInfoInterface {
  classId: string;

  teacherId: string;

  sessionDate: Date = new Date();

  lastUpdateTime: Date = new Date();

  isLive?: boolean = true;

  macId: string;

  constructor(data: SessionInfoInterface) {
    const {
      isLive,
      lastUpdateTime,
      sessionDate,
      teacherId,
      classId,
      macId,
    } = data;

    this.classId = classId;
    this.teacherId = teacherId;
    this.macId = macId;
    if (sessionDate !== undefined) this.sessionDate = sessionDate;
    if (lastUpdateTime !== undefined) this.lastUpdateTime = lastUpdateTime;
    if (isLive !== undefined) this.isLive = isLive;
  }

  // noinspection DuplicatedCode
  static UpdateData(
    data: Partial<SessionInfoInterface>,
  ): Partial<SessionInfoInterface> {
    const {
      isLive,
      lastUpdateTime,
      sessionDate,
      teacherId,
      classId,
      macId,
    } = data;
    const obj: Partial<SessionInfoInterface> = {};

    if (isLive !== undefined) obj.isLive = isLive;
    if (lastUpdateTime !== undefined) obj.lastUpdateTime = lastUpdateTime;
    if (sessionDate !== undefined) obj.sessionDate = sessionDate;
    if (teacherId !== undefined) obj.teacherId = teacherId;
    if (classId !== undefined) obj.classId = classId;
    if (macId !== undefined) obj.macId = macId;

    return obj;
  }

  toJson(): SessionInfoInterface {
    const {
      isLive,
      lastUpdateTime,
      sessionDate,
      teacherId,
      classId,
      macId,
    } = this;

    return {
      isLive,
      lastUpdateTime,
      sessionDate,
      teacherId,
      classId,
      macId,
    };
  }
}
