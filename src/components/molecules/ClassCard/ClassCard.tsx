import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  classNameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    padding: 10,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    borderRadius: 8,
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
  },
  moreIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 8,
  },
  allText: {
    color: '#fff',
  },
});

export interface ClassCardPops {
  className: string;
  section: string;
  teacherName: string;
  attendance: string;
  isSessionLive?: boolean;
  backgroundImage: ImageSourcePropType;
}

interface Props extends ClassCardPops {
  onMoreIconClick: () => void;
  onCardClick: () => void;
}

const ClassCard: React.FC<Props> = ({
  attendance,
  className,
  isSessionLive = false,
  section,
  teacherName,
  onMoreIconClick,
  backgroundImage,
  onCardClick,
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onCardClick}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.classNameText, styles.allText]}>
            {className}
          </Text>
          <Text style={styles.allText}>{section}</Text>
          <Text style={styles.allText}>{teacherName}</Text>
          <Text style={styles.allText}>{attendance}</Text>

          <Text style={styles.liveText}>
            {isSessionLive && 'Attendance session is live'}
          </Text>
          <TouchableOpacity style={styles.moreIcon} onPress={onMoreIconClick}>
            <MaterialIcons name="more-vert" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {backgroundImage && (
          <Image source={backgroundImage} style={styles.image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClassCard;
