import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileImage from '../assets/Images/ProfileImage.png'

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // שיחה בים שני יוזרים שאחד הוא המשתמש במכשיר זה 
    // ומספר שתיים הוא בעצם המשתמש בצד השני (משתמש קצה) שמקבל הודעה או שולח
    // ומחזיר ליד כל הודעה את השעה שבא נשלח הודעה
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:ProfileImage,
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar:ProfileImage ,
        },
      },
    ]);
  }, []);

  // הפעלת הקשרים בין המשתמשים והפעלת שליחת ההודעות ביניהם
  // שימוש בתצורת הודעה על פי 
  // GiftedChat - בועת הודעה
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  // Send - שליחת הודעה על ידי מחלקת 
  // MaterialCommunityIcons - הצגת תמונה של מי ששלח את ההודעה ליד בועת ההודעה
  
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#87ceeb',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  // קריאת כל הפונקציות על מנת שתתבצע הודעה 
  // על פי סדר לוגי 
  // בחירת המשתמש שממנו אנו רוצים את המידע שנשלח או שישלח
  // הצגת הודעה עם שעה שנשלחה 
  // הצגת ההודעה בבועית  עם תמונה ליד הבועית
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});