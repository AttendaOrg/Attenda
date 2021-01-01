import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../../util/Colors';

export interface MenuOptionsPopoverDataProps {
  title: string;
  onPress: () => void;
}

interface MenuOptionsPopoverProps {
  options: MenuOptionsPopoverDataProps[];
}

const MenuOptionsPopover: React.FC<MenuOptionsPopoverProps> = ({
  options,
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
          style={{ paddingBottom: 10, paddingLeft: 10 }}
        />
      </MenuTrigger>
      <MenuOptions>
        {options.map(option => (
          <MenuOption
            key={option.title}
            text={option.title}
            onSelect={option.onPress}
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
          />
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default MenuOptionsPopover;
