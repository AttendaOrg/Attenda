import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import Shimmer from '../../atoms/Shimmer/Shimmer';
import MenuOptionsPopover, {
  MenuOptionsPopoverDataProps,
} from '../MenuOptionsPopover';

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
  attendanceGiven: {
    color: 'green',
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
  attendance: number;
  isSessionLive?: boolean;
  backgroundImage: ImageSourcePropType;
  showShimmer?: boolean;
  currentSessionId: string | null;
  alreadyGiven?: boolean;
  classIcon?: string | ImageURISource | null;
}

interface Props extends ClassCardPops {
  /**
   * @deprecated this function is deprecated
   * @use options props
   */
  onMoreIconClick: () => void;
  onCardClick: () => void;
  options?: MenuOptionsPopoverDataProps[];
  classId: string;
}

const ClassCard: React.FC<Props> = ({
  attendance,
  className,
  isSessionLive = false,
  section,
  teacherName,
  backgroundImage,
  onCardClick,
  options = [],
  showShimmer = false,
  classId = '',
  alreadyGiven = false,
}): JSX.Element => {
  return showShimmer ? (
    <Shimmer width="100%" height={114} />
  ) : (
    <>
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
              {isSessionLive && !alreadyGiven && 'Attendance session is live'}
            </Text>

            <Text style={styles.attendanceGiven}>
              {isSessionLive && alreadyGiven && 'You have already responded'}
            </Text>
            <View style={styles.moreIcon}>
              <MenuOptionsPopover value={classId} options={options} />
            </View>
          </View>
          {backgroundImage !== undefined && (
            <Image source={backgroundImage} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ClassCard;
