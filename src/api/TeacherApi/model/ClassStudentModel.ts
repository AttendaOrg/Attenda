export interface ClassStudentModelInterface {
  email: string;
  rollNo?: string;
  totalAttendancePercentage?: number;
  joined?: boolean;
  joinedDate?: Date | null;
  studentId?: string | null;
  archived?: boolean;
  studentName: string | null;
  classId?: string | null;
  profilePicUrl?: string | null;
}

export default class ClassStudentModel implements ClassStudentModelInterface {
  email = '';

  rollNo = '';

  totalAttendancePercentage = 0;

  joined = false;

  joinedDate: Date | null = null;

  studentId: string | null = null;

  archived = false;

  studentName: string | null = null;

  classId: string | null = null;

  profilePicUrl: string | null = null;

  constructor(data: Partial<ClassStudentModelInterface>) {
    if (typeof data.email === 'string') this.email = data.email;
    if (typeof data.rollNo === 'string') this.rollNo = data.rollNo;
    if (typeof data.totalAttendancePercentage === 'number')
      this.totalAttendancePercentage = data.totalAttendancePercentage;
    if (typeof data.joined === 'boolean') this.joined = data.joined;
    if (data.joinedDate instanceof Date) this.joinedDate = data.joinedDate;
    if (typeof data.studentId === 'string') this.studentId = data.studentId;
    if (typeof data.archived === 'boolean') this.archived = data.archived;
    if (typeof data.studentName === 'string')
      this.studentName = data.studentName;
    if (typeof data.profilePicUrl === 'string')
      this.profilePicUrl = data.profilePicUrl;
  }

  static Update(
    data: Partial<ClassStudentModelInterface>,
  ): Partial<ClassStudentModelInterface> {
    const obj: Partial<ClassStudentModelInterface> = {};
    const {
      rollNo,
      email,
      joined,
      totalAttendancePercentage,
      joinedDate,
      studentId,
      archived,
      studentName,
      profilePicUrl,
    } = data;

    if (typeof email === 'string') obj.email = email;
    if (typeof rollNo === 'string') obj.rollNo = rollNo;
    if (typeof totalAttendancePercentage === 'number')
      obj.totalAttendancePercentage = totalAttendancePercentage;
    if (typeof joined === 'boolean') obj.joined = joined;
    if (joinedDate instanceof Date) obj.joinedDate = joinedDate;
    if (typeof data.studentId === 'string') obj.studentId = studentId;
    if (typeof data.archived === 'boolean') obj.archived = archived;
    if (typeof data.studentName === 'string') obj.studentName = studentName;
    if (typeof data.profilePicUrl === 'string')
      obj.profilePicUrl = profilePicUrl;

    return obj;
  }

  setStudentId(id: string): void {
    this.studentId = id;
  }

  setClassId(id: string | null): void {
    this.classId = id;
  }

  toJson(): ClassStudentModelInterface {
    const {
      joined,
      totalAttendancePercentage,
      rollNo,
      email,
      joinedDate,
      studentId,
      archived,
      studentName,
      profilePicUrl,
    } = this;

    return {
      joined,
      totalAttendancePercentage,
      rollNo,
      email,
      joinedDate,
      studentId,
      archived,
      studentName,
      profilePicUrl,
      ...(this.classId !== null && { classId: this.classId }),
    };
  }
}
