export enum ClassCardIconCategory {
  GENERAL = 'general',
}

export interface ClassCardIconProps {
  name: string;
  /**
   * if the role is not defined its defaults to ***UserType.UNKNOWN***
   */
  iconData: string;
  category: string;
}

export default class ClassCardIconModel implements Partial<ClassCardIconProps> {
  name: string;

  iconData: string;

  category: string;

  constructor(data: Partial<ClassCardIconProps> = {}) {
    this.name = data.name ?? '';
    this.iconData = data.iconData ?? '';
    this.category = data.category ?? ClassCardIconCategory.GENERAL;
  }

  static Update(
    data: Partial<ClassCardIconProps>,
  ): Partial<ClassCardIconProps> {
    const obj: Partial<ClassCardIconProps> = {};

    if (data.iconData !== undefined) obj.iconData = data.iconData;
    if (data.name !== undefined) obj.name = data.name;
    if (data.category !== null) obj.category = data.category;

    return obj;
  }

  toJson(): Partial<ClassCardIconProps> {
    const obj: Partial<ClassCardIconProps> = {};

    if (this.iconData !== '') obj.iconData = this.iconData;
    if (this.name !== '') obj.name = this.name;
    if (this.category !== null) obj.category = this.category;

    return obj;
  }
}
