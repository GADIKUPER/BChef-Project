import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Text, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper'
import ProfileImage from '../assets/Images/ProfileImage.png'
import { Ionicons, Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Bchef from '../assets/Images/Bchef.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import sql from '../SQL/sql'
import { BchefContext } from '../Components/BchefContext'
import { Divider } from 'react-native-elements';
import Picture from '../Components/Picture'
export function DrawerNavigation(props) {

    const { user, setUser } = useContext(BchefContext)
    const [FirstName2, setFirstName] = useState('');
    const [LastName2, setLastName] = useState('');
    const [Picture2, setPicture] = useState("");
    const [CurrentUser, setCurrentUser] = useState({});
    const [dataSource, setdataSource] = useState([])



    const loadUser = async () => {
        
        let LoginUser = await AsyncStorage.getItem('user')

        LoginUser = JSON.parse(LoginUser)
        
        let GetUser = await sql.GetUserById(LoginUser.ID)
        console.log("LoginUser =======>",LoginUser);
        setCurrentUser(LoginUser);
        setFirstName(LoginUser.FirstName)
        setLastName(LoginUser.LastName)
        setPicture(LoginUser.PictureUri)

      
    }

  

    useEffect(() => {
       const func = async () =>{
        await loadUser()
        console.log("Picture2=>",Picture2);

       }
       func()
    },[])



    

    const LogOut = async () => {
        await AsyncStorage.removeItem('user')
        props.navigation.navigate('Login')
    }
    return (

        <View style={Styles.drawerNav}>
            <DrawerContentScrollView {...props}>
                <View style={Styles.drawerNav}>
                    <View style={Styles.UserInfoSection}>
                        <View>
                            <Avatar.Image source={{uri: Picture2}} size={50} style={{ marginLeft: -10, marginTop: 20 }} />
                            <View style={{ marginLeft: 65, marginTop: -30, flexDirection: 'column' }}>
                                <Text style={{ fontSize: 20, fontWeight: '800' }}>{FirstName2} {LastName2}</Text>
                            </View>
                        </View>
                        <View style={Styles.row, { marginLeft: 80, marginTop: 15 }}>
                            <View >
                               <Text style={{color:'#cccccc',marginLeft:"-50%",marginRight:"-100%",marginTop:"-5%"}}>_________________________________________</Text>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={Styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo name="home" size={24} color="#555555" />
                            )}
                            label="Home"
                            onPress={() => props.navigation.navigate('Home')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="md-people" size={24} color="#555555" />
                            )}
                            label="Profile"
                            onPress={() => props.navigation.navigate('Profile')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="edit" size={24} color="#555555" />
                            )}
                            label="Edit Profile"
                            onPress={() => props.navigation.navigate('EditProfile')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="cloud-upload" size={24} color="#555555" />
                            )}
                            label="Upload Recipe"
                            onPress={() => props.navigation.navigate('UploadRecipe')} />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="search" size={24} color="#555555" />
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
    },
    ite: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
})