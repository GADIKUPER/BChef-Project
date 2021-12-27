import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet, RefreshControl, SafeAreaView } from 'react-native'
import RecipeCardForProfile from "./RecipeCardForProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import sql from '../SQL/sql';
import { ScrollView } from 'react-native-gesture-handler';
import { BchefContext } from './BchefContext'
import Navbar from "../Navbar/Navbar";

const Profile = ({ navigation }) => {

  const { user, setUser } = useContext(BchefContext)
  const [PictureUri, setPicture] = useState();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Recipe, setRecipe] = useState([])
  const [filteredRecips, setFilteredRecips] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  // Refresh the Profile page if it is have change like delete
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetRecipesByUser().then(() => setRefreshing(false));
  }, []);

  
  // Show all the Recipes of the user from data/server
  const GetRecipesByUser = async () => {

    let RecipeUser = await AsyncStorage.getItem('user')
    RecipeUser = JSON.parse(RecipeUser)
    setUser(RecipeUser)
    setFirstName(RecipeUser.FirstName)
    setLastName(RecipeUser.LastName)
    setPicture(RecipeUser.PictureUri)
    let dataRecipe = await sql.GetRecipesByUser(RecipeUser.ID)
    setRecipe(dataRecipe)
    setFilteredRecips(dataRecipe)
   
  }

  const GetRecipesByUser2 = async () => {

    let RecipeUser = await AsyncStorage.getItem('user')
    RecipeUser = JSON.parse(RecipeUser)
    
    let dataRecipe = await sql.GetRecipesByUser(RecipeUser.ID)
  
   
  }
  useEffect(() => {

    const func = async () => {
      await GetRecipesByUser();
      await GetRecipesByUser2();

      onRefresh()
    }
   
    func()
  }, [])

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Navbar />
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <Image source={{uri:PictureUri}}
            style={{
              width: 100,
              height: 100,
              // resizeMode: 'contain',
              // margin: 30,
              marginTop: 10,
              marginLeft: 20,
              marginBottom:"35%",
              borderRadius:50
            }}
          />
          <Text style={{ marginLeft: 130, marginTop: "-50%", fontSize: 20, color: 'black', fontWeight: 'bold',marginBottom:50 }}>{FirstName} {LastName}</Text>
         
          <View>
            {filteredRecips.length > 0 ? filteredRecips.map((currentRecipe) => (
              <RecipeCardForProfile recipe={currentRecipe} />
            )) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  main: {
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    marginTop: 25,
    borderRadius: 15
  },

  firstProfileBox: {
    flexDirection: "row",
    alignItems: "center",

  },
  recipeDescriptionBox: {
    borderColor: "black",
    borderWidth: 2,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 10,
    borderRadius: 10
  },
  buttonsBar: {
    marginTop: 35,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 50,
    borderWidth: 1,


    width: 100,
    marginBottom: 12
  },
  buttonInButtonBar: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRightColor: "black",

    alignItems: "center",
    justifyContent: "center",
    width: 100,
    fontSize: 30
  },
  TextInButtonBar: {
    color: '#4169e1',
    fontWeight: '600',
    fontSize: 15
  },
  heartImg: {
    width: 25,
    height: 25,
  },

});

export default Profile

