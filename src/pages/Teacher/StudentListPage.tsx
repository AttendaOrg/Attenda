import React, {
  useCallback,
  useContext,
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
import { RootStackParamList } from '../../App';
import StudentList, {
  StudentListData,
} from '../../components/organisms/Teacher/StudentList';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import StudentsEmptyList from '../../components/organisms/Teacher/StudentsEmptyList/StudentsEmptyList';
import { teacherApi } from '../../api/TeacherApi';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import MenuOptionsPopover from '../../components/molecules/MenuOptionsPopover';
import { applyStudentSort, SortBy } from './util/SortStudent';
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';
import GlobalContext from '../../context/GlobalContext';

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
  const { studentId = '', rollNo, studentName, profilePicUrl } = data;

  return {
    checked: false,
    key: studentId ?? '',
    name: studentName ?? '',
    rollNo,
    profilePicUrl: profilePicUrl ?? undefined,
    // if we pass percentage it will not show the select
    // percentage: `${totalAttendancePercentage} %`,
  };
};

const StudentListPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classId, totalStudent: estimateTotalStudent = 0 },
  } = route;
  const globalContext = useContext(GlobalContext);
  const [showChecked, setShowChecked] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [listItems, setListItems] = useState<StudentListData[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.ROLL_NO);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchStudentList = useCallback(async () => {
    setShowLoading(true);
    const [students] = await teacherApi.getAllStudentList(classId);
    const newItems = (students || []).map(transform);

    setShowLoading(false);
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
          {listItems.length > 0 && (
            <MenuOptionsPopover
              style={{ marginRight: 12 }}
              options={[
                {
                  onPress: () => setSortBy(SortBy.NAME),
                  title: 'Sort By Name',
                  selected: sortBy === SortBy.NAME,
                },
                {
                  onPress: () => setSortBy(SortBy.ROLL_NO),
                  title: 'Sort By Roll No',
                  selected: sortBy === SortBy.ROLL_NO,
                },
                {
                  onPress: () => {
                    setShowChecked(!showChecked);
                    const newListItems = [
                      ...listItems.map(item => ({ ...item, checked: false })),
                    ];

                    setListItems(newListItems);
                  },
                  title: showChecked ? 'Un Mark' : 'Mark for delete',
                },
              ]}
              value=""
            />
          )}
        </View>
      ),
    });
  }, [classId, listItems, navigation, showChecked, sortBy]);

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

  if (
    estimateTotalStudent === 0 || //  TODO: when the cloud functions run re-enable this check
    (showLoading === false && listItems.length === 0)
  ) {
    return (
      <StudentsEmptyList
        onInviteClick={() => navigation.push('InviteStudent', { classId })}
      />
    );
  }

  console.log('re render');

  return (
    <>
      <StudentList
        showShimmer={showLoading}
        preloadStudentCount={estimateTotalStudent}
        studentList={applyStudentSort(listItems, sortBy)}
        showChecked={showChecked}
        onChangeShowChecked={setShowChecked}
        onChangeChecked={onChangeChecked}
        onProfileClick={async rollNo => {
          if (await globalContext.throwNetworkError()) return;
          navigation.navigate('EditStudentAttendanceRecord', {
            studentId: rollNo,
            classId,
          });
        }}
      />
      <DoubleButtonPopup
        negativeButtonText="Cancel"
        positiveButtonText="Delete"
        onDismiss={dismissDialog}
        visible={showDeleteDialog}
        title="Delete Students"
        text="Are you sure you want to delete selected students from class ?"
        onNegativeButtonClick={dismissDialog}
        onPositiveButtonClick={deleteSelectedStudents}
      />
    </>
  );
};

export default StudentListPage;
