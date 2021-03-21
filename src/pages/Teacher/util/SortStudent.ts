import { StudentListData } from '../../../components/organisms/Teacher/StudentList';

export enum SortBy {
  NAME,
  ROLL_NO,
}

export const sortByName = (a: StudentListData, b: StudentListData): number =>
  a.name.localeCompare(b.name);

export const sortByPercentage = (
  a: StudentListData,
  b: StudentListData,
): number => {
  const { rollNo: rollNoA = '' } = a;
  const { rollNo: rollNoB = '' } = b;

  return rollNoA.localeCompare(rollNoB);
};

export const applyStudentSort = (
  list: StudentListData[],
  sortBy: SortBy,
): StudentListData[] => {
  switch (sortBy) {
    case SortBy.NAME:
      return list.sort(sortByName);
    case SortBy.ROLL_NO:
      return list.sort(sortByPercentage);
    default:
      return list;
  }
};
