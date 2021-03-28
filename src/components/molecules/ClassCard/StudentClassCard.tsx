import React, { useMemo, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import Shimmer from '../../atoms/Shimmer/Shimmer';
import { classCardStyles, CommonClassCardData } from './TeacherClassCard';

export enum StudentClassAction {
  ATTENDANCE_RECORD,
  UN_ENROLL,
}

export interface StudentClassCardData extends CommonClassCardData {
  teacherName: string;
  totalAttendancePercentage: number;
  alreadyGiven: boolean;
}

export interface StudentClassCardProps {
  data: StudentClassCardData;
  onAction: (action: StudentClassAction) => void;
  onPress: () => void;
  showShimmer?: boolean;
}

const StudentClassCard: React.FC<StudentClassCardProps> = ({
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
        <Text>By: {data.teacherName}</Text>
        <Text>Your Attendance: {data.totalAttendancePercentage}%</Text>
        <Text
          style={[
            classCardStyles.liveText,
            data.alreadyGiven && classCardStyles.attendanceGiven,
          ]}
        >
          {data.isLive &&
            (data.alreadyGiven
              ? 'You have already responded'
              : 'Attendance session is live')}
        </Text>
      </View>
    ),
    [
      data.title,
      data.section,
      data.teacherName,
      data.totalAttendancePercentage,
      data.isLive,
      data.alreadyGiven,
    ],
  );

  const actionBody = useMemo<JSX.Element>(
    () => (
      <>
        <View style={classCardStyles.divider} />
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(StudentClassAction.ATTENDANCE_RECORD)}
          uppercase={false}
        >
          Attendance Record
        </Button>
        <Button
          contentStyle={classCardStyles.btnStyle}
          mode="text"
          onPress={() => onAction(StudentClassAction.UN_ENROLL)}
          uppercase={false}
        >
          Un Enroll
        </Button>
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

export default StudentClassCard;
