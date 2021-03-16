import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../firebase';

const HeaderLeftComponent = ({ onSignOut }) => {
  return (
    <View style={{ marginLeft: 20 }}>
      <TouchableOpacity onPress={onSignOut} activeOpacity={0.5}>
        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({});
