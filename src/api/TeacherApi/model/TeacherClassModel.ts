export interface TeacherClassModelProps {
  /**
   * @required
   */
  title: string;
  /**
   * @required
   */
  section: string;
  teacherName?: string | null;
  classCode?: string;
  description?: string;
  inviteLink?: string;
  isActiveInvite?: boolean;
  isLive?: boolean;
  currentSessionId?: string | null;
  classId?: string | null;
  teacherId: string | null;
  isArchived?: boolean;
  alreadyGiven?: boolean;
  totalStudent?: number;
}

export default class TeacherClassModel implements TeacherClassModelProps {
  classCode: string;

  description: string;

  inviteLink: string;

  isActiveInvite: boolean;

  section: string;

  title: string;

  isLive: boolean;

  currentSessionId: string | null = null;

  classId: string | null = null;

  teacherId: string | null;

  teacherName: string | null;

  isArchived = false;

  alreadyGiven = false;

  totalStudent = 0;

  constructor(data: TeacherClassModelProps) {
    this.classCode = data?.classCode ?? '';
    this.description = data?.description ?? '';
    this.inviteLink = data?.inviteLink ?? '';
    this.isActiveInvite = data?.isActiveInvite ?? true;
    this.section = data?.section ?? '';
    this.title = data?.title ?? '';
    this.isLive = data?.isLive ?? false;
    this.currentSessionId = data?.currentSessionId ?? null;
    this.classId = data?.classId ?? null;
    this.teacherId = data?.teacherId ?? null;
    this.isArchived = data?.isArchived ?? false;
    this.teacherName = data?.teacherName ?? null;
    this.totalStudent = data?.totalStudent ?? 0;
  }

  setAlreadyGiven = (given: boolean): void => {
    this.alreadyGiven = given;
  };

  // noinspection DuplicatedCode
  static readonly Update = ({
    classCode,
    description,
    inviteLink,
    isActiveInvite,
    isLive,
    section,
    title,
    currentSessionId,
    classId,
    teacherId,
    isArchived,
    teacherName,
    totalStudent,
  }: Partial<TeacherClassModelProps>): Partial<TeacherClassModelProps> => {
    const obj: Partial<TeacherClassModelProps> = {};

    if (classCode !== undefined) obj.classCode = classCode;
    if (description !== undefined) obj.description = description;
    if (inviteLink !== undefined) obj.inviteLink = inviteLink;
    if (isActiveInvite !== undefined) obj.isActiveInvite = isActiveInvite;
    if (isLive !== undefined) obj.isLive = isLive;
    if (title !== undefined) obj.title = title;
    if (section !== undefined) obj.section = section;
    if (currentSessionId !== undefined) obj.currentSessionId = currentSessionId;
    if (classId !== undefined) obj.classId = classId;
    if (teacherId !== undefined) obj.teacherId = teacherId;
    if (isArchived !== undefined) obj.isArchived = isArchived;
    if (teacherName !== undefined) obj.teacherName = teacherName;
    if (totalStudent !== undefined) obj.totalStudent = totalStudent;

    return obj;
  };

  setTeacherName = (name: string | null): void => {
    this.teacherName = name;
  };

  toJson = (): TeacherClassModelProps => {
    return {
      classCode: this.classCode,
      description: this.description,
      inviteLink: this.inviteLink,
      isActiveInvite: this.isActiveInvite,
      isLive: this.isLive,
      section: this.section,
      title: this.title,
      currentSessionId: this.currentSessionId,
      classId: this.classId,
      teacherId: this.teacherId,
      isArchived: this.isArchived,
      teacherName: this.teacherName,
      totalStudent: this.totalStudent,
    };
  };
}
