/* eslint-disable @typescript-eslint/no-var-requires */
import { StudentListDataProps } from '../../Student/StudentClassList';

const classBack1 = require('../../../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../../../assets/images/class-back-5.jpg');

export const dummyTeacherClassListData: StudentListDataProps[] = [
  {
    attendance: '92 Students',
    backgroundImage: classBack1,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: true,
    key: 'key1',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack2,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key2',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack3,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key3',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack4,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key4',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack5,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key5',
  },
];

export { default } from './TeacherClassList';
export * from './TeacherClassList';
