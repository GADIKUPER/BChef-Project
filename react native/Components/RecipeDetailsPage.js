import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//Page showing the recipe in its entirety
const RecipeDetailsPage = ({ route }) => {

  const { recipe } = route.params
  useEffect(() => {
    console.log('recipe details==>', recipe);
  }, [])

  return (

    <ScrollView>
      <View style={styles.main}>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: -30 }}>{recipe.RecipeName}</Text>
          <Text style={{ fontSize: 25, fontWeight: '500', textAlign: 'center', marginTop: -30 }}>______________</Text>
        </View>
        <ScrollView horizontal pagingEnabled style={styles.imagesContainer}>
          <Image

            style={styles.recipeImage}
            source={{ uri: recipe.RecipePictureUri }}
          />
        </ScrollView>
        <View style={styles.descriptionContainer}>
          <Image style={{ marginTop: 50, marginLeft: 50, width: 50, height: 50, marginLeft: 10, marginTop: 2 }} source={recipe.image} />
        </View>
        <View style={styles.content}>

          <View style={styles.columns}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Preparation:</Text>
              <Text style={{ fontSize: 25, fontWeight: '500', textAlign: 'center', marginTop: -30 }}>__________</Text>
              <Text style={styles.columnItem}>{recipe.Preparation_Name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Ingredients:</Text>
              <Text style={{ fontSize: 25, fontWeight: '500', textAlign: 'center', marginTop: -30 }}>__________</Text>
              {recipe.Ingredients.map((currIngredient) => (
                <Text key={currIngredient} style={styles.columnItem}>
                  {currIngredient.Ingredients_Name}
                </Text>
              ))}
            </View>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Spices:</Text>
              <Text style={{ fontSize: 25, fontWeight: '500', textAlign: 'center', marginTop: -30 }}>______</Text>
              {recipe.Spices.map((currSpice) => (
                <Text key={currSpice} style={styles.columnItem}>
                  {currSpice.Spices_Name}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.descriptionContainer}>

            <Text style={{ marginTop: 30, fontSize: 25,fontWeight:'bold' }}>Cooking explanation:</Text>
            <Text style={{ fontSize: 25, fontWeight: '500', textAlign: 'center', marginTop: -30, marginLeft: "-22%" }}>_____________________</Text>
            <SafeAreaView style={styles.container} >
              <ScrollView style={styles.scrollView}>
            <Text style={{marginLeft:"2%",marginTop:"2%",fontSize:17,fontWeight:'600'}}>{recipe.Note}</Text>
            </ScrollView>
            </SafeAreaView>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
  },
  imagesContainer: {
    marginBottom: 35,
    marginTop: -75
  },
  recipeImage: {
    width: Dimensions.get("screen").width,
    height: 300,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
  },
  content: {
    marginTop: -150
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginLeft: 20,
    marginRight: 20
  },
  columnTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20
  },
  descriptionContainer: {
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 25
  },
  detailsInput: {
    height: 100,
    marginHorizontal: -15,
    borderWidth: 0.8,
    borderColor: "grey",
    marginBottom: -20,
    borderRadius: 25,
    height: 200
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 100,
    marginHorizontal: -15,
    borderWidth: 0.8,
    borderColor: "grey",
    marginBottom: -40,
    borderRadius: 25,
    height: 200
  },
  columnItem:{
    fontWeight:'400',
    fontSize:17
  }
});

export default RecipeDetailsPage;
