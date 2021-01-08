import { UserRole } from '..';

export interface AccountInfoProps {
  name: string;
  /**
   * if the role is not defined its defaults to ***UserType.UNKNOWN***
   */
  email: string;
  role: UserRole | null;
}

export default class AccountInfo implements Partial<AccountInfoProps> {
  name: string;

  email: string;

  role: UserRole;

  constructor(data: Partial<AccountInfoProps> = {}) {
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.role = data.role ?? UserRole.UNKNOWN;
  }

  toJson(): Partial<AccountInfoProps> {
    const obj: Partial<AccountInfoProps> = {};

    if (this.email !== '') obj.email = this.email;
    if (this.name !== '') obj.name = this.name;
    if (this.role !== UserRole.UNKNOWN) obj.role = this.role;

    return obj;
  }
}
