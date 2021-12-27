import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Text, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper'
import ProfileImage from '../assets/Images/ProfileImage.png'
import { Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import Bchef from '../assets/Images/Bchef.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerNavigationAdmin(props) {
    const [FirstName, setFirstName] = useState('Gadi');
    const [LastName, setLastName] = useState('Kupersmit');
    const [Picture, setPicture] = useState(ProfileImage);
    const [NumOfPosts, setNumOfPosts] = useState('50');

    const loadUser = async()=>{
        let user = await AsyncStorage.getItem('user')
        if(user){
            user = JSON.parse(user)
            setFirstName(user.FirstName)
            setLastName(user.LastName)
            setPicture(user.Picture)
        }
    }

      useEffect(()=>{
        loadUser()
        },[])
    const LogOut= async()=>{
        await AsyncStorage.removeItem('user')
        props.navigation.navigate('Login')
      }
    return (
        <View style={Styles.drawerNav}>

            <DrawerContentScrollView {...props}>
                <View style={Styles.drawerNav}>
                    <View style={Styles.UserInfoSection}>
                        <View>
                            <Avatar.Image source={Picture} size={50} style={{ marginLeft: 10, marginTop: 20 }} />
                            <View style={{ marginLeft: 65, marginTop: -30, flexDirection: 'column' }}>
                                <Title>{FirstName} {LastName}</Title>
                            </View>
                        </View>
                       
                    </View>
                    <Drawer.Section style={Styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo name="home" size={24} color="gray" />
                            )}
                            label="Home"
                            onPress={() => props.navigation.navigate('PageAdminHome')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="cloud-upload" size={24} color="gray" />
                            )}
                            label="Upload Recipe"
                            onPress={() => props.navigation.navigate('UploadRecipe')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="search" size={24} color="gray" />
                            )}
                            label="Search Recipe"
                            onPress={() => props.navigation.navigate('SearchRecipe')} />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={Styles.bottomDrawerSection}>
                 <DrawerItem
                    icon={({ color, size }) => (
                        <AntDesign name="logout" size={24} color="#555555" />
                    )}
                    label="Sign Out"
                    onPress={LogOut} />
            </Drawer.Section>
        </View>

    )
}

const Styles = StyleSheet.create({
    drawerNav: {
        flex: 1
    },
    UserInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4"
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})