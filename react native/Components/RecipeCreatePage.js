import React, { useEffect, useState, useContext } from "react";
import {
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Image,
  ActivityIndicator
} from "react-native";
import FormOption from "./FormOption";
import SearchPIS from "./SearchPIS";
import AppImageInput from "./AppImageInput";
import sql from '../SQL/sql'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BchefContext } from '../Components/BchefContext'

const RecipeCreatePage = ({ navigation }) => {

  const { user, setUser } = useContext(BchefContext)
  const [isReady, setIsReady] = useState(false);
  const [Loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState({
    UserID: "",
    RecipeName: "",
    preparation: "",
    ingredients: [],
    spices: [],
    Note: "",
    RecipePictureUri: null,
  });

  function CloseLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }

  /////////// PREPARETION ///////////
  const [Prepatations, setPrepatations] = useState([])// Array from table list of Prepatations

  const [filteredPrepatations, setfilteredPrepatations] = useState([])//Array from table list of Prepatations 
  //and use us to do filter to search
  // or Pick one of the 

  const [Prepatationing, setPrepatationing] = useState("")// the object have name to enter a searchBox 

  const [Preparation_Name, setPreparation_Name] = useState("")// the object have name and code this
  // give as the name of product on the screen
  const [Preparation_Code, setPreparation_Code] = useState(0)

  // Give all the Prepatations from table
  const GetTBPreparation = async () => {
    let tbPreparation = await sql.GetTBPreparation()
    setPrepatations(tbPreparation)
    setfilteredPrepatations(tbPreparation)
  }

  //Search Prepatations ferom table
  const searchPrepatation = (text, field) => {
    let filter = Prepatations.filter(prepatation => prepatation[field].indexOf(text) != -1)
    setfilteredPrepatations(filter)
  }

  // find the one of user want
  const FindSpecificPreparation = async () => {
    let filter = await Prepatations.filter(prepatation => prepatation.Preparation_Name.indexOf(Preparation_Name) != -1)
    setPreparation_Code(filter.Preparation_Code)
  }

  //pick form table to the recipe
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
  const [Ingredients, setIngredients] = useState([])// Array from table list of Ingredients

  const [filteredIngredients, setfilteredIngredients] = useState([])//Array from table list of Ingredients 
                                                                    //and use us to do filter to search
                                                                     // or Pick one of the 

  const [Ingredienting, setIngredienting] = useState("")// the object have name to enter a searchBox 

  const [Ingredients_Code, setIngredients_Code] = useState(0)// the object have name and code this
  // give as the name of product on the screen
  const [Ingredients_Name, setIngredients_Name] = useState("")

  // Give us table Ingredients
  const GetTBIngredients = async () => {
    let tbIngredients = await sql.GetTBIngredients()
    setIngredients(tbIngredients)
    setfilteredIngredients(tbIngredients)
  }

  //Search Ingredients from table
  const searchIngredient = (text, field) => {
    let filter = Ingredients.filter(ingredient => ingredient[field].indexOf(text) != -1)
    setfilteredIngredients(filter)
  }

  // find the one of user want
  const FindSpecificIngredient = async () => {
    let filter = await Ingredients.filter(ingredient => ingredient.Ingredients_Name.indexOf(Ingredients_Name) != -1)
    setIngredients_Code(filter.Ingredients_Code)
  }

  //pick form table to the recipe
  const pickIngredientsType = (type) => {
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

  //Remove Option form the recipe if the user dont want this pick
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
  const [Spices, setSpices] = useState([])// Array from table list of Prepatations

  const [filteredSpices, setfilteredSpices] = useState([{}])//Array from table list of Prepatations 
  //and use us to do filter to search
  // or Pick one of the 

  const [spicing, setSpicing] = useState("")// the object have name to enter a searchBox 

  const [Spices_Name, setSpices_Name] = useState("")// give as the name of product on the screen
  // the object have name and code this
  const [Spices_Code, setSpices_Code] = useState(0)

  //Give us all the table of Spices
  const GetTbSpices = async () => {
    let tbSpices = await sql.GetTbSpices()
    console.log(tbSpices);
    setSpices(tbSpices)
    setfilteredSpices(tbSpices)
  }

  //Search Spices from table
  const searchSpice = (text, field) => {
    let filter = Spices.filter(spice => spice[field].indexOf(text) != -1)
    setfilteredSpices(filter)
  }

  // find the one of user want
  const FindSpecificSpices = async () => {
    let filter = await Spices.filter(spice => spice.Spices_Name.indexOf(Spices_Name) != -1)
    setSpices_Code(filter.Spices_Code)
  }

  //pick form table to the recipe
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

  //Remove Option form the recipe if the user dont want this pick
  const removeSpicesType = (type) => {
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

  ////////// IMAGE /////////////

  useEffect(() => {
    const func = async () => {
      await GetTBPreparation();
      await GetTBIngredients();
      await GetTbSpices();
      let InsertRecipe = await AsyncStorage.getItem('user')
      InsertRecipe = JSON.parse(InsertRecipe)
      setUser(InsertRecipe)
      setRecipe({ ...recipe, UserID: InsertRecipe.ID })
      CloseLoading();
      setIsReady(true);
    };
    func();
  }, [])

  /////////END IMAGE///////////

  //Puts into the data all the things that need a recipe upload
  const InsertRecipe = async () => {
    let RecipeTB = await sql.InsertRecipe(recipe, Spices, Ingredients, Prepatations)
    console.log("RecipeTB=>", recipe);
    if (RecipeTB != undefined) {
      navigation.replace("HomePage")
      console.log("its seccses");
    }
  }

  return (
    isReady ?
      <ScrollView>
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
                <ScrollView >
                  <View style={styles.optionsBox}>
                    {
                      filteredPrepatations.length > 0 ? filteredPrepatations.map((currentItem) => {
                        return (
                          <View>
                            <FormOption
                              key={`p-${currentItem.Preparation_Code}`}
                              optionValue={currentItem.Preparation_Name}
                              onPress={() => pickPreparationType(currentItem.Preparation_Name)}
                              isActive={recipe.preparation.includes(currentItem)}
                            />
                          </View>
                        )
                      }) : null}
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
                <ScrollView >
                  <View style={styles.optionsBox}>
                    {
                      filteredIngredients.length > 0 ? filteredIngredients.map((currentItem) => {
                        return (
                          <View>
                            <FormOption
                              key={`i-${currentItem.Ingredients_Code}`}
                              optionValue={currentItem.Ingredients_Name}
                              onPress={() => pickIngredientsType(currentItem.Ingredients_Name)}
                              isActive={recipe.ingredients.includes(currentItem)}
                            />
                          </View>
                        );
                      }) : null}
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
                <ScrollView >
                  <View style={styles.optionsBox}>
                    {
                      filteredSpices.length > 0 ? filteredSpices.map((currentItem) => {
                        return (
                          <View >
                            <FormOption
                              key={`s-${currentItem.Spices_Code}`}
                              optionValue={currentItem.Spices_Name}
                              onPress={() => pickSpicesType(currentItem.Spices_Name)}
                              isActive={recipe.spices.includes(currentItem)}
                            />
                          </View>
                        );
                      }) : null}
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
          <SecondPartBox recipe={recipe} setRecipe={setRecipe} />
          <Button title="AddRecipe" onPress={InsertRecipe} />
        </View>
      </ScrollView>
      :
      <ActivityIndicator size="large" color="#00ff00" />
  );
};

export default RecipeCreatePage;

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
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
});

