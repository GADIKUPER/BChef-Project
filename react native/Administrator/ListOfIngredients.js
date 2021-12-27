import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import SearchPIS from "../Components/SearchPIS";
import Delete from "./Delete";
import Edit from "./Edit";
import sql from '../SQL/sql'

const ListOfIngredients = (props) => {

  const [Ingredients, setIngredients] = useState([])
  const [filteredIngredients, setfilteredIngredients] = useState([])
  const [Ingredienting, setIngredienting] = useState("")
  const [Ingredients_Code, setIngredients_Code] = useState(-1)
  const [Ingredients_Name, setIngredients_Name] = useState("")

  // Show all the Ingredients from data/server
  const GetTBIngredients = async () => {
    let tbIngredients = await sql.GetTBIngredients()
    setIngredients(tbIngredients)
    setfilteredIngredients(tbIngredients)

  }

  // Search Ingredients from table and 
  //it juck with the with the name entered and code of Ingredients
  const searchIngredient = (text, field) => {
    let filter = Ingredients.filter(ingredient => ingredient[field].indexOf(text) != -1)
    setfilteredIngredients(filter)
  }

  // Insert Ingredients to table
  const InsertIngredientsToTBIngredients = async () => {
    let insertIngredients = await sql.InsertIngredientsToTBIngredients(Ingredients_Name)

    GetTBIngredients()
  }

  // Update Ingredients from table table
  const UpdateIngredientsInTBIngredients = async () => {
    try {
      let updateIngredients = await sql.UpdateIngredientsInTBIngredients(Ingredients_Code, Ingredients_Name)

      GetTBIngredients()
    } catch (error) {
      console.log('err=>', error);

    }
  }

  // Delete Ingredients from table table
  const DeletIngredientsFromTBIngredients = async () => {
    let deleteIngredients = await sql.DeletIngredientsFromTBIngredients(Ingredients_Code)

    GetTBIngredients()
  }

  // finde Specific Ingredients from table
  const FindSpecific = () => {
    let filter = Ingredients.filter(ingredient => ingredient.Ingredients_Name.indexOf(Ingredients_Name) != -1)
    setIngredients_Code(filter.Ingredients_Code)
  }

  useEffect(() => {
    FindSpecific()
    GetTBIngredients()
  }, [])



  return (

    <View>
      <ScrollView>

        <View style={styles.main, { marginTop: 30, marginBottom: 40 }}>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Ingredient</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
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
                    {filteredIngredients.map((currentItem) => {
                      return (
                        <View key={currentItem.Ingredients_Code} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                          <Text style={{ width: "50%" }}>{currentItem.Ingredients_Name}</Text>

                          <Edit key={`e-${currentItem.Ingredients_Code}`}
                            isActive={filteredIngredients.includes(currentItem.Ingredients_Name)}
                            onPressHandler={() => {

                              setIngredients_Name(currentItem.Ingredients_Name)
                              setIngredients_Code(currentItem.Ingredients_Code)
                            }}>
                          </Edit>
                          <Delete
                            key={`d-${currentItem.Ingredients_Code}`}
                            optionValue={currentItem}
                            onPress={() => DeletIngredientsFromTBIngredients(setIngredients_Code(currentItem.Ingredients_Code))}
                            isActive={filteredIngredients.includes(currentItem.Ingredients_Code)}
                          >
                          </Delete>

                        </View>
                      );
                    })}
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
        </View>
        <View >
          <TextInput style={styles.inputStyle}
            onChangeText={(value) => setIngredients_Name(value)}
            placeholder="Add new Ingredient"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
          />
          <TouchableOpacity style={{
            borderWidth: 3,
            borderRadius: 30, backgroundColor: '#adff2f',
            borderColor: "grey", width: 60, marginTop: -25, marginLeft: 160
          }}
            onPress={InsertIngredientsToTBIngredients} >
            <Text style={{ textAlign: 'center' }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput style={styles.inputStyle}
            value={Ingredients_Name}
            onChangeText={(text) => setIngredients_Name(text)}
            placeholder="Edit Spice"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            underlineColorAndroid="#f000"
            blurOnSubmit={false} />
          <TouchableOpacity style={{
            borderWidth: 3,
            borderRadius: 30, backgroundColor: '#adff2f',
            borderColor: "grey", width: 60, marginTop: -25, marginLeft: 160
          }} >
            <Text style={{ textAlign: 'center' }} onPress={UpdateIngredientsInTBIngredients}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )

}

export default ListOfIngredients;

const styles = StyleSheet.create({
  preparationBox: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 5,
    maxHeight: 500,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    //maxWidth: "100%",
    width: "100%"
  },
  boxHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 90,
    paddingVertical: 10,



  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  optionsBox: {
    paddingHorizontal: 15,
  },
  inputStyle: {
    backgroundColor: "white",
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "blue",
    width: 150,

  },

  container: {
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 100,
    marginHorizontal: -15,
    borderWidth: 0.8,
    borderColor: "grey",
    marginBottom: -10,
    borderRadius: 25,
    height: 200
  },
})

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

