import { UserRole } from '..';

export interface AccountInfoProps {
  name: string;
  /**
   * if the role is not defined its defaults to ***UserType.UNKNOWN***
   */
  email: string;
  role: UserRole | null;
  joinedClassId?: string[] | null;
  profilePicUrl?: string | null;
}

export default class AccountInfo implements Partial<AccountInfoProps> {
  name: string;

  email: string;

  role: UserRole;

  joinedClassId: string[] | null = [];

  profilePicUrl: string | null = null;

  constructor(data: Partial<AccountInfoProps> = {}) {
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.role = data.role ?? UserRole.UNKNOWN;
    this.joinedClassId = data.joinedClassId ?? null;
    this.profilePicUrl = data.profilePicUrl ?? null;
  }

  static Update(data: Partial<AccountInfoProps>): Partial<AccountInfoProps> {
    const obj: Partial<AccountInfoProps> = {};

    if (data.email !== undefined) obj.email = data.email;
    if (data.name !== undefined) obj.name = data.name;
    if (data.role !== undefined) obj.role = data.role;
    if (data.joinedClassId !== null) obj.joinedClassId = data.joinedClassId;
    if (data.profilePicUrl !== null) obj.profilePicUrl = data.profilePicUrl;

    return obj;
  }

  toJson(): Partial<AccountInfoProps> {
    const obj: Partial<AccountInfoProps> = {};

    if (this.email !== '') obj.email = this.email;
    if (this.name !== '') obj.name = this.name;
    if (this.role !== UserRole.UNKNOWN) obj.role = this.role;
    if (this.joinedClassId !== null) obj.joinedClassId = this.joinedClassId;
    if (this.profilePicUrl !== null) obj.profilePicUrl = this.profilePicUrl;

    return obj;
  }
}
