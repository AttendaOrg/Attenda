import { UserType } from '..';

interface AccountInfoProps {
  name: string;
  email: string;
  /**
   * if the role is not defined its defaults to ```UserType.UNKNOWN```
   */
  role: UserType;
}

export default class AccountInfo implements Partial<AccountInfoProps> {
  name: string;

  email: string;

  role = UserType.UNKNOWN;

  constructor(data: Partial<AccountInfoProps> = {}) {
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.role = data.role ?? UserType.UNKNOWN;
  }

  toJson(): AccountInfoProps {
    return {
      email: this.email,
      name: this.name,
      role: this.role,
    };
  }
}
