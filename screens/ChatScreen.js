import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Input, Avatar } from 'react-native-elements';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase';
import firebase from 'firebase';

const ChatScreen = ({ navigation, route }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                'http://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            }}
          />
          <Text style={styles.headerTitleName}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name='arrowleft' size={24} color='white' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, [route]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputMessage,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      })
      .then(() => setInputMessage(''))
      .catch((err) => alert(err.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) => {
              if (data.email === auth.currentUser.email) {
                return (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position='absolute'
                      // WEB - HACK
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                );
              }
              return (
                <View key={id} style={styles.sender}>
                  <Avatar
                    rounded
                    position='absolute'
                    // WEB - HACK
                    containerStyle={{
                      position: 'absolute',
                      bottom: -15,
                      left: -5,
                    }}
                    bottom={-15}
                    left={-5}
                    size={30}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.chatFooter}>
            <TextInput
              style={styles.inputMessage}
              placeholder='Signal message'
              onSubmitEditing={sendMessage}
              value={inputMessage}
              onChangeText={(text) => setInputMessage(text)}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name='send' size={24} color='#2B68E6' />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    flex: 1,
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  inputMessage: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'gray',
    borderRadius: 10,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleName: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    width: 80,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
});
