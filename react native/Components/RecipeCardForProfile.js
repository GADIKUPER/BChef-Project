import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity ,View } from "react-native";
import RecipeActionsBar from "./RecipeActionsBar";
import ThreePoints from '../assets/Images/3Points.png'
import sql from '../SQL/sql'
import ProfileImage2 from "../assets/Images/ProfileImage.png";

const RecipeCardForProfile = ({ recipe }) => {  
 
const DeleteRecipe = async () =>{
  let Recipe = await sql.DeleteRecipe(recipe.Recipe_Id)
  console.log("Delete Recipe=>",Recipe);
}

  const createThreeButtonAlert = () =>{
    Alert.alert(
      "Do you Delete Your post",
      "Are you sure?????",
      [
        {
          text: "Delete",
          onPress: () => DeleteRecipe()
        },
        // {
        //   text: "Update",
        //   onPress: () => navigation.navigate('UpdatePost')
        // },
        { text: "Cencel", onPress: () => console.log("Cencel Pressed"),
          style:'cancel' }
      ]
    );
   }
  return (
    <View style={styles.main}>
      <View style={styles.profileSection}>
        <View style={styles.firstProfileBox}>
        <Image style={{marginLeft:50,width:50,height:50,marginLeft:10,marginTop:2,borderRadius:50}} source={{uri:recipe.UserPictureUri}}/>
          <Text style={{fontWeight:'bold',fontSize:15,marginLeft:8}}>{recipe.FirstName} {recipe.LastName}</Text>
        </View>
        <View style={styles.main2}>
        
        <TouchableOpacity onPress={createThreeButtonAlert}>
            <Image source={ThreePoints}
            style={{
                width:6,
                height:18,
                marginBottom:1,
                marginTop:1
            }}/>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
         <View style={{flex:1}}>
          <Text style={{fontWeight:'bold',fontSize:20}}>{recipe.RecipeName}</Text>
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
    marginHorizontal: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: "#ECF0F3",
  },
  main2: {
    marginHorizontal: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: "#ECF0F3",
    marginTop:25,
    borderRadius:15
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
  },
  mainImage: {
    width: '100%',
    height: '60%',
    marginBottom:20
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

export default RecipeCardForProfile;
