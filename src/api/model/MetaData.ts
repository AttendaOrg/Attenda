export type UserRole = 'teacher' | 'student';

export interface MetaDataProps {
  role: UserRole;
}

export default class MetaData implements MetaDataProps {
  role: UserRole;

  error = false;

  constructor(props: MetaDataProps) {
    this.role = props.role;
  }

  toJson(): MetaDataProps {
    return {
      role: this.role,
    };
  }
}
