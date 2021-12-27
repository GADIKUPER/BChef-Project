import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";
import RecipeActionsBar from "./RecipeActionsBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeCard = ({ recipe }) => {
 
  const [ID, setID] = useState('')
  const [FirstName, setFirstName] = useState(''); 
  const [LastName, setLastName] = useState(''); 
  const [Picture, setPicture] = useState(ProfileImage); 

  // Gives us the data of the same user
  const ItemsUser =async()=>{
    let user = await AsyncStorage.getItem('user')
    console.log(user);
    user = JSON.parse(user)
    setID(user.ID)
    setFirstName(user.FirstName)
    setLastName(user.LastName)
    setPicture(user.PictureUri)
    console.log(user.ID);
  }

  useEffect(()=>{
    ItemsUser()
  },[])

  return (
    <View style={styles.main}>
      <View style={styles.profileSection}>
        <View style={styles.firstProfileBox}>
          <Image style={{ marginTop: 50, marginLeft: 50, width: 50, height: 50, marginLeft: 10, marginTop: 2,borderRadius:50 }} source={{uri:recipe.UserPictureUri}} />
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 8 }}>{recipe.FirstName} {recipe.LastName}</Text>
        </View>

      </View>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{recipe.RecipeName}</Text>
        </View>
        <Image style={styles.mainImage} source={{uri:recipe.RecipePictureUri}} />
      </View>
      <RecipeActionsBar recipe={recipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 18,
    marginHorizontal: -25,
    paddingTop: 5,
    paddingLeft: -20,
    paddingRight: 18,
    marginBottom: 15,
    paddingVertical: 10,
    // paddingHorizontal:-10,
    backgroundColor: "#FFFFFF",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  firstProfileBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 150,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: '#fff5ee',
    marginLeft:18
  },
  recipeDescriptionText: {
    width: "50%",
    // height: "90%",
    // maxHeight: "90%",
    // overflow: "hidden",
  },
  mainImage: {
    width: '120%',
    height: '80%',
    
  },
  buttonsBar: {
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  buttonInButtonBar: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRightColor: "black",
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heartImg: {
    width: 25,
    height: 25,
  },
});

export default RecipeCard;
