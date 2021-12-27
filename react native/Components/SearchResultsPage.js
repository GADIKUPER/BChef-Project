import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RecipeCard from "./RecipeCard";
import sql from '../SQL/sql'

const SearchResultsPage = ({ route }) => {
  const [filteredRecips, setFilteredRecips] = useState([]);
  const { recipe } = route.params
  const [Recipes, setRecipes] = useState([])

  const GetAllRecipes = async () => {

    console.log("recipe=>",recipe);

    let recipes = await sql.SearchRecipe(recipe);
    console.log(`recipes ==> `, recipes);
   
    setRecipes(recipes)
    setFilteredRecips(recipes)
  }

  // const route = useRoute();
  // const searchFilters = route.params;
  // const filterash = () => {
  //   const filtered = Recipes.find((currRecipe) => {
  //     //preparation search
  //     console.log("searchFilters.preparation=>", Recipes);
  //     if (recipe.preparation) {
  //       if (currRecipe.preparation !== Recipes.Preparation_Name) {
  //         return false;
  //       }
  //     }

  //     //ingredients search
  //     const isIncludesAllIngredients = Recipes.Ingredients.filter(
  //       (currIngredient) => {
  //         return currRecipe.ingredients.includes(currIngredient);
  //       }
  //     );
  //     if (!isIncludesAllIngredients) {
  //       return false;
  //     }

  //     //spices search
  //     const isIncludesAllSpices = Recipes.Spices.filter((currSpice) => {
  //       return currRecipe.spices.includes(currSpice);
  //     });
  //     if (!isIncludesAllSpices) {
  //       return false;
  //     }

  //     // return true;
  //   });
  //   console.log("filtered=>", filtered);
  //   setFilteredRecips(filtered)
  // }

  useEffect(async () => {
   await GetAllRecipes()
  }, [])


  // console.log("Recipes=>",Recipes);
  return (
    <ScrollView>
      <View style={styles.main}>
        <Text style={styles.pageTitle}>Search Results</Text>
        {filteredRecips.length === 0 && (
          <View style={styles.dialogBox}>
            <Text style={styles.dialogText}>
              Oops, it seems like you dont have any results
            </Text>
          </View>
        )}
        {filteredRecips.length !== 0 && (
          <View>
            {filteredRecips.map((currentRecipe) => (
              <RecipeCard recipe={currentRecipe} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 20,
  },
  pageTitle: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
  },
  dialogBox: {
    paddingVertical: 30,
    textAlign: "center",
  },
});

export default SearchResultsPage;
