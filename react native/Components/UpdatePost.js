import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Image,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from "react-native";
import preparationTypes from "../data/preperationTypes";
import ingredientsTypes from "../data/ingredientsTypes";
import FormOption from "./FormOption";
import SearchBox from "./SearchBox";
import spicesTypes from "../data/spicesTypes";
import SearchPIS from "./SearchPIS";
import AppImageInput from "./AppImageInput";
import sql from '../SQL/sql'
import { LoadEarlier } from "react-native-gifted-chat";
import Picture from "./Picture";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePost = ({ route }) => {
  const { RecipeId } = route.params
  const [isReady, setIsReady] = useState(false);
  console.log("RecipeId===>", RecipeId);
  const [recipes, setRecipe] = useState({
    Recipe_Id: RecipeId,
    UserID: 0,
    RecipeName: "",
    preparation: "",
    ingredients: [],
    spices: [],
    Pics: [],
    Note: "",
    UserPictureUri: "",
  });

  const [Loading, setLoading] = useState(true)
  const [userID, setuserID] = useState(0)

  function CloseLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }


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
    //console.log("recipe=>", recipe);
  }

  const searchPrepatation = (text, field) => {
    let filter = Prepatations.filter(prepatation => prepatation[field].indexOf(text) != -1)
    setfilteredPrepatations(filter)
  }

  const FindSpecificPreparation = async () => {
    let filter = await Prepatations.filter(prepatation => prepatation.Preparation_Name.indexOf(Preparation_Name) != -1)
    setPreparation_Code(filter.Preparation_Code)
  }

  // אחראי על בחירת אופן ההכנה
  const pickPreparationType = (type) => {
    setRecipe({
      ...recipes,
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

  // אחראי על בחירת המצרכים + שיהיה ניתן לבחור מוצר מסויים רק פעם אחת
  const pickIngredientsType = (type) => {
    console.log(type);
    //if the array already includes this type - dont add this type again

    // console.log("recipes.ingredients=>", recipes.ingredients);
    if (Ingredients.includes(type)) {
      return;
    }
    let ingredient = filteredIngredients.filter(item => item.Ingredients_Name == type)
    setRecipe({
      ...recipes,
      ingredients: [...recipes.ingredients, type],
    });
  };
  useEffect(() => {
    if (Ingredienting != '') {
      FindSpecificIngredient()
      GetTBIngredients()


    }
  }, [Ingredienting])

  // אחראי על הורדת מוצר שנבחר
  const removeIngredientsType = (type) => {
    setRecipe({
      ...recipes,
      ingredients: recipes.ingredients.filter(
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
    // CloseLoading();

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
    if (Spices.includes(type)) {
      // console.log(recipes.spices);
      return;
    }
    let spice = filteredSpices.filter(item => item.Spices_Name == type)
    console.log(spice);
    setRecipe({
      ...recipes,
      spices: [...recipes.spices, type],
    });
  }

  // // אחראי על הורדת תבלין שנבחר
  const removeSpicesType = (type) => {
    console.log(type);
    setRecipe({
      ...recipes,
      spices: recipes.spices.filter((currentSpice) => type !== currentSpice),
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

  const UplaodImage = () => {
    Alert.alert(
      "Choose an image from the",
      "gallery or smile for the camera",
      [
        {
          text: "Camera",
          onPress: () => navigation.navigate('Picture')
        },
        {

          text: "Gallery",
          onPress: () => pickImage()
        },
        {
          text: "Cencel", onPress: () => console.log("Cencel Pressed"),
          style: 'cancel'
        }
      ]
    )
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const func = async () => {
      await GetTBPreparation();
      await GetTBIngredients();
      await GetTbSpices();

      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
      let currentRecipe = await sql.GetRecipeById(recipes.Recipe_Id)
      setRecipe(currentRecipe);

      console.log("recipes=>", recipes);

      CloseLoading();
      setIsReady(true);
    };
    func();
  }, [])

  // useEffect(() => {
  //   UpdateIngredients()
  // }, [recipe])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }

  /////////END IMAGE///////////

  const UpdateTBUserRecipes = async () => {

    let RecipeTB = await sql.UpdateTBUserRecipes(recipes, Spices, Ingredients, Prepatations)
    let Update = await sql.GetRecipeById(RecipeId)

    console.log("RecipeTB=>", recipes);
    console.log("recipes.Recipe_Id=>", recipes.Recipe_Id);
    if (RecipeTB != undefined) {
      // props.navigation.navigate("HomePage")
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
                 <SafeAreaView style={styles.container} >
              <ScrollView style={styles.scrollView}>
                <View style={styles.optionsBox}>
                  {
                    filteredPrepatations.length > 0 ? filteredPrepatations.map((currentItem) => {
                      return (
                        <View>
                          <FormOption
                            key={`p-${currentItem.Preparation_Code}`}
                            optionValue={currentItem.Preparation_Name}
                            onPress={() => pickPreparationType(currentItem.Preparation_Name)}
                            isActive={Prepatations.includes(currentItem)}
                          />
                        </View>
                      )
                    }) : null}
                </View>
              </ScrollView>
              </SafeAreaView>
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
                  {Ingredients.map((currentIngredient) => (
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
                <SafeAreaView style={styles.container} >
              <ScrollView style={styles.scrollView}>
                <View style={styles.optionsBox}>
                  {
                    filteredIngredients.length > 0 ? filteredIngredients.map((currentItem) => {
                      return (
                        <View>
                          <FormOption
                            key={`i-${currentItem.Ingredients_Code}`}
                            optionValue={currentItem.Ingredients_Name}
                            onPress={() => pickIngredientsType(currentItem.Ingredients_Name)}
                            isActive={Ingredients.includes(currentItem)}
                          />
                        </View>
                      );
                    }) : null}
                </View>
              </ScrollView>
              </SafeAreaView>
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
                  {recipes.spices.map((currentSpice) => (
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
               <SafeAreaView style={styles.container} >
              <ScrollView style={styles.scrollView}>
                <View style={styles.optionsBox}>
                  {
                    filteredSpices.length > 0 ? filteredSpices.map((currentItem) => {
                      return (
                        <View >
                          <FormOption
                            key={`s-${currentItem.Spices_Code}`}
                            optionValue={currentItem.Spices_Name}
                            onPress={() => pickSpicesType(currentItem.Spices_Name)}
                            isActive={recipes.spices.includes(currentItem)}
                          />
                        </View>
                      );
                    }) : null}
                </View>

              </ScrollView>
              </SafeAreaView>
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
          {/* <Button title="AddRecipe" onPress={InsertRecipe} /> */}
        </View>

      </ScrollView>
      :
      <ActivityIndicator size="large" color="#00ff00" />
  );

};

export default UpdatePost;

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
    marginHorizontal: 5,
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
          setImage={(newImage) => setRecipe({ ...recipe, RecipePictureUri:newImage})}
        />
      </View>
      {/* <Text>{JSON.stringify(recipe)}</Text> */}
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
  first: {
    // borderBottomColor: "grey",
    // borderBottomWidth: 2,
  },
  head: {
    // borderBottomColor: "grey",
    // borderBottomWidth: 2,
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
    // borderWidth: 2,
    // borderColor: "grey",
  },
  detailsInput: {
    height: 100,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 15,
  },
});

