import React, { useMemo, useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import Shimmer from '../../atoms/Shimmer/Shimmer';

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
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  textInfoContainer: {
    flex: 1,
    paddingLeft: 16,
    marginRight: 34,
  },
  className: {
    fontSize: 14,
    fontWeight: 'bold',
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
        <Text style={classCardStyles.className}>{data.title}</Text>
        <Text>{data.section}</Text>
        <Text>Code: {data.classCode}</Text>
        <Text>{data.totalStudent ?? 0} Students</Text>
        <Text style={classCardStyles.liveText}>
          {data.isLive && 'Attendance session is live'}
        </Text>
      </View>
    ),
    [data.classCode, data.isLive, data.section, data.title, data.totalStudent],
  );

  const actionBody = useMemo<JSX.Element>(
    () => (
      <>
        <View style={classCardStyles.divider} />
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(TeacherClassAction.ATTENDANCE_RECORD)}
          uppercase={false}
        >
          Attendance Record
        </Button>
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(TeacherClassAction.STUDENTS)}
          uppercase={false}
        >
          Students
        </Button>
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(TeacherClassAction.SETTINGS)}
          uppercase={false}
        >
          Settings
        </Button>
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(TeacherClassAction.SHARE_INVITE_LINK)}
          uppercase={false}
        >
          Share invite link
        </Button>
      </>
    ),
    [onAction],
  );

  return showShimmer ? (
    <Shimmer width="100%" height={98} />
  ) : (
    <TouchableOpacity
      delayLongPress={0}
      onPress={onPress}
      onLongPress={() => setIsOpened(!isOpened)}
    >
      <View style={classCardStyles.container}>
        <IconButton
          size={28}
          icon={isOpened ? 'chevron-down' : 'chevron-right'}
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
