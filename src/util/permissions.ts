import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    // console.log(granted);
    if (
      granted['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }

    return false;
  } catch (err) {
    // console.warn(err);

    return false;
  }
};

export default {};
