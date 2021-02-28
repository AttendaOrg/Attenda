import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon, Input } from 'react-native-elements';
import DoubleButtonPopup from '../../../molecules/DoubleButtonPopup';
import { inputContainerStyle } from '../../../../util/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  profileImgContainer: {
    padding: 25,
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 200,
  },
  iconContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 15 + 20,
    bottom: 15 + 20,
    borderRadius: 100,
    padding: 8,
  },
  infoContainer: {
    margin: 16,
    marginBottom: 0,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6A6A6A',
  },
  infoValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  touchableOpacityContainer: {
    flex: 1,
    marginHorizontal: 16,

    // justifyContent: 'flex-end',
  },
  touchableOpacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  touchableOpacityText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  divider: {
    borderBottomColor: '#ddd',
    marginTop: 7,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/user.jpg');

interface Errors {
  nameError: string;
}

export interface MyAccountPops {
  name: string;
  email: string;
  userRole: string;
  onEditProfilePictureClick: () => void;
  onNameChange: (newName: string) => Promise<boolean>;
  onChangePasswordClick: () => void;
  onLogOutClick: () => void;
  showPopup: boolean;
  onDismissPopup: () => void;
  onPositivePopupClick: () => void;
  errors?: Errors;
  revalidateError?: (_name: string) => boolean;
  onNameType?: (name: string) => void;
}

const MyAccount: React.FC<MyAccountPops> = ({
  name: initialName,
  email,
  userRole,
  onEditProfilePictureClick,
  onNameChange,
  onChangePasswordClick,
  onLogOutClick,
  onDismissPopup,
  onPositivePopupClick,
  showPopup,
  errors,
  revalidateError = () => null,
  onNameType = () => null,
}): JSX.Element => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [hasFormTrySubmitted, setHasFormTrySubmitted] = useState(false);
  const ref = useRef<Input>(null);

  // react to the prop name change
  useEffect(() => {
    // set the input to the value form the prop
    setName(initialName);
  }, [initialName]);

  const updateName = (_name: string) => {
    if (hasFormTrySubmitted) revalidateError(_name);
    setName(_name);

    onNameType(_name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.blurImageContainer}>
        <Image
          blurRadius={Platform.OS === 'ios' ? 10 : 5}
          source={imageSrc}
          style={styles.blurBackground}
        />
        <View style={styles.profileImgContainer}>
          <Image source={imageSrc} style={styles.profileImg} />
          <TouchableOpacity
            onPress={onEditProfilePictureClick}
            style={styles.iconContainer}
          >
            <Icon name="edit" color="#6A6A6A" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoValueRow}>
          <Input
            ref={ref}
            autoFocus
            placeholder="Name"
            editable={isEditing}
            style={styles.infoValue}
            value={name}
            onChangeText={updateName}
            containerStyle={inputContainerStyle}
            errorMessage={errors?.nameError}
            rightIcon={
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name={isEditing ? 'done' : 'edit'}
                  color="#6A6A6A"
                  size={24}
                  onPress={async () => {
                    // because the setState call will be last so we will work with this variable
                    let computedIsEditing = !isEditing;

                    if (computedIsEditing) {
                      // if the editing is true focus the input
                      ref?.current?.focus();
                    } else {
                      // if it is first time trying to change name set remember it
                      // because before first time will will not revalidate the name error on every key press
                      if (!hasFormTrySubmitted) setHasFormTrySubmitted(true);
                      const success = await onNameChange(name);

                      if (!success) computedIsEditing = isEditing;
                    }

                    setIsEditing(computedIsEditing);
                  }}
                />
                {isEditing && (
                  <Icon
                    name="close"
                    color="#6A6A6A"
                    size={24}
                    onPress={() => {
                      updateName(initialName);
                      setIsEditing(false);
                    }}
                  />
                )}
              </View>
            }
          />
        </View>
        <Text style={styles.infoTitle}>Email Address</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.infoTitle}>Role</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.infoValue}>{userRole}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.touchableOpacityContainer}>
        <TouchableOpacity onPress={onChangePasswordClick}>
          <View style={styles.touchableOpacityRow}>
            <AntDesign name="unlock" color="#6A6A6A" size={24} />
            <Text style={styles.touchableOpacityText}> Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogOutClick}>
          <View style={styles.touchableOpacityRow}>
            <AntDesign name="logout" color="#6A6A6A" size={24} />
            <Text style={styles.touchableOpacityText}> Log out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <DoubleButtonPopup
        visible={showPopup}
        title="Log out"
        text="Are you sure to log out? "
        positiveButtonText="Ok"
        negativeButtonText="Cancel"
        onNegativeButtonClick={onDismissPopup}
        onPositiveButtonClick={onPositivePopupClick}
        onDismiss={onDismissPopup}
      />
    </View>
  );
};

export default MyAccount;
