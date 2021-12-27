import React, { Component, useContext } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createDrawerNavigator,} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Components/Login";
import Register from "../Components/Register";
import HomePage from "../Components/HomePage";
import BchefRotation from "../Animation/BchefRotation";
import EditProfile from "../Components/EditProfile";
import Picture from "../Components/Picture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCreatePage from "../Components/RecipeCreatePage";
import Profile from "../Components/Profile";
import SearchRecipePage from "../Components/SearchRecipePage";
import SearchResultsPage from "../Components/SearchResultsPage";
import RecipeDetailsPage from "../Components/RecipeDetailsPage";
import { DrawerNavigation } from "./DrawerNavigation";
import MessagesScreen from "../Message/MessageScreen";
import ChatScreen from "../Message/ChatScreen";
import ForgotPassword from '../Components/ForgotPassword'
import UpdatePost from "../Components/UpdatePost";
import { BchefContext } from "../Components/BchefContext";
import NavigationAdmin from "./NavigateAdmin";
import { DrawerNavigationAdmin } from './DrawerNavigationAdmin'
import PageAdminHome from "../Administrator/PageAdminHome";
import ListOfSpices from "../Administrator/ListOfSpices";
import ListOfIngredients from "../Administrator/ListOfIngredients";
import ListOfPreparation from '../Administrator/ListOfPreparation'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// פונקציה לקריאה לדפים עצמם
function MyDrawer() {
  
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? "permanent" : "front";
  return (
      <View style={{ flex: 1}}>
      <Drawer.Navigator 
        drawerContent={props => <DrawerNavigation {...props} />}>
        <Drawer.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
        <Drawer.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Drawer.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
        <Drawer.Screen name="UploadRecipe" component={RecipeCreatePage} />
        <Drawer.Screen name="SearchRecipe" component={SearchRecipePage} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </View>
  );
}

function MyDrawer2() {
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? "permanent" : "front";
  return (

    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={props => <DrawerNavigationAdmin {...props} />}>
        <Drawer.Screen name="PageAdminHome" component={PageAdminHome} options={{headerShown: false}}/>
        <Drawer.Screen name="UploadRecipe" component={RecipeCreatePage} options={{headerShown: false}}/>
        <Drawer.Screen name="SearchRecipe" component={SearchRecipePage} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </View>

  );
}

function SplashScreen({ navigation }) {
  // const {user,setUser} = useContext(BchefContext)
  setTimeout(async () => {
    let user = await AsyncStorage.getItem('user')
 
   user = JSON.parse(user)
    console.log("LoginUser=>",user);
    if(user === null)
    {
      
      navigation.navigate('Login')
    }
    
    else{
      console.log(user);
      if(user.UserType == 2)
      {
        navigation.navigate('PageAdminHome')
      }
      if(user.UserType == 0 || user.UserType == 1)
      {
        navigation.navigate('HomePage')
      }
     
    }
     
  }, 3000);
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <BchefRotation />
    </View>
  );
}

export default class Navigation extends Component {

