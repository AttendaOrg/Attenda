import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { UserRole } from '../../../../api';
import Arrow from '../../../atoms/Icons/Arrow';
import EmptyClassImageComponent from '../../../atoms/Images/EmptyClassImageComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.45,
    width: Dimensions.get('window').width,
  },
  aboveTextContainer: {
    flex: 1,
    alignItems: 'center', // horizontally centered
    marginTop: 20,
  },
  belowTextContainer: {
    alignItems: 'center', // horizontally centered
    marginTop: 20,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  arrowContainer: {
    alignItems: 'flex-end',
    marginRight: 75,
    marginBottom: 40,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#2196f3',
    right: 20,
    bottom: 20,
  },
});

export interface EmptyClassPops {
  onFabClick: () => void;
  userRole: UserRole;
}

const EmptyClass: React.FC<EmptyClassPops> = ({
  onFabClick,
  userRole,
}): JSX.Element => {
  const text =
    userRole === UserRole.TEACHER
      ? 'Create your first class'
      : 'Join your first class';

  return (
    <View style={styles.container}>
      <View style={styles.largeImage}>
        <EmptyClassImageComponent />
      </View>

      <View style={styles.aboveTextContainer}>
        <Text style={styles.text}>No class found</Text>
      </View>

      <View style={styles.belowTextContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>

      <View style={styles.arrowContainer}>
        <Arrow />
      </View>

      <FAB
        style={styles.fab}
        color="#FFFFFF"
        icon="plus"
        onPress={onFabClick}
      />
    </View>
  );
};

export default EmptyClass;
