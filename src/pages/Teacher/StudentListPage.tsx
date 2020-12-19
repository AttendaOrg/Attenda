import React, { useState } from 'react';
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

type Props = StackScreenProps<RootStackParamList, 'StudentList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

const styles = StyleSheet.create({
  actionIcons: {
    marginRight: 16,
  },
});

export const StudentListNavigationOptions: OptionsProps = ({
  navigation,
  route,
}) => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Students',
  headerRight: () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        style={styles.actionIcons}
        onPress={() => navigation.push('InviteStudent')}
      >
        <MaterialIcons name="person-add" size={24} />
      </TouchableOpacity>
      {route.params.totalSelected > 0 && (
        <TouchableOpacity
          style={styles.actionIcons}
          onPress={() =>
            navigation.setParams({ ...route.params, showDeleteDialog: true })
          }
        >
          <MaterialIcons name="delete" color="red" size={24} />
        </TouchableOpacity>
      )}
    </View>
  ),
});

const StudentListPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classId },
  } = route;
  const [showChecked, setShowChecked] = useState(false);
  const [listItems, setListItems] = useState<StudentListData[]>([
    {
      name: 'Prasanta Barman',
      rollNo: 'IIT2154',
      key: 'IIT2154',
      checked: false,
    },
    {
      name: 'Apurba Roy',
      rollNo: 'IIT2441454',
      key: 'IIT2441454',
      checked: false,
    },
  ]);

  const updateHeaderActions = (newListItems: StudentListData[]) => {
    const matched = newListItems.filter(item => item.checked === true);

    if (matched.length > 0) {
      setShowChecked(true);
      navigation.setParams({ totalSelected: matched.length });
    } else {
      setShowChecked(false);
      navigation.setParams({ totalSelected: matched.length });
    }
  };

  const dismissDialog = () => {
    navigation.setParams({ showDeleteDialog: false });
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

    setListItems(newListItems);
    updateHeaderActions(newListItems);
  };

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
      <Dialog visible={route.params.showDeleteDialog} onDismiss={dismissDialog}>
        <Dialog.Title>Delete Students</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Are you sure you want to delete the students from class
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={dismissDialog}>Cancel</Button>
          <Button onPress={deleteSelectedStudents}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default StudentListPage;
