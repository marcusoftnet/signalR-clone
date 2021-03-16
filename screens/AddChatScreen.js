import firebase from 'firebase';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection('chats')
      .add({ chatName })
      .then(navigation.goBack())
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter chat name'
        value={chatName}
        onChangeText={(text) => setChatName(text)}
        onSubmitEditing={createChat}
        autoFocus
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
      />
      <Button onPress={createChat} title='Create new chat' />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
