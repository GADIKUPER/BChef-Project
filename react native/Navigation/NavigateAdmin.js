import React, { Component, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../Message/MessageScreen";
import ChatScreen from "../Message/ChatScreen";
import { DrawerNavigationAdmin } from './DrawerNavigationAdmin'
import PageAdminHome from "../Administrator/PageAdminHome";
import ListOfSpices from "../Administrator/ListOfSpices";
import ListOfIngredients from "../Administrator/ListOfIngredients";
import ListOfPreparation from '../Administrator/ListOfPreparation'
import Login from "../Components/Login";
import Register from "../Components/Register";
import ForgotPassword from '../Components/ForgotPassword'
import BchefRotation from "../Animation/BchefRotation";
import RecipeCreatePage from "../Components/RecipeCreatePage";
import SearchRecipePage from "../Components/SearchRecipePage";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
  setTimeout(async () => {
    let user = await AsyncStorage.getItem('user')
    if(user == null)
      navigation.replace('Login');
    else{
      navigation.replace("PageAdminHome");

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

export default class NavigationAdmin extends Component {
  render() {
    return (
      <NavigationContainer>

        <Stack.Navigator>
          {/* {
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
          /> */}
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
          <Stack.Screen
            name="MessagesScreen"
            component={MessageStack}
            options={{
              headerShown: false,
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