//When a spice or product is selected, 
//it will be displayed to fill in each selected table 
//in which the product of the selected item will be displayed and next to it 
//will be displayed an X that can be canceled
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

//Displays the second part of the page where everything
// selected by the user will be displayed, as well
//as a text box for the recipe name, a template for explaining the preparation of the food
function SecondPartBox({ recipe, setRecipe }) {
  return (
    <View style={secondPartBoxStyles.main}>
      <View style={secondPartBoxStyles.first}>
        <View style={secondPartBoxStyles.head}>
          <Text style={secondPartBoxStyles.headText}>
            Recipe preparation, ingredients and spices
          </Text>
        </View>
        <View style={secondPartBoxStyles.firstBoxContext}>
          <View style={secondPartBoxStyles.recipePartSection}>
            <Text style={secondPartBoxStyles.miniTitle}>Preparation:</Text>
            <Text>{recipe.preparation}</Text>
          </View>
          <View style={secondPartBoxStyles.recipePartSection}>
            <Text style={secondPartBoxStyles.miniTitle}>Ingredients:</Text>
            {recipe.ingredients.map((curr) => (
              <Text key={curr}>{curr}</Text>
            ))}
          </View>
          <View style={secondPartBoxStyles.recipePartSection}>
            <Text style={secondPartBoxStyles.miniTitle}>Spices:</Text>
            {recipe.spices.map((curr) => (
              <Text key={curr}>{curr}</Text>
            ))}
          </View>
        </View>
      </View>
      <View style={secondPartBoxStyles.second}>
        <View style={secondPartBoxStyles.head}>
          <Text style={secondPartBoxStyles.headText}>
            Details of how to preparation
          </Text>
        </View>
        <View style={secondPartBoxStyles.secondContent}>
          <Text style={secondPartBoxStyles.headText}>
            Name of the recipe
          </Text>
          <TextInput
            multiline
            value={recipe.RecipeName}
            onChangeText={(text) => setRecipe({ ...recipe, RecipeName: text })}
            style={secondPartBoxStyles.detailsInput}
          />

        </View>
        <View style={secondPartBoxStyles.secondContent}>
          <TextInput
            multiline
            value={recipe.Note}
            onChangeText={(text) => setRecipe({ ...recipe, Note: text })}
            style={secondPartBoxStyles.detailsInput}
          />
        </View>
        <AppImageInput
          image={recipe.RecipePictureUri}
          setImage={(newImage) => setRecipe({ ...recipe, RecipePictureUri: newImage })}
        />
      </View>
    </View>
  );

}

const secondPartBoxStyles = StyleSheet.create({
  main: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 30,
  },

  head: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headText: {
    fontWeight: "600",
    fontSize: 18,
  },
  miniTitle: {
    fontWeight: "700",
  },
  firstBoxContext: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  secondContent: {
  },
  detailsInput: {
    height: 100,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 15,
  },
});

