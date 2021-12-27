import React, { useState, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Loader from "./Loader";
import sql from "../SQL/sql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BchefContext } from "./BchefContext";
import NavigationAdmin from "../Navigation/NavigateAdmin";

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(BchefContext)
  const [Email, setUserEmail] = useState("");
  const [Password, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  //The procedure receives an email and a password 
  //and after receiving the data it saves the data of the
  // same user and then saves them in AsyncStorage
  //Checks what type of user with it admin or regular
  // user and passes on the appropriate Navigate for that user
  const LoginHendler = async () => {

    let LoginUser = await sql.Login(Email, Password);
    // LoginUser = JSON.parse(LoginUser)
    console.log("LoginUser=>",LoginUser);
    if (Email == "" && Password == "") return;
    if (LoginUser !== undefined) {
      setUser(LoginUser)
      await AsyncStorage.setItem("user", JSON.stringify(LoginUser));
      // LoginUser = JSON.parse(LoginUser)
      if (LoginUser.UserType === 1) {
        navigation.navigate("HomePage");
      }
      else if(LoginUser.UserType === 2){
        console.log("LoginUser.UserType",LoginUser.UserType);
        navigation.navigate('PageAdminHome')
      }
    
    }
    else {
      Alert.alert("Please check your email id or password");
    }

  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/Images/Bchef.png")}
                style={{
                  width: 250,
                  height: 350,
                  resizeMode: "contain",
                  marginTop: -65,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Email) => setUserEmail(Email)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Password) => setUserPassword(Password)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={LoginHendler}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("Register")}
            >
              <Text>New Here ? Register</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text style={{ color: "#dc143c" }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    backgroundColor: "white",
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "blue",
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  ResetPassword: {
    color: "#4682b4",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
export default LoginScreen;

// import React, { useState, createRef, useContext } from "react";
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Keyboard,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Alert,
// } from "react-native";
// import Loader from "./Loader";
// import sql from "../SQL/sql";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BchefContext } from "./BchefContext";

// const LoginScreen = ({ navigation }) => {
//   const { user, setUser } = useContext(BchefContext)
//   const [Email, setUserEmail] = useState("");
//   const [Password, setUserPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errortext, setErrortext] = useState("");

//   const passwordInputRef = createRef();

//   //The procedure receives an email and a password 
//   //and after receiving the data it saves the data of the
//   // same user and then saves them in AsyncStorage
//   //Checks what type of user with it admin or regular
//   // user and passes on the appropriate Navigate for that user
//   const LoginHendler = async () => {

//     let LoginUser = await sql.Login(Email, Password);
//     if (Email == "" && Password == "") return;
//     if (LoginUser.ID !== undefined) {
//       setUser(LoginUser)
//       await AsyncStorage.setItem("user", JSON.stringify(LoginUser));
//       if (LoginUser.UserType === 1) {
//         navigation.navigate("HomePage");
//       }
//       else{
//         navigation.navigate("PageAdminHome");
//       }
//     }
//     else {
//       Alert.alert("Please check your email id or password");
//     }

//   };

//   return (
//     <View style={styles.mainBody}>
//       <Loader loading={loading} />
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: "center",
//           alignContent: "center",
//         }}
//       >
//         <View>
//           <KeyboardAvoidingView enabled>
//             <View style={{ alignItems: "center" }}>
//               <Image
//                 source={require("../assets/Images/Bchef.png")}
//                 style={{
//                   width: 250,
//                   height: 350,
//                   resizeMode: "contain",
//                   marginTop: -65,
//                 }}
//               />
//             </View>
//             <View style={styles.SectionStyle}>
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(Email) => setUserEmail(Email)}
//                 placeholder="Enter Email" //dummy@abc.com
//                 placeholderTextColor="#8b9cb5"
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//                 returnKeyType="next"
//                 onSubmitEditing={() =>
//                   passwordInputRef.current && passwordInputRef.current.focus()
//                 }
//                 underlineColorAndroid="#f000"
//                 blurOnSubmit={false}
//               />
//             </View>
//             <View style={styles.SectionStyle}>
//               <TextInput
//                 style={styles.inputStyle}
//                 onChangeText={(Password) => setUserPassword(Password)}
//                 placeholder="Enter Password" //12345
//                 placeholderTextColor="#8b9cb5"
//                 keyboardType="default"
//                 ref={passwordInputRef}
//                 onSubmitEditing={Keyboard.dismiss}
//                 blurOnSubmit={false}
//                 secureTextEntry={true}
//                 underlineColorAndroid="#f000"
//                 returnKeyType="next"
//               />
//             </View>
//             {errortext != "" ? (
//               <Text style={styles.errorTextStyle}>{errortext}</Text>
//             ) : null}
//             <TouchableOpacity
//               style={styles.buttonStyle}
//               activeOpacity={0.5}
//               onPress={LoginHendler}
//             >
//               <Text style={styles.buttonTextStyle}>LOGIN</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.registerTextStyle}
//               onPress={() => navigation.navigate("Register")}
//             >
//               <Text>New Here ? Register</Text>
//             </TouchableOpacity>
//             <View style={{ marginTop: 20 }}>
//               <TouchableOpacity
//                 style={{ alignSelf: "center" }}
//                 onPress={() => {
//                   navigation.navigate("ForgotPassword");
//                 }}
//               >
//                 <Text style={{ color: "#dc143c" }}>Forgot password?</Text>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAvoidingView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "white",
//     alignContent: "center",
//   },
//   SectionStyle: {
//     flexDirection: "row",
//     height: 40,
//     marginTop: 20,
//     marginLeft: 35,
//     marginRight: 35,
//     margin: 10,
//   },
//   buttonStyle: {
//     backgroundColor: "#7DE24E",
//     borderWidth: 0,
//     color: "#FFFFFF",
//     borderColor: "#7DE24E",
//     height: 40,
//     alignItems: "center",
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 20,
//     marginBottom: 25,
//   },
//   buttonTextStyle: {
//     color: "#FFFFFF",
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   inputStyle: {
//     backgroundColor: "white",
//     flex: 1,
//     color: "black",
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: "blue",
//   },
//   registerTextStyle: {
//     color: "black",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 14,
//     alignSelf: "center",
//     padding: 10,
//   },
//   ResetPassword: {
//     color: "#4682b4",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 14,
//     alignSelf: "center",
//     padding: 10,
//   },
//   errorTextStyle: {
//     color: "red",
//     textAlign: "center",
//     fontSize: 14,
//   },
// });
// export default LoginScreen;