  render() {
    return (
      <NavigationContainer>

        <Stack.Navigator>

          {
            <Stack.Screen
              name="splash_Screen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
          }

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Picture"
            component={Picture}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HomePage"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RecipeCreatePage"
            component={RecipeCreatePage}
            options={{
            headerShown: false,
            }}
          />
          <Stack.Screen
            name="RecipeDetailsPage"
            component={RecipeDetailsPage}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="SearchRecipePage"
            component={SearchRecipePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchResultsPage"
            component={SearchResultsPage}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="MessagesScreen"
            component={MessageStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdatePost"
            component={UpdatePost}
            options={{
              headerShown: true,
            }}
          />
         <Stack.Screen
            name="PageAdminHome"
            component={MyDrawer2}
            options={{
              headerShown: false,
            }}
          />
         
          <Stack.Screen
            name="ListOfSpices"
            component={ListOfSpices}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="ListOfIngredients"
            component={ListOfIngredients}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="ListOfPreparation"
            component={ListOfPreparation}
            options={{
              headerShown: true,
            }}
          />
      
        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}
const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: -50,
    marginTop: -20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

// import React, { Component, useContext } from "react";
// import { StyleSheet, View, useWindowDimensions } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import {createDrawerNavigator,} from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../Components/Login";
// import Register from "../Components/Register";
// import HomePage from "../Components/HomePage";
// import BchefRotation from "../Animation/BchefRotation";
// import EditProfile from "../Components/EditProfile";
// import Picture from "../Components/Picture";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import RecipeCreatePage from "../Components/RecipeCreatePage";
// import Profile from "../Components/Profile";
// import SearchRecipePage from "../Components/SearchRecipePage";
// import SearchResultsPage from "../Components/SearchResultsPage";
// import RecipeDetailsPage from "../Components/RecipeDetailsPage";
// import { DrawerNavigation } from "./DrawerNavigation";
// import MessagesScreen from "../Message/MessageScreen";
// import ChatScreen from "../Message/ChatScreen";
// import ForgotPassword from '../Components/ForgotPassword'
// import UpdatePost from "../Components/UpdatePost";
// import { BchefContext } from "../Components/BchefContext";

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// // פונקציה לקריאה לדפים עצמם
// function MyDrawer() {
  
//   const dimension = useWindowDimensions();
//   const drawerType = dimension.width >= 700 ? "permanent" : "front";
//   return (
//       <View style={{ flex: 1}}>
//       <Drawer.Navigator 
//         drawerContent={props => <DrawerNavigation {...props} />}>
//         <Drawer.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
//         <Drawer.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
//         <Drawer.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
//         <Drawer.Screen name="UploadRecipe" component={RecipeCreatePage} />
//         <Drawer.Screen name="SearchRecipe" component={SearchRecipePage} options={{headerShown: false}}/>
//       </Drawer.Navigator>
//     </View>
//   );
// }

// function SplashScreen({ navigation }) {
//   const {user,setUser} = useContext(BchefContext)
//   setTimeout(async () => {
//     let LoginUser = await AsyncStorage.getItem('user')
   
//     if(LoginUser !== null)
//     {
//       setUser(LoginUser)
//       navigation.navigate('HomePage')
//     }
    
//     if(LoginUser == null)
//       navigation.navigate('Login');
//   }, 3000);
//   return (
//     <View
//       style={{
//         backgroundColor: "white",
//         alignItems: "center",
//         justifyContent: "center",
//         flex: 1,
//       }}
//     >
//       <BchefRotation />
//     </View>
//   );
// }

// export default class Navigation extends Component {

//   render() {
//     return (
//       <NavigationContainer>

//         <Stack.Navigator>

//           {
//             <Stack.Screen
//               name="splash_Screen"
//               component={SplashScreen}
//               options={{
//                 headerShown: false,
//               }}
//             />
//           }

//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="Register"
//             component={Register}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPassword}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="Picture"
//             component={Picture}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="HomePage"
//             component={MyDrawer}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="RecipeCreatePage"
//             component={RecipeCreatePage}
//             options={{
//             headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="RecipeDetailsPage"
//             component={RecipeDetailsPage}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="SearchRecipePage"
//             component={SearchRecipePage}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="SearchResultsPage"
//             component={SearchResultsPage}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="MessagesScreen"
//             component={MessageStack}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="EditProfile"
//             component={EditProfile}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="Profile"
//             component={Profile}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="UpdatePost"
//             component={UpdatePost}
//             options={{
//               headerShown: true,
//             }}
//           />
        
      
//         </Stack.Navigator>

//       </NavigationContainer>
//     );
//   }
// }
// const MessageStack = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen name="Messages" component={MessagesScreen} />
//     <Stack.Screen
//       name="Chat"
//       component={ChatScreen}
//       options={({ route }) => ({
//         title: route.params.userName,
//         headerBackTitleVisible: false,
//       })}
//     />
//   </Stack.Navigator>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     marginBottom: -50,
//     marginTop: -20,
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
// });
