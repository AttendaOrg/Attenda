export interface IInviteStudentModel {
  email: string;
  joined?: boolean;
}

export default class InviteStudentModel implements IInviteStudentModel {
  email: string;

  joined?: boolean = false;

  constructor(props: IInviteStudentModel) {
    this.email = props.email;
    if (props.joined !== undefined) this.joined = props.joined;
  }

  static Update(
    data: Partial<IInviteStudentModel>,
  ): Partial<IInviteStudentModel> {
    const obj: Partial<IInviteStudentModel> = {};

    if (data.email !== undefined) obj.email = data.email;
    if (data.joined !== undefined) obj.joined = data.joined;

    return obj;
  }

  toJson(): Partial<IInviteStudentModel> {
    const { email, joined } = this;

    return {
      email,
      joined,
    };
  }
}
