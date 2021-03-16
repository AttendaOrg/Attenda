import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  header: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: { paddingHorizontal: 10, paddingVertical: 5 },
});

interface Props {
  title: string;
}

const Collapsible: React.FC<Props> = ({ children, title }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const body = <View style={styles.body}>{children}</View>;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={styles.header}>
          <Text>{title}</Text>
          <Text>{collapsed ? '+' : '-'}</Text>
        </View>
      </TouchableOpacity>
      {!collapsed && body}
    </View>
  );
};

export default Collapsible;
