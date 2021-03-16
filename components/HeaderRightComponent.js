import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HeaderRightComponent = ({ onAddChat }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5}>
        <AntDesign name='camerao' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={onAddChat}>
        <SimpleLineIcons name='pencil' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20,
  },
});
