import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  useWifiStateChangeLister,
  HotSpotModuleSettings,
  RnAndroidHotspot,
  DefaultHotSpotConfig,
} from 'rn-android-hotspot';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  btn: {
    backgroundColor: '#2296F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    margin: 4,
  },
  textColor: {
    color: '#fff',
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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
const Row: React.FC = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

const EditDebugSettings = (): JSX.Element => {
  const [isWifiRunning, disableWifiListener] = useWifiStateChangeLister();
  const [isHotSpotRunning, setIsHotSpotRunning] = useState(false);
  const [hotspotMacId, setHotspotMacId] = useState<string>(
    DefaultHotSpotConfig.MACID,
  );
  const [hotspotSSID, setHotspotSSID] = useState<string>(
    DefaultHotSpotConfig.SSID,
  );
  const settings = HotSpotModuleSettings.getInstance();

  useEffect(() => {
    (async () => {
      await RnAndroidHotspot.startWifi();
    })();

    // RnAndroidHotspot.setSetting(s);
  }, []);

  useEffect(() => {
    (async () => {
      const {
        success: _isHotSpotRunning = false,
      } = await RnAndroidHotspot.isHotspotRunning();

      setIsHotSpotRunning(_isHotSpotRunning);
    })();

    return disableWifiListener;
  }, [disableWifiListener, isWifiRunning]);

  return (
    <View style={styles.container}>
      <Row>
        <Text>isWifiRunning</Text>
        <Switch
          value={isWifiRunning}
          onValueChange={val => {
            settings.isWifiRunning = val;
          }}
        />
      </Row>

      <Row>
        <Text>isHotSpotRunning</Text>
        <Switch
          value={isHotSpotRunning}
          onValueChange={val => {
            settings.isHotspotRunning = val;
          }}
        />
      </Row>

      <Row>
        <TextInput
          value={hotspotMacId}
          placeholder="hotspot Mac Id"
          style={styles.textContainer}
          onChangeText={setHotspotMacId}
        />
        <Button
          title="Set Hotspot Mac Id"
          onPress={() => {
            settings.hotSpotMacId = hotspotMacId;
          }}
        />
      </Row>

      <Row>
        <TextInput
          value={hotspotSSID}
          placeholder="hotspot SSID "
          style={styles.textContainer}
          onChangeText={setHotspotSSID}
        />
        <Button
          title="Set Hotspot ssid"
          onPress={() => {
            settings.hotSpotSSID = hotspotSSID;
          }}
        />
      </Row>
    </View>
  );
};

export default EditDebugSettings;
