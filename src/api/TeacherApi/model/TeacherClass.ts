export interface TeacherClassProps {
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
}

export default class TeacherClass implements TeacherClassProps {
  classCode: string;

  description: string;

  inviteLink: string;

  isActiveInvite: boolean;

  section: string;

  title: string;

  isLive: boolean;

  constructor(data?: TeacherClassProps) {
    this.classCode = data?.classCode ?? '';
    this.description = data?.description ?? '';
    this.inviteLink = data?.inviteLink ?? '';
    this.isActiveInvite = data?.isActiveInvite ?? false;
    this.section = data?.section ?? '';
    this.title = data?.title ?? '';
    this.isLive = data?.isLive ?? false;
  }

  toJson = (): TeacherClassProps => {
    return {
      classCode: this.classCode,
      description: this.description,
      inviteLink: this.inviteLink,
      isActiveInvite: this.isActiveInvite,
      isLive: this.isLive,
      section: this.section,
      title: this.title,
    };
  };
}
