import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import FormOption from "./FormOption";
import SearchPIS from "./SearchPIS";
import { useNavigation } from "@react-navigation/core";
import sql from '../SQL/sql'
import Navbar from "../Navbar/Navbar";

const SearchRecipePage = (props) => {

  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [recipe, setRecipe] = useState({
    preparation: "",
    ingredients: [],
    spices: [],
  });

  const [isReady, setIsReady] = useState(false);
  const [Loading, setLoading] = useState(true)

  function CloseLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }

  //There are the same explanations
  // similar to the same steps how to prepare, ingredients, spices
  //On the page of "RecipeCreatePage"

  /////////// PREPARETION ///////////
  const [Prepatations, setPrepatations] = useState([])
  const [filteredPrepatations, setfilteredPrepatations] = useState([])
  const [Prepatationing, setPrepatationing] = useState("")
  const [Preparation_Name, setPreparation_Name] = useState("")
  const [Preparation_Code, setPreparation_Code] = useState(0)

  const GetTBPreparation = async () => {
    let tbPreparation = await sql.GetTBPreparation()
    console.log("tbPreparation=>", tbPreparation);
    setPrepatations(tbPreparation)
    setfilteredPrepatations(tbPreparation)
  }

  const searchPrepatation = (text, field) => {
    let filter = Prepatations.filter(prepatation => prepatation[field].indexOf(text) != -1)
    setfilteredPrepatations(filter)
  }

  const FindSpecificPreparation = async () => {
    let filter = await Prepatations.filter(prepatation => prepatation.Preparation_Name.indexOf(Preparation_Name) != -1)
    setPreparation_Code(filter.Preparation_Code)
  }

  const pickPreparationType = (type) => {
    setRecipe({
      ...recipe,
      preparation: type,
    });
  };

  useEffect(() => {
    if (Prepatationing != '') {
      FindSpecificPreparation()
      GetTBPreparation()

    }
  }, [Prepatationing])
  /////////// END PREPARETION ///////

  /////////// INGRADIENTS ///////////
  const [Ingredients, setIngredients] = useState([])
  const [filteredIngredients, setfilteredIngredients] = useState([])
  const [Ingredienting, setIngredienting] = useState("")
  const [Ingredients_Code, setIngredients_Code] = useState(0)
  const [Ingredients_Name, setIngredients_Name] = useState("")

  const GetTBIngredients = async () => {
    let tbIngredients = await sql.GetTBIngredients()
    setIngredients(tbIngredients)
    setfilteredIngredients(tbIngredients)
  }

  const searchIngredient = (text, field) => {
    let filter = Ingredients.filter(ingredient => ingredient[field].indexOf(text) != -1)
    setfilteredIngredients(filter)
  }

  const FindSpecificIngredient = async () => {
    let filter = await Ingredients.filter(ingredient => ingredient.Ingredients_Name.indexOf(Ingredients_Name) != -1)
    setIngredients_Code(filter.Ingredients_Code)
  }

  const pickIngredientsType = (type) => {
    console.log(type);
    if (recipe.ingredients.includes(type)) {

      return;
    }
    let ingredient = filteredIngredients.filter(item => item.Ingredients_Name == type)
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, type],
    });
  };
  useEffect(() => {
    if (Ingredienting != '') {
      FindSpecificIngredient()
      GetTBIngredients()
    }
  }, [Ingredienting])

  const removeIngredientsType = (type) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(
        (currentIngredient) => type !== currentIngredient
      ),
    });
  };

  ///////// END INGRADIENTS /////////

  ///////// SPICES /////////////////
  const [Spices, setSpices] = useState([])
  const [filteredSpices, setfilteredSpices] = useState([{}])
  const [spicing, setSpicing] = useState("")
  const [Spices_Name, setSpices_Name] = useState("")
  const [Spices_Code, setSpices_Code] = useState(0)

  const GetTbSpices = async () => {
    let tbSpices = await sql.GetTbSpices()
    console.log(tbSpices);
    setSpices(tbSpices)
    setfilteredSpices(tbSpices)

  }

  const searchSpice = (text, field) => {
    let filter = Spices.filter(spice => spice[field].indexOf(text) != -1)
    setfilteredSpices(filter)
  }

  const FindSpecificSpices = async () => {
    let filter = await Spices.filter(spice => spice.Spices_Name.indexOf(Spices_Name) != -1)
    setSpices_Code(filter.Spices_Code)
  }

  const pickSpicesType = (type) => {
    if (recipe.spices.includes(type)) {
      console.log(recipe.spices);
      return;
    }
    let spice = filteredSpices.filter(item => item.Spices_Name == type)
    console.log(spice);
    setRecipe({
      ...recipe,
      spices: [...recipe.spices, type],
    });
  }

  const removeSpicesType = (type) => {
    console.log(type);
    setRecipe({
      ...recipe,
      spices: recipe.spices.filter((currentSpice) => type !== currentSpice),
    });
  };

  useEffect(() => {
    if (spicing != '') {
      FindSpecificSpices()
      GetTbSpices()
    }
  }, [spicing])

  //////// END SPICES //////////

  //Looking for a recipe according to 3 steps:
  //Compatible preparation method to wipe one compatible spice and one compatible composition
  const searchRecipe = () => {
    setErrorMessage(null);
    console.log("find recipe", recipe);
    //check if have a preparation
    if (!recipe.preparation) {
      setErrorMessage("You must choose a preparation type!");
      return;
    }

    navigation.navigate("SearchResultsPage", { recipe: recipe });

  };

  useEffect(() => {
    const func = async () => {
      await GetTBPreparation();
      await GetTBIngredients();
      await GetTbSpices();
      CloseLoading();
      setIsReady(true);
    };
    func();
  }, [])

  return (
    isReady ?
      <ScrollView>
        <Navbar/>
        <View style={styles.main}>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Preparation</Text>
              </View>
              <SearchPIS
                value={Prepatationing}
                setList={searchPrepatation}
                name={"Preparation_Name"}
              />
              <ScrollView>
                <View style={styles.optionsBox}>
                  {filteredPrepatations.map((currentItem) => {
                    return (
                      <FormOption
                        key={currentItem}
                        optionValue={currentItem.Preparation_Name}
                        onPress={() => pickPreparationType(currentItem.Preparation_Name)}
                        isActive={recipe.preparation.includes(currentItem)}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <View style={styles.mainImageContainer}>
              <Image
                style={styles.mainImage}
                source={{
                  uri: "https://previews.123rf.com/images/last19/last191910/last19191000074/131892750-healthy-food-herbs-spices-for-use-as-cooking-ingredients-on-a-wooden-background-with-fresh-organic-v.jpg",
                }}
              />
            </View>
          </View>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Ingredients</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {recipe.ingredients.map((currentIngredient) => (
                    <ChosenOption
                      optionValue={currentIngredient}
                      onPressX={() => removeIngredientsType(currentIngredient)}
                    />
                  ))}
                </ScrollView>
              </View>
              <SearchPIS
                value={Ingredienting}
                setList={searchIngredient}
                name={"Ingredients_Name"}
              />
              <ScrollView>
                <View style={styles.optionsBox}>
                  {filteredIngredients.map((currentItem) => {
                    return (
                      <View>
                        <FormOption
                          key={currentItem}
                          optionValue={currentItem.Ingredients_Name}
                          onPress={() => pickIngredientsType(currentItem.Ingredients_Name)}
                          isActive={recipe.ingredients.includes(currentItem)}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <View style={styles.mainImageContainer}>
              <Image
                style={styles.mainImage}
                source={{
                  uri: "https://previews.123rf.com/images/last19/last191910/last19191000074/131892750-healthy-food-herbs-spices-for-use-as-cooking-ingredients-on-a-wooden-background-with-fresh-organic-v.jpg",
                }}
              />
            </View>
          </View>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Spices</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {recipe.spices.map((currentSpice) => (
                    <ChosenOption
                      optionValue={currentSpice}
                      onPressX={() => removeSpicesType(currentSpice)}
                    />
                  ))}
                </ScrollView>
              </View>
              <SearchPIS
                value={spicing}
                setList={searchSpice}
                name={"Spices_Name"}
              />
              <ScrollView>
                <View style={styles.optionsBox}>
                  {filteredSpices.map((currentItem) => {
                    return (
                      <View >
                        <FormOption
                          key={currentItem}
                          optionValue={currentItem.Spices_Name}
                          onPress={() => pickSpicesType(currentItem.Spices_Name)}
                          isActive={recipe.spices.includes(currentItem)}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <View style={styles.mainImageContainer}>
              <Image
                style={styles.mainImage}
                source={{
                  uri: "https://mawmedia.com/wp-content/uploads/2014/06/ingredients.jpg",
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <Button title="Search Recipe" onPress={searchRecipe} />
          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
      </ScrollView>
      :
      <ActivityIndicator size="large" color="#00ff00" />
  );
};

export default SearchRecipePage;

const styles = StyleSheet.create({
  main: { flex: 1, paddingHorizontal: 15, paddingVertical: 20 },
  mainImageContainer: {
    width: "50%",
    height: "100%",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  preparationBox: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 15,
    maxHeight: 200,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    maxWidth: "50%",
  },
  boxHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  optionsBox: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  inputStyle: {
    backgroundColor: "white",
    flex: 1,
    color: "black",
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "blue",
    width: 150,
    height: 30
  },
});

function ChosenOption({ optionValue, onPressX }) {
  return (
    <View style={chosenOptionStyles.main}>
      <TouchableOpacity style={chosenOptionStyles.button} onPress={onPressX}>
        <Text>X</Text>
      </TouchableOpacity>
      <Text>{optionValue}</Text>
    </View>
  );
}

const chosenOptionStyles = StyleSheet.create({
  main: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 7,
    paddingHorizontal: 5,
    marginRight: 2,
  },
  button: {
    marginRight: 10,
  },
});
