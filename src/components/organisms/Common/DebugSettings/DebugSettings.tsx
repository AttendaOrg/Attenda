/* eslint-disable no-console */
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  RnAndroidHotspot,
  HotspotModuleErrors,
  useWifiStateChangeLister,
  useWifiHotSpotListScannerListener,
} from 'rn-android-hotspot';
import Collapsible from './Collapsible';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 5,
  },
  btn: {
    backgroundColor: '#2296F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    flex: 1,
    margin: 4,
  },
  textColor: {
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

const Button: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress = () => null,
}) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.textColor}>{title}</Text>
  </TouchableOpacity>
);

// #region helper functions (collapsed)
const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    console.log(granted);

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
    console.warn(err);

    return false;
  }
};

const requestFineLocation = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Give Location Permission',
        message: 'We Need Location Permission for accessing hotspot info.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  } catch (err) {
    console.warn(err);

    return false;
  }
};
const requestCorseLocation = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Give Location Permission',
        message: 'We Need Location Permission for accessing hotspot info.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  } catch (err) {
    console.warn(err);

    return false;
  }
};

export const convertErrorCodeToString = (
  errCode: HotspotModuleErrors | null | undefined,
): string => {
  // on compile typescript enum converts to a json object.
  // which have the following structure
  // { [key1]: value1, [value1]:key1 }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (HotspotModuleErrors[errCode] !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return HotspotModuleErrors[errCode];
  }

  return 'unknown';
};

const renderBool = (text?: boolean): string => {
  if (text === true) return 'True';
  if (text === false) return 'False';

  return 'null';
};

const renderString = (text?: string): string =>
  text === undefined ? 'null' : text;

// #endregion

