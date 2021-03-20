import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { lightColor } from '../../../util/Colors';

export interface MenuOptionsPopoverDataProps {
  title: string;
  onPress: (classId: string) => void;
  selected?: boolean;
}

interface MenuOptionsPopoverProps {
  options: MenuOptionsPopoverDataProps[];
  value: string;
  style?: StyleProp<ViewStyle>;
}

const MenuOptionsPopover: React.FC<MenuOptionsPopoverProps> = ({
  options,
  value,
  style = { paddingBottom: 10, paddingLeft: 10 },
}): JSX.Element => {
  let menuRef: Menu | null = null;

  return (
    <Menu
      ref={r => {
        menuRef = r;
      }}
    >
      <MenuTrigger
        customStyles={{
          triggerTouchable: {
            onLongPress: () => {
              menuRef?.open();
            },
          },
        }}
      >
        <MaterialIcons
          name="more-vert"
          size={24}
          color={lightColor}
          style={style}
        />
      </MenuTrigger>
      <MenuOptions>
        {options.map(option => (
          <MenuOption
            key={option.title}
            // text={option.title}
            value={value}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSelect={(val: string): void => {
              return option.onPress(val);
            }}
            customStyles={{
              optionText: {
                fontSize: 15,
              },
            }}
            style={{
              height: 40,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{option.title}</Text>
              <MaterialIcons
                color="blue"
                style={{ display: option.selected === true ? 'flex' : 'none' }}
                size={18}
                name="check"
              />
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default MenuOptionsPopover;
