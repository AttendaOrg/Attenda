import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Share, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import ClassSettings from '../../components/organisms/Teacher/ClassSettings';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { lightColor } from '../../util/Colors';

type Props = StackScreenProps<RootStackParamList, 'ClassSettings'>;

export const ClassSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Class Settings',
  headerRight: ({ tintColor }) => (
    <View>
      <IconButton
        color={tintColor || lightColor}
        icon="check"
        onPress={() => null}
      />
    </View>
  ),
};

const ClassSettingsPage: React.FC<Props> = (): JSX.Element => {
  const onCodeShare = () => {
    try {
      Share.share({ message: 'A454SDS', title: 'Class Code' });
    } catch (error) {
      //   console.log(error);
    }
  };

  const onLinkShare = () => {
    try {
      Share.share({
        message: 'https://attenda.app.to/A454SDS',
        url: 'https://attenda.app.to/A454SDS',
        title: 'Class Code Link',
      });
    } catch (error) {
      //   console.log(error);
    }
  };

  return (
    <ClassSettings
      title="Computer science data structures and algorithms"
      section="CED/COE"
      isCodeEnabled
      isLinkEnabled
      code="A454SDS"
      link="https://attenda.app.to/A454SDS"
      onNameChange={() => null}
      onSectionChange={() => null}
      toggleCodeSwitch={() => null}
      toggleLinkSwitch={() => null}
      onCodeShare={onCodeShare}
      onLinkShare={onLinkShare}
    />
  );
};

export default ClassSettingsPage;
