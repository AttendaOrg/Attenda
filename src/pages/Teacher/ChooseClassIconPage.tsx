import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '../../App';
import ChooseClassIcon from '../../components/organisms/Teacher/ChooseClassIcon/ChooseClassIcon';
import ClassCardIconModel from '../../api/TeacherApi/model/ClassCardIconModel';
import { teacherApi } from '../../api/TeacherApi';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import GlobalContext from '../../context/GlobalContext';

const Tab = createMaterialTopTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'ChooseClassIcon'>;

export const ChooseClassIconNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Choose A Icon',
};

const ChooseClassIconPage: React.FC<Props> = ({
  route: {
    params: { classId },
  },
}): JSX.Element => {
  const [icons, setIcons] = useState<ClassCardIconModel[]>([]);
  const [classInfo, setClassInfo] = useState<TeacherClassModel | null>(null);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    const main = async () => {
      const [remoteIcons = []] = await teacherApi.getAllClassCardIcons();

      if (remoteIcons !== null) setIcons(remoteIcons);
    };

    main();
    console.log('re render');
  }, []);

  const fetchClassInfo = useCallback(async () => {
    const [remoteClassInfo] = await teacherApi.getClassInfo(classId);

    if (remoteClassInfo !== null) setClassInfo(remoteClassInfo);
  }, [classId]);

  useEffect(() => {
    fetchClassInfo();
    console.log('re render');
  }, [classId, fetchClassInfo]);

  const categories = Array.from(new Set(icons.map(e => e.category)));

  if (categories.length === 0 || classInfo === null)
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Loading ...</Text>
      </View>
    );

  const onIconChange = async (icon: ClassCardIconModel) => {
    globalContext.changeSpinnerLoading(true);
    try {
      await teacherApi.updateClassIcon(classId, icon.iconData);
      await fetchClassInfo();
    } catch (error) {
      console.log(error);
    }
    globalContext.changeSpinnerLoading(false);
  };

  return (
    <Tab.Navigator>
      {categories.map(n => (
        <Tab.Screen
          name={n}
          component={() => (
            <ChooseClassIcon
              onChange={icon => {
                onIconChange(icon);
              }}
              info={classInfo}
              icons={icons.filter(icon => icon.category === n)}
            />
          )}
        />
      ))}
    </Tab.Navigator>
  );
};

export default ChooseClassIconPage;
