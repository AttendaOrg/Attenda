/* eslint-disable @typescript-eslint/no-var-requires */

import TeacherClassModel from '../../../../api/TeacherApi/model/TeacherClassModel';
import { StudentListDataProps } from '../../Student/StudentClassList';

const classBack1 = require('../../../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../../../assets/images/class-back-5.jpg');

export const dummyTeacherClassListData: TeacherClassModel[] = [
  new TeacherClassModel({
    title: 'Class Name',
    section: 'Section',
    teacherId: 'asd',
  }),
  new TeacherClassModel({
    title: 'Class Name',
    section: 'Section',
    teacherId: 'asd',
  }),
  new TeacherClassModel({
    title: 'Class Name',
    section: 'Section',
    teacherId: 'asd',
  }),
  new TeacherClassModel({
    title: 'Class Name',
    section: 'Section',
    teacherId: 'asd',
  }),
  new TeacherClassModel({
    title: 'Class Name',
    section: 'Section',
    teacherId: 'asd',
  }),
];

export const dummyStudentListData: StudentListDataProps[] = [
  {
    attendance: 92,
    backgroundImage: classBack1,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: true,
    classId: 'key1',
    currentSessionId: null,
  },
  {
    attendance: 99,
    backgroundImage: classBack2,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    classId: 'key2',
    currentSessionId: null,
  },
  {
    attendance: 99,
    backgroundImage: classBack3,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    classId: 'key3',
    currentSessionId: null,
  },
  {
    attendance: 99,
    backgroundImage: classBack4,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    classId: 'key4',
    currentSessionId: null,
  },
  {
    attendance: 99,
    backgroundImage: classBack5,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    classId: 'key5',
    currentSessionId: null,
  },
];

export { default } from './TeacherClassList';
export * from './TeacherClassList';
