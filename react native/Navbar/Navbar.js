import React, { Component,useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TextInput, Button, Menu, Divider, Provider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Register from '../Components/Register';
import Bchef from '../assets/Images/Bchef.png'
import EditProfile from '../Components/EditProfile';
import DrawerNavigator from '../Navigation/DrawerNavigation';
import HomePage from '../Components/HomePage';
import Profile from '../Components/Profile';
import RecipeCreatePage from '../Components/RecipeCreatePage';
import { Header } from 'react-native-elements';
import ProfileImage from '../Components/ProfileImage';
import ProfileImage2 from "../assets/Images/ProfileImage.png";
import { useNavigation,DrawerActions } from '@react-navigation/core';
// import LinearGradient from 'react-native-linear-gradient';
const Stack = createStackNavigator();

const Navbar=()=> {
  const navigation = useNavigation()
    return (
  <View style={{flex:1,backgroundColor:'#ffffff',height:100}}> 
    <MaterialCommunityIcons style={{marginLeft:"4%",marginTop:"13%"}} name="menu" size={40} color='#333333' onPress={()=> navigation.dispatch(DrawerActions.openDrawer())} />
    <Image style={{width:100,height:80,marginLeft:"35%",marginTop:"-20%"}} source={Bchef}/>
  </View>
    );
}     
export default Navbar;