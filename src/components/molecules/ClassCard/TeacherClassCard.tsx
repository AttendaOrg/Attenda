import React, { useMemo, useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Shimmer from '../../atoms/Shimmer/Shimmer';
import ClassCardActionBtn from './ClassCardActionBtn';

export const classCardStyles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInfoContainer: {
    flex: 1,
    paddingLeft: 16,
    marginRight: 34,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txt: {
    paddingBottom: 4,
  },
  divider: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginVertical: 6,
  },
  btnStyle: {
    justifyContent: 'flex-start',
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
  },
  attendanceGiven: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export interface CommonClassCardData {
  title: string;
  section: string;
  isLive: boolean;
  classIcon?: ImageSourcePropType;
}

export enum TeacherClassAction {
  ATTENDANCE_RECORD,
  STUDENTS,
  SETTINGS,
  SHARE_INVITE_LINK,
}

export interface TeacherClassCardData extends CommonClassCardData {
  classCode: string;
  totalStudent: number;
}

export interface TeacherClassCardProps {
  data: TeacherClassCardData;
  onAction: (action: TeacherClassAction) => void;
  onPress: () => void;
  showShimmer?: boolean;
}

export const TeacherClassCard: React.FC<TeacherClassCardProps> = ({
  data,
  onAction = () => null,
  onPress = () => null,
  showShimmer = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const body = useMemo<JSX.Element>(
    () => (
      <View style={classCardStyles.textInfoContainer}>
        <Text
          numberOfLines={1}
          style={[classCardStyles.className, classCardStyles.txt]}
        >
          {data.title}
        </Text>
        <Text style={classCardStyles.txt}>{data.section}</Text>
        {isOpened && (
          <>
            <Text style={classCardStyles.txt}>Code: {data.classCode}</Text>
            <Text style={classCardStyles.txt}>
              {data.totalStudent ?? 0} Students
            </Text>
          </>
        )}
        {data.isLive && <View style={{ height: 8 }} />}
        <Text style={[classCardStyles.liveText, classCardStyles.txt]}>
          {data.isLive && 'Attendance session is live'}
        </Text>
      </View>
    ),
    [
      isOpened,
      data.title,
      data.isLive,
      data.section,
      data.classCode,
      data.totalStudent,
    ],
  );

  const actionBody = useMemo<JSX.Element>(
    () => (
      <>
        <View style={classCardStyles.divider} />
        <ClassCardActionBtn
          onPress={() => onAction(TeacherClassAction.ATTENDANCE_RECORD)}
        >
          Attendance Record
        </ClassCardActionBtn>

        <ClassCardActionBtn
          onPress={() => onAction(TeacherClassAction.STUDENTS)}
        >
          Students
        </ClassCardActionBtn>
        <ClassCardActionBtn
          onPress={() => onAction(TeacherClassAction.SETTINGS)}
        >
          Settings
        </ClassCardActionBtn>
        <ClassCardActionBtn
          onPress={() => onAction(TeacherClassAction.SHARE_INVITE_LINK)}
        >
          Share invite link
        </ClassCardActionBtn>
      </>
    ),
    [onAction],
  );

  return showShimmer ? (
    <Shimmer width="100%" height={98} />
  ) : (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => setIsOpened(!isOpened)}
    >
      <View style={classCardStyles.container}>
        <IconButton
          size={28}
          icon={isOpened ? 'chevron-down' : 'chevron-left'}
          style={classCardStyles.icon}
          onPress={() => setIsOpened(!isOpened)}
        />
        <View style={classCardStyles.infoContainer}>
          <Image
            // eslint-disable-next-line global-require
            source={data.classIcon ?? require('../../../../assets/icon.png')}
            style={{ height: 50, width: 50 }}
          />
          {body}
        </View>
        {isOpened && actionBody}
      </View>
    </TouchableOpacity>
  );
};
