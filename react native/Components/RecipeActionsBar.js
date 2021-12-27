import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecipeActionsBar = ({ recipe, hideOpenButton = false }) => {

  const navigation = useNavigation();

  // Opens the selected recipe and presents the recipe in its entirety
  const openRecipe = () => {
    navigation.navigate("RecipeDetailsPage", { recipe:recipe });
  };

  return (
    <View style={styles.main}>
      {!hideOpenButton && (
        <TouchableOpacity onPress={openRecipe} style={styles.buttonInButtonBar}>
          <Text style={{fontSize:15,color:'#0F416A',fontWeight:"400",textAlign:'center'}}>Open</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: "center",
    borderColor: "#1719C3",
    borderRadius: 50,
    borderWidth: 1,
    overflow: "hidden",
    width:70,
    height:40,
    backgroundColor:'#fff5ee',
    marginLeft:15,
   
  },
  buttonInButtonBar: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderColor: "#1719C3",
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  heartImg: {
    width: 25,
    height: 25,
  },
});

export default RecipeActionsBar;
