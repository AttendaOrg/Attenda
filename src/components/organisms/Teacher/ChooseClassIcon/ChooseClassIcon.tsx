import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { TeacherClassCard } from '../../../molecules/ClassCard/TeacherClassCard';
import IconSelectBtn from '../../../atoms/IconSelectBtn/IconSelectBtn';
import ClassCardIconModel from '../../../../api/TeacherApi/model/ClassCardIconModel';
import TeacherClassModel from '../../../../api/TeacherApi/model/TeacherClassModel';
import { hashCode } from '../../../../util';

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export interface ChooseClassIconPops {
  defaultSelected?: string;
  icons: ClassCardIconModel[];
  info: TeacherClassModel;
  onChange: (newIcon: ClassCardIconModel) => void;
}

const ChooseClassIcon: React.FC<ChooseClassIconPops> = ({
  icons = [],
  info,
  onChange = () => null,
}): JSX.Element => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <View style={styles.container}>
      <TeacherClassCard
        data={info}
        hideActions
        onAction={() => null}
        onPress={() => null}
      />
      <FlatGrid
        itemDimension={80}
        data={icons}
        renderItem={({ item }) => (
          <IconSelectBtn
            key={item.iconData}
            selected={hashCode(item.iconData) === selected}
            source={{ uri: item.iconData }}
            onChange={() => {
              onChange(item);
              setSelected(hashCode(item.iconData));
            }}
          />
        )}
      />
    </View>
  );
};

export default ChooseClassIcon;
