import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Loader';
import sql from '../SQL/sql'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from "../Navbar/Navbar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const EditProfile = ({ navigation }) => {
  const [ID, setID] = useState('')
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState(''); 
  const [Picture, setPicture] = useState(); 
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [path, setPath] = useState()

  const emailInputRef = createRef();

  const ItemsUser = async () => {
    let user = await AsyncStorage.getItem('user')
    console.log("user=>>>>>>", user);
    user = JSON.parse(user)
    setID(user.ID)
    setFirstName(user.FirstName)
    setLastName(user.LastName)
    setPicture(user.PictureUri)
    console.log(user.ID);
  }

  const LoginHendler = async () => {


  };

  useEffect(() => {
    ItemsUser()
    LoginHendler()
  }, [])

  // Updates the modified fields in data
  const PutEditProfile = async () => {
    let editUser = await sql.PutEditProfile(ID, FirstName, LastName, Picture)
    let user = await sql.GetUserById(ID);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.replace('HomePage')
  }

  const pickImage = async () => {
    let name1 = Math.floor(Math.random() * 1000) + 1;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
      });
      if (!result.cancelled) {
        if (Platform.OS !== 'web') {
          var content = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
          result.uri = content
          let obj = { name: name1, folder: "userProfile", base64: content }
          let image = await sql.UploadImage(obj)
          let imagePath = image
          setPicture(imagePath)
          console.log(Pi);
          setPath(imagePath)
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Navbar />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>

        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserFirstName) => setFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              defaultValue={FirstName}
              placeholderTextColor="#000000"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(LastName) => setLastName(LastName)}
              underlineColorAndroid="#f000"
              defaultValue={LastName}
              placeholderTextColor="#000000"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={pickImage}>
              <Image
                source={{ uri: Picture }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginTop: 10,
                  marginLeft: 120
                }}

              />

            </TouchableOpacity>
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={handleSubmitButton}
            onPress={PutEditProfile}>
            <Text style={styles.buttonTextStyle}>Change Now</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
export default EditProfile;