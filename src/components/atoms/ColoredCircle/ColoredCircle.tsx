import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const MAIN_HEIGHT = 46;

const styles = StyleSheet.create({
  circle: {
    width: MAIN_HEIGHT,
    height: MAIN_HEIGHT,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  circleSelected: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: 'red',
    borderColor: 'transparent',
    borderWidth: 4,
  },
  border: {
    margin: 4,
    width: MAIN_HEIGHT,
    height: MAIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderSelected: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'gray',
  },
});

export interface ColoredCirclePops {
  color: string;
  isSelected?: boolean;
  borderColor?: string;
  onSelect: () => void;
}

const ColoredCircle: React.FC<ColoredCirclePops> = ({
  color,
  isSelected = false,
  borderColor = 'green',
  onSelect = () => null,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={[
          styles.border,
          isSelected === true && styles.borderSelected,
          { borderColor },
        ]}
      >
        <View
          style={[
            isSelected === true ? styles.circleSelected : styles.circle,
            { backgroundColor: color },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

// const ColoredCircle: React.FC<ColoredCirclePops> = ({ color }): JSX.Element => {
//   return (
//     <View style={styles.outerCircle}>
//       <View
//         style={{
//           borderRadius: 18,
//           width: 36,
//           height: 36,
//           margin: 3,
//           borderWidth: 3,
//           borderColor: 'white',
//           backgroundColor: color,
//         }}
//       />
//     </View>
//   );
// };

export default ColoredCircle;
