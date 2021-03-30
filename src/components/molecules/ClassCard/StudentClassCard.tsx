import React, { useMemo, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import Shimmer from '../../atoms/Shimmer/Shimmer';
import ClassCardActionBtn from './ClassCardActionBtn';
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
        <Text
          numberOfLines={1}
          style={[classCardStyles.className, classCardStyles.txt]}
        >
          {data.title}
        </Text>
        <Text style={classCardStyles.txt}>{data.section}</Text>

        {isOpened && (
          <>
            <Text style={classCardStyles.txt}>By: {data.teacherName}</Text>
            <Text style={classCardStyles.txt}>
              Your Attendance: {data.totalAttendancePercentage}%
            </Text>
          </>
        )}

        {data.isLive && <View style={{ height: 8 }} />}
        <Text style={[classCardStyles.liveText, classCardStyles.txt]}>
          {data.isLive &&
            (data.alreadyGiven
              ? 'You have already responded'
              : 'Attendance session is live')}
        </Text>
      </View>
    ),
    [
      isOpened,
      data.title,
      data.isLive,
      data.section,
      data.teacherName,
      data.alreadyGiven,
      data.totalAttendancePercentage,
    ],
  );

  const actionBody = useMemo<JSX.Element>(
    () => (
      <>
        <View style={classCardStyles.divider} />
        <ClassCardActionBtn
          onPress={() => onAction(StudentClassAction.ATTENDANCE_RECORD)}
        >
          Attendance Record
        </ClassCardActionBtn>
        <ClassCardActionBtn
          onPress={() => onAction(StudentClassAction.UN_ENROLL)}
        >
          Un Enroll
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

export default StudentClassCard;
