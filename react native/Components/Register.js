import React, { useState, createRef, useEffect, useRef } from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import ProfileImage from '../assets/Images/ProfileImage.png'
import Loader from './Loader';
import sql from '../SQL/sql'
import * as FileSystem from 'expo-file-system';

// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
const Register = (props) => {

  const regexEmail = /^(([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}))$/;
  const regexPassword = /^(.{8,49})$/;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setUserEmail] = useState('');
  const [PictureUri, setPictureUri] = useState();
  const [path, setPath] = useState()
  const [Password, setUserPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [errortext, setErrortext] = useState('');

  const { navigation } = props;
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [isFocusedEmail, SetIsFocusedEmail] = useState(false)
  const [errorEmail, SetIsErrorEmail] = useState(false)
  const [errorEmailExist, SetIsErrorEmailExist] = useState(false)
  const [errorPass, SetIsErrorPass] = useState(false)
  const [isVisiblePass, SetIsIsVisiblePass] = useState(false)
  const [loading, setLoading] = useState(false);

  const [resourcePath, setResourcePath] = useState([])

  const UserNewRegister = async () => {
    let user = null
    if (handleInputTesting !== true) {
      user = await sql.Register(FirstName, LastName, Email, Password, PictureUri, Gender.split()[0])
      console.log(user);
      if (user.ID === undefined) {
        alert('User is exists')
      }
      navigation.navigate('Login')
    }
    else {
      alert('Please check again')
    }
  }

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  //Checks if all fields are filled in correctly if it does not display an error
  const handleInputTesting = () => {
    if (FirstName === '') {
      console.log(FirstName);
      return false;
    }
    if (LastName === '') {
      console.log(LastName);
      return false;
    }
    if (Email === '' || !(regexEmail.test(Email.toUpperCase()))) {
      console.log(Email);
      return false;
    }
    if (Password === '' || !(regexPassword.test(Password.toUpperCase()))) {
      console.log(Password);
      return false;
    }
    if (Gender === '') {
      setErrorGender(false)
      return false;
    }
    if (PictureUri === '') {
      setPictureUri(ProfileImage)
    }
    return true;
  }

  // it`s the same function like in AppImageInput 
  const pickImage = async () => {
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
          let obj = { name: FirstName, folder: "userProfile", base64: content }
          let image = await sql.UploadImage(obj)
          let imagePath = image
          setPictureUri(imagePath)
          setPath(imagePath)
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // when it`s clicked its will show alert with oprions
  const UplaodImageUser = () => {
    Alert.alert(
      "Choose an image from the",
      "gallery",
      [
        {
          text: "Gallery",
          onPress: () => pickImage()
        },
        {
          text: "Cencel", onPress: () => console.log("Cencel Pressed"),
          style: 'cancel'
        }
      ]
    )
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
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 35, marginTop: 25, marginBottom: 40, fontFamily: 'Snell Roundhand' }}>Register</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(FirstName) => setFirstName(FirstName)}
              underlineColorAndroid="#f000"
              placeholder="Enter First name"
              placeholderTextColor="#8b9cb5"
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
              placeholder="Enter Last name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
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
              onChangeText={(Email) => setUserEmail(Email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              //ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Password) =>
                setUserPassword(Password)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              //ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.RadioButton}>
            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={Gender}>
              <View >
                <RadioButton value="Male" />
                <Text style={styles.TextRadioButton}>Male</Text>
              </View>
              <View>
                <RadioButton value="Female" />
                <Text>Female</Text>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.pictureStyle}>
            <TouchableOpacity
              onPress={UplaodImageUser}>
              <Image
                source={ProfileImage}
                style={{
                  width: 50,
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                  marginTop: -40,
                  marginLeft: 0
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
            //onPress={handleSubmitButton}
            onPress={UserNewRegister}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 0,
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
    marginTop: 10,
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
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'blue',
  },
  inputStyle2: {
    flex: 1,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'blue',
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  RadioButton: {
    flex: 1,
    marginLeft: 50,
  },
  pictureStyle: {
    flex: 1,
    marginLeft: 200,
    marginTop: -70
  }
});