// #region Settings (collapsed)
const Settings = () => {
  const [
    hasSettingsWritePermission,
    setHasSettingsWritePermission,
  ] = React.useState<boolean | undefined>();

  const onHasSettingWritePermissionPress = async () => {
    try {
      const success = await RnAndroidHotspot.hasSettingWritePermission();

      setHasSettingsWritePermission(success);
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenSettingWritePermissionIntentPress = async () => {
    await RnAndroidHotspot.openSettingWritePermissionIntent();
  };

  return (
    <Collapsible title="settings section">
      <Text>
        hasSettingsWritePermission:
        {renderBool(hasSettingsWritePermission)}
      </Text>
      <Button
        onPress={onHasSettingWritePermissionPress}
        title="Has Setting Write Permission"
      />
      <View style={styles.divider} />
      <Button
        onPress={onOpenSettingWritePermissionIntentPress}
        title="Open Settings ???"
      />
    </Collapsible>
  );
};
// #endregion

// #region Hotspot (collapsed)
const Hotspot = () => {
  const [SSID, setSSID] = React.useState<string | undefined>();
  const [hotspotMacId, setHotspotMacId] = React.useState<string | undefined>();
  const [hotspotStarted, setHotspotStarted] = React.useState<
    boolean | undefined
  >();
  const [isHotspotRunning, setIsHotspotRunning] = React.useState<
    boolean | undefined
  >();

  const onIsHotspotRunningPress = async () => {
    try {
      const { errorCode, success } = await RnAndroidHotspot.isHotspotRunning();

      if (errorCode === HotspotModuleErrors.HOTSPOT_AP_STATE_DISABLED)
        setIsHotspotRunning(false);
      else setIsHotspotRunning(success);
      console.log(
        { success, errorCode },
        convertErrorCodeToString(errorCode),
        1,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onGetHotspotMacIdPress = async () => {
    try {
      const { errorCode, success } = await RnAndroidHotspot.getHotspotMacId();

      if (errorCode === HotspotModuleErrors.HOTSPOT_AP_STATE_DISABLED)
        setIsHotspotRunning(false);
      if (errorCode === undefined) setHotspotMacId(success);
      console.log({ success, errorCode }, convertErrorCodeToString(errorCode));
    } catch (error) {
      console.log(error);
    }
  };

  const onStartHotspotPress = async () => {
    try {
      await requestCorseLocation();
      await requestFineLocation();
      const { errorCode, success } = await RnAndroidHotspot.startHotspot();

      if (errorCode === HotspotModuleErrors.HOTSPOT_AP_STATE_DISABLED)
        setIsHotspotRunning(false);
      if (errorCode === undefined) setHotspotStarted(success);
      console.log({ success, errorCode }, convertErrorCodeToString(errorCode));
    } catch (error) {
      console.log(error);
    }
  };

  const onStopHotspotPress = async () => {
    try {
      await requestCorseLocation();
      await requestFineLocation();
      const { errorCode, success } = await RnAndroidHotspot.stopHotspot();

      if (errorCode === HotspotModuleErrors.HOTSPOT_AP_STATE_DISABLED)
        setIsHotspotRunning(true);
      if (errorCode === undefined) setHotspotStarted(success);
      console.log({ success, errorCode }, convertErrorCodeToString(errorCode));
    } catch (error) {
      console.log(error);
    }
  };

  const onGetSSidPress = async () => {
    try {
      const { errorCode, success } = await RnAndroidHotspot.getHotspotSSID();

      if (errorCode === HotspotModuleErrors.HOTSPOT_AP_STATE_DISABLED)
        setIsHotspotRunning(true);
      if (errorCode === undefined) setSSID(success);
      console.log({ success, errorCode }, convertErrorCodeToString(errorCode));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Collapsible title="Hotspot">
      <Text>
        isHotspotRunning:
        {renderBool(isHotspotRunning)}
      </Text>
      <Button onPress={onIsHotspotRunningPress} title="is Hotspot Running" />

      <Text>
        hotspotStarted:
        {renderBool(hotspotStarted)}
      </Text>
      <View style={styles.row}>
        <Button onPress={onStartHotspotPress} title="start Hotspot" />
        <Button onPress={onStopHotspotPress} title="stopt Hotspot" />
      </View>

      <Text>
        hotspotMacId:
        {renderString(hotspotMacId)}
      </Text>
      <Button onPress={onGetHotspotMacIdPress} title="get Hotspot MacId" />

      <Text>
        SSID:
        {renderString(SSID)}
      </Text>
      <Button onPress={onGetSSidPress} title="get SSID" />
    </Collapsible>
  );
};

//#endregion

// #region Permission (collapsed)
const Permission = () => {
  const [isGpsEnabled, setIsGpsEnabled] = React.useState(false);
  const [
    canGetLocationPermission,
    setCanGetLocationPermission,
  ] = React.useState(false);
  const [
    isGooglePlayServicesAvailable,
    setIsGooglePlayServicesAvailable,
  ] = React.useState(false);

  const onGetLocationPermission = async (): Promise<void> => {
    const { success } = await RnAndroidHotspot.displayLocationSettingsRequest();

    setCanGetLocationPermission(success ?? false);
  };

  return (
    <Collapsible title="Permissions">
      <Text>
        canGetLocationPermission:
        {renderBool(canGetLocationPermission)}
      </Text>
      <Button
        onPress={onGetLocationPermission}
        title="onGetLocationPermission"
      />

      <Text>
        isGpsEnabled:
        {renderBool(isGpsEnabled)}
      </Text>
      <Button
        onPress={async () => {
          const { success, errorCode } = await RnAndroidHotspot.isGpsEnabled();

          console.log(errorCode);
          setIsGpsEnabled(success ?? false);
        }}
        title="isGpsEnabled"
      />

      <Text>
        isGooglePlayServicesAvailable:
        {renderBool(isGooglePlayServicesAvailable)}
      </Text>
      <Button
        onPress={async () => {
          const {
            success,
            errorCode,
          } = await RnAndroidHotspot.isGooglePlayServicesAvailable();

          console.log(errorCode);
          setIsGooglePlayServicesAvailable(success ?? false);
        }}
        title="isGooglePlayServicesAvailable"
      />

      <Text>Location Permission</Text>
      <Button
        title="Ask location permission"
        onPress={requestLocationPermission}
      />
    </Collapsible>
  );
};
// #endregion

// #region Wifi (collapsed)
const WiFi = () => {
  const [isWifiEnabled] = useWifiStateChangeLister();
  const [
    wifiHotSpotListItems,
    error,
    reScan,
    removeWifiStateListener,
  ] = useWifiHotSpotListScannerListener();

  return (
    <Collapsible title="Wifi">
      <Text>isWifiEnabled - {renderBool(isWifiEnabled)} </Text>

      <View style={styles.row}>
        <Button
          onPress={async () => {
            const { success, errorCode } = await RnAndroidHotspot.startWifi();

            console.log(success, errorCode);

            Alert.alert(`startWifi: ${renderBool(success)}`);
          }}
          title="startWifi"
        />

        <Button
          onPress={async () => {
            const { success, errorCode } = await RnAndroidHotspot.stopWifi();

            console.log(success, errorCode);

            Alert.alert(`stopWifi: ${renderBool(success)}`);
          }}
          title="stopWifi"
        />
      </View>

      <Text>hotspotListItemsError: {convertErrorCodeToString(error)}</Text>

      <Text>hotspotListItems:</Text>
      <Text>{JSON.stringify(wifiHotSpotListItems, null, 4)}</Text>
      <Button
        title="Re-scan"
        onPress={() => {
          removeWifiStateListener();
          reScan();
        }}
      />
    </Collapsible>
  );
};
// #endregion

const DebugSettings = (): JSX.Element => (
  <ScrollView>
    <View style={styles.container}>
      <Settings />
      <Hotspot />
      <Permission />
      <WiFi />
    </View>
  </ScrollView>
);

export default DebugSettings;
