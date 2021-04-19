import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
          }}
        >
          {icons.map(icon => (
            <IconSelectBtn
              key={icon.iconData}
              selected={hashCode(icon.iconData) === selected}
              source={{ uri: icon.iconData }}
              onChange={() => {
                onChange(icon);
                setSelected(hashCode(icon.iconData));
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseClassIcon;
