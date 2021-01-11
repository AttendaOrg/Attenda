export interface TeacherClassModelProps {
  /**
   * @required
   */
  title: string;
  /**
   * @required
   */
  section: string;
  classCode?: string;
  description?: string;
  inviteLink?: string;
  isActiveInvite?: boolean;
  isLive?: boolean;
  currentSessionId?: string | null;
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

  constructor(data?: TeacherClassModelProps) {
    this.classCode = data?.classCode ?? '';
    this.description = data?.description ?? '';
    this.inviteLink = data?.inviteLink ?? '';
    this.isActiveInvite = data?.isActiveInvite ?? true;
    this.section = data?.section ?? '';
    this.title = data?.title ?? '';
    this.isLive = data?.isLive ?? false;
    this.currentSessionId = data?.currentSessionId ?? null;
  }

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

    return obj;
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
    };
  };
}
