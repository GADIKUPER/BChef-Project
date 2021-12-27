import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import ProfileImage from '../assets/Images/ProfileImage.png';
import SearchBox from "../Components/SearchBox";
import demoRecips from "../demoData/demoRecipes";
import { useNavigation } from '@react-navigation/native';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require("../assets/Images/ProfileImage.png"),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require("../assets/Images/ProfileImage.png"),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require("../assets/Images/ProfileImage.png"),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require("../assets/Images/ProfileImage.png"),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require("../assets/Images/ProfileImage.png"),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

// הפעלת מסך של המשתמשים והצגת כל המשתמשים באפליקציה 
const MessagesScreen = (props) => {
  const [filteredRecips, setFilteredRecips] = React.useState(demoRecips);
  const navigation = useNavigation();
  // הצגת כל המשתמשים שיש בדאטה
  // בחירת משתמש מתוך הטבלה שמוצגת במסך
  // כניסה למסך של ההודעה לאחר בחירת משתמש
  // הצגת תמונת משתמש פעיל כרגע באפליקציה + הצגת המשתמש שנבחר להכנס לצ'אט
  // שליחת הודעה והצגת בועית ההודעה עם שעה + תמונת פרופיל של השולח
    return (
      <Container>
         <View style={{marginLeft:-90,marginTop:-20}}>
       {/* <SearchBox 
          setFilteredRecips={setFilteredRecips}
          demoRecips={demoRecips}
        /> */}
       </View>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              
              <UserInfo> 
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});