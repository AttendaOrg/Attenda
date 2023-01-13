import SvgUri from 'expo-svg-uri-reborn';
import React from 'react';
import {
  ImageURISource,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { base64Encode } from '../../../util';

const styles = StyleSheet.create({
  mainContainer: {
    margin: 2,
  },
  container: {
    borderRadius: 4,
    padding: 16,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    top: 0,
    flex: 1,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSelected: { display: 'none' },
});

const svgSource =
  '<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m128 481.095v-419.284c0-17.069-13.837-30.905-30.905-30.905h-66.19c-17.068-.001-30.905 13.836-30.905 30.905v14.805l15.453 24.857-15.453 24.856v290.247l15.453 24.857-15.453 24.856v14.805c0 17.069 13.837 30.906 30.905 30.906h66.189c17.069 0 30.906-13.837 30.906-30.905z" fill="#ffe179"/><path d="m97.095 30.905h-30.906c17.069 0 30.905 13.837 30.905 30.905v419.284c0 17.069-13.837 30.905-30.905 30.905h30.905c17.069.001 30.906-13.836 30.906-30.904v-419.284c0-17.069-13.837-30.906-30.905-30.906z" fill="#fbd268"/><g><path d="m0 76.616h128v49.713h-128z" fill="#fef0ae"/><path d="m97.095 76.616h30.905v49.713h-30.905z" fill="#fee97d"/><path d="m0 416.576h128v49.713h-128z" fill="#fef0ae"/><path d="m97.095 416.576h30.905v49.713h-30.905z" fill="#fee97d"/></g><g><path d="m64 372.305c-4.267 0-7.726-3.459-7.726-7.726v-186.253c0-4.267 3.459-7.726 7.726-7.726s7.726 3.459 7.726 7.726v186.253c0 4.267-3.459 7.726-7.726 7.726z" fill="#fef0ae"/></g><g><path d="m128 481.095v-387.349l15.453-62.841c0-17.069-1.616-15.453 15.453-15.453h50.736c17.069 0 30.905-1.616 30.905 15.453l15.453 62.841v387.348c0 17.069-13.837 30.906-30.905 30.906h-66.189c-17.069 0-30.906-13.837-30.906-30.905z" fill="#f58a97"/><path d="m225.095 9.894h-30.905c17.069 0 30.905 3.943 30.905 21.011v62.841 387.348c0 17.069-13.837 30.905-30.905 30.905h30.905c17.068.001 30.905-13.836 30.905-30.904v-387.349l-15.453-52.946c0-17.069 1.616-30.906-15.452-30.906z" fill="#f07281"/><g><path d="m222.116 2.329-27.927-2.329h-35.284c-17.068 0-30.905 13.837-30.905 30.905v62.841h128l-2.979-60.512c0-17.068-13.836-30.905-30.905-30.905z" fill="#f6b2bb"/><path d="m225.095 0h-30.905c17.069 0 30.905 13.837 30.905 30.905v62.841h30.905v-62.841c0-17.068-13.837-30.905-30.905-30.905z" fill="#f8a6af"/><path d="m158.905 512h66.189c17.069 0 30.906-13.837 30.906-30.905v-62.841h-128v62.841c0 17.068 13.837 30.905 30.905 30.905z" fill="#f6b2bb"/><path d="m225.095 418.254v62.841c0 17.069-13.837 30.905-30.905 30.905h30.905c17.068 0 30.905-13.837 30.905-30.905v-62.841z" fill="#f8a6af"/></g><g><path d="m192 373.724c-4.267 0-7.726-3.459-7.726-7.726v-219.996c0-4.267 3.459-7.726 7.726-7.726s7.726 3.459 7.726 7.726v219.996c0 4.267-3.459 7.726-7.726 7.726z" fill="#f6b2bb"/></g></g><g><path d="m386.107 489.957-128.638-407.816c-5.237-16.602 3.968-34.308 20.56-39.548l64.34-20.319c16.592-5.24 34.287 3.971 39.524 20.573l128.638 407.817c5.237 16.602-3.968 34.308-20.56 39.548l-64.34 20.319c-16.592 5.239-34.287-3.972-39.524-20.574z" fill="#8fd8fa"/><path d="m510.531 450.663-128.638-407.817c-4.629-14.674-18.99-23.565-33.72-21.816 1.145 1.973 2.1 4.097 2.815 6.364l128.637 407.816c5.237 16.602-3.968 34.308-20.56 39.548l-64.34 20.319c-1.927.609-3.868 1.014-5.804 1.244 7.241 12.478 22.383 18.733 36.709 14.209l64.34-20.319c16.592-5.24 25.797-22.947 20.561-39.548z" fill="#6bcdfe"/><path d="m442.179 387.797-36.165 11.422c-4.98 1.573-10.292-1.19-11.863-6.171l-74.499-236.183c-1.57-4.978 1.191-10.287 6.169-11.859l36.165-11.422c4.98-1.573 10.292 1.19 11.863 6.171l74.499 236.183c1.57 4.978-1.191 10.287-6.169 11.859z" fill="#eaf6ff"/></g></g></svg>';
const defaultImageUri = `data:image/svg+xml;base64,${base64Encode(svgSource)}`;

export interface IconSelectBtnPops {
  source: string | ImageURISource | null | undefined;
  plainIcon?: boolean;
  selected: boolean;
  onChange: (selected: boolean) => void;
}

const convertStringToUri = (
  data: string | ImageURISource | null | undefined,
): ImageURISource => {
  if (data === undefined) return { uri: defaultImageUri };
  if (data === null) return { uri: defaultImageUri };
  if (typeof data === 'string') return { uri: data };

  return data;
};

const IconSelectBtn: React.FC<IconSelectBtnPops> = ({
  source,
  selected = false,
  onChange = () => null,
  plainIcon = false,
}): JSX.Element => {
  const s = convertStringToUri(source);

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => onChange(!selected)}
    >
      <View
        style={[
          !plainIcon && styles.container,
          !plainIcon && styles.iconContainer,
        ]}
      >
        <View style={{ height: 50, width: 50 }}>
          <SvgUri height={50} width={50} source={s} />
        </View>
      </View>
      <View
        style={[
          !plainIcon && styles.container,
          selected && styles.selectedContainer,
          !selected && styles.notSelected,
        ]}
      >
        <MaterialIcons name="check" size={34} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default IconSelectBtn;
