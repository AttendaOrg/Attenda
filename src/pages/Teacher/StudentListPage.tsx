import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Dialog, Paragraph } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import StudentList, {
  StudentListData,
} from '../../components/organisms/Teacher/StudentList';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import StudentsEmptyList from '../../components/organisms/Teacher/StudentsEmptyList/StudentsEmptyList';
import { teacherApi } from '../../api/TeacherApi';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import MenuOptionsPopover from '../../components/molecules/MenuOptionsPopover';

type Props = StackScreenProps<RootStackParamList, 'StudentList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

const styles = StyleSheet.create({
  actionIcons: {
    marginRight: 16,
  },
});

export const StudentListNavigationOptions: OptionsProps = () => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Students',
});

const transform = (data: ClassStudentModel): StudentListData => {
  const { studentId = '', rollNo, studentName } = data;

  return {
    checked: false,
    key: studentId ?? '',
    name: studentName ?? '',
    rollNo,
    // if we pass percentage it will not show the select
    // percentage: `${totalAttendancePercentage} %`,
  };
};

const StudentListPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classId },
  } = route;
  const [showChecked, setShowChecked] = useState(false);
  const [listItems, setListItems] = useState<StudentListData[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchStudentList = useCallback(async () => {
    const [students] = await teacherApi.getAllStudentList(classId);
    const newItems = (students || []).map(transform);

    setListItems(newItems);
  }, [classId]);

  useEffect(() => {
    (async () => {
      await fetchStudentList();
      const unsubscribe = navigation.addListener('focus', async () => {
        await fetchStudentList();
      });

      return unsubscribe;
    })();
  }, [fetchStudentList, navigation]);
  /**
   * hides the radio button for all items if no item is selected
   * @param newListItems list of items
   */
  const updateHeaderActions = (newListItems: StudentListData[]) => {
    const matched = newListItems.filter(item => item.checked === true);

    setShowChecked(matched.length > 0);
  };

  useLayoutEffect(() => {
    const totalSelected = listItems.filter(item => item.checked === true)
      .length;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.actionIcons}
            onPress={() => navigation.push('InviteStudent', { classId })}
          >
            <MaterialIcons name="person-add" size={24} color={tintColor} />
          </TouchableOpacity>
          {totalSelected > 0 && (
            <TouchableOpacity
              style={styles.actionIcons}
              onPress={() => setShowDeleteDialog(true)}
            >
              <MaterialIcons name="delete" color={tintColor} size={24} />
            </TouchableOpacity>
          )}

          <MenuOptionsPopover
            style={{ marginRight: 12 }}
            options={[
              {
                onPress: () => setShowChecked(!showChecked),
                title: 'Mark for delete',
                selected: showChecked,
              },
            ]}
            value=""
          />
        </View>
      ),
    });
  }, [classId, listItems, navigation, showChecked]);

  const dismissDialog = () => {
    setShowDeleteDialog(false);
  };

  const deleteSelectedStudents = () => {
    const newListItems = [...listItems.filter(item => item.checked === false)];

    setListItems(newListItems);
    updateHeaderActions(newListItems);
    dismissDialog();
  };

  const onChangeChecked = (rollNo: string, checked: boolean) => {
    const newListItems = [
      ...listItems.map(item =>
        item.rollNo === rollNo ? { ...item, checked } : item,
      ),
    ];

    console.log(newListItems);

    setListItems(newListItems);
    updateHeaderActions(newListItems);
  };

  if (listItems.length === 0)
    return (
      <StudentsEmptyList
        onInviteClick={() => navigation.push('InviteStudent', { classId })}
      />
    );

  console.log('re render');

  return (
    <>
      <StudentList
        studentList={listItems}
        showChecked={showChecked}
        onChangeShowChecked={setShowChecked}
        onChangeChecked={onChangeChecked}
        onProfileClick={rollNo =>
          navigation.navigate('EditStudentAttendanceRecord', {
            studentId: rollNo,
            classId,
          })
        }
      />
      <Dialog visible={showDeleteDialog} onDismiss={dismissDialog}>
        <Dialog.Title>Delete Students</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Are you sure you want to delete selected students from class ?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={dismissDialog}>Cancel</Button>
          <Button onPress={deleteSelectedStudents} color="red">
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default StudentListPage;
