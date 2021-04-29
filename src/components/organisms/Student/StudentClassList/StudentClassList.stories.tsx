/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Platform } from 'react-native';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import StudentClassList, { StudentListDataProps } from './StudentClassList';
import { dummyStudentClassListData } from '.';
import { convertEnumToStr } from '../../../../util';
import { StudentClassAction } from '../../../molecules/ClassCard/StudentClassCard';

const STORY_NAME = 'Organisms/Student/StudentClassList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: StudentClassList,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <StudentClassList
    isEmailVerified={boolean('isEmailVerified', true)}
    onResendEmail={() => action('onResendEmail')()}
    onClassClick={classId => action('onClassClick')(classId)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data={select<StudentListDataProps[]>(
      'data',
      { 'No Data': [], 'With Data': dummyStudentClassListData },
      [],
    )}
    onFabClick={() => action('onFabClick')()}
    onAction={(act, info) =>
      action('onAction')(
        convertEnumToStr<StudentClassAction>(StudentClassAction, act),
        info,
      )
    }
  />
);

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => (
      <CenterView onlySafeView>{getStory()}</CenterView>
    ))
    .addDecorator(withKnobs)
    .add('Default', Default)
    .add('Empty List', () => (
      <StudentClassList
        isEmailVerified={boolean('isEmailVerified', true)}
        onResendEmail={() => action('onResendEmail')()}
        onClassClick={classId => action('onClassClick')(classId)}
        data={[]}
        onFabClick={() => action('onFabClick')()}
        onAction={(act, info) =>
          action('onAction')(
            convertEnumToStr<StudentClassAction>(StudentClassAction, act),
            info,
          )
        }
      />
    ))
    .add('With Data', () => (
      <StudentClassList
        isEmailVerified={boolean('isEmailVerified', true)}
        onResendEmail={() => action('onResendEmail')()}
        onClassClick={classId => action('onClassClick')(classId)}
        data={dummyStudentClassListData}
        onFabClick={() => action('onFabClick')()}
        onAction={(act, info) =>
          action('onAction')(
            convertEnumToStr<StudentClassAction>(StudentClassAction, act),
            info,
          )
        }
      />
    ));
}
