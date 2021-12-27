import React, { useState, useEffect } from "react";
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
const ListOfPreparation = (props) => {

  const [Prepatations, setPrepatations] = useState([])
  const [filteredPrepatations, setfilteredPrepatations] = useState([])
  const [Prepatationing, setPrepatationing] = useState("")
  const [Preparation_Name, setPreparation_Name] = useState("")
  const [Preparation_Code, setPreparation_Code] = useState(0)

  // Show all the Prepatations from data/server
  const GetTBPreparation = async () => {
    let tbPreparation = await sql.GetTBPreparation()
    setPrepatations(tbPreparation)
    setfilteredPrepatations(tbPreparation)
  }

  // Search Prepatations from table and 
  //it juck with the with the name entered and code of Prepatations
  const searchPrepatation = (text, field) => {
    let filter = Prepatations.filter(prepatation => prepatation[field].indexOf(text) != -1)
    setfilteredPrepatations(filter)
  }

  // Insert Prepatations to table
  const InsertPreparationToTBPreparation = async () => {
    let insertPrepatation = await sql.InsertPreparationToTBPreparation(Preparation_Name)

    GetTBPreparation();
  }

  // Update Prepatations from table table
  const UpdatePreparationInTBPreparation = async () => {
    try {
      let updatePreparation = await sql.UpdatePreparationInTBPreparation(Preparation_Code, Preparation_Name)
      console.log(updatePreparation);
      GetTBPreparation()
    } catch (error) {
      console.log('err=>', error);
    }
  }

  // Delete Prepatations from table table
  const DeletPreparationFromTBPreparation = async () => {
    let deletePrepatation = await sql.DeletPreparationFromTBPreparation(Preparation_Code)

    GetTBPreparation()
  }

  // finde Specific Ingredients from table
  const FindSpecific = async () => {
    let filter = await Prepatations.filter(prepatation => prepatation.Preparation_Name.indexOf(Preparation_Name) != -1)
    setPreparation_Code(filter.Preparation_Code)
  }



  useEffect(() => {
    FindSpecific()
    GetTBPreparation()
  }, [Prepatationing])



  return (

    <View>

      <ScrollView>

        <View style={styles.main, { marginTop: 30, marginBottom: 40 }}>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Preparation</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                </ScrollView>
              </View>
              <SearchPIS
                value={Prepatationing}
                setList={searchPrepatation}
                name={"Preparation_Name"}
              />
              <SafeAreaView style={styles.container} >
                <ScrollView style={styles.scrollView}>
                  <View style={styles.optionsBox}>
                    {filteredPrepatations.map((currentItem) => {
                      return (
                        <View key={currentItem.Preparation_Code} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                          <Text style={{ width: "50%" }}>{currentItem.Preparation_Name}</Text>

                          <Edit key={`e-${currentItem.Preparation_Code}`}
                            isActive={filteredPrepatations.includes(currentItem.Preparation_Name)}
                            onPressHandler={() => {
                              setPreparation_Name(currentItem.Preparation_Name)
                              setPreparation_Code(currentItem.Preparation_Code)
                            }}>
                          </Edit>
                          <Delete
                            key={`d-${currentItem.Preparation_Code}`}
                            optionValue={currentItem.Preparation_Name}
                            onPress={() => DeletPreparationFromTBPreparation(setPreparation_Code(currentItem.Preparation_Code))}
                            isActive={filteredPrepatations.includes(currentItem.Preparation_Code)}
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
            onChangeText={(value) => setPreparation_Name(value)}
            placeholder="Add new Preparation"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
          />
          <TouchableOpacity style={{
            borderWidth: 3,
            borderRadius: 30, backgroundColor: '#adff2f',
            borderColor: "grey", width: 60, marginTop: -25, marginLeft: 160
          }}
            onPress={InsertPreparationToTBPreparation} >
            <Text style={{ textAlign: 'center' }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput style={styles.inputStyle}
            value={Preparation_Name}
            onChangeText={(text) => setPreparation_Name(text)}
            placeholder="Edit Preparation"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            underlineColorAndroid="#f000"
            blurOnSubmit={false} />
          <TouchableOpacity style={{
            borderWidth: 3,
            borderRadius: 30, backgroundColor: '#adff2f',
            borderColor: "grey", width: 60, marginTop: -25, marginLeft: 160
          }} >
            <Text style={{ textAlign: 'center' }} onPress={UpdatePreparationInTBPreparation}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )

}

export default ListOfPreparation;

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
    //paddingVertical: 70
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
    // flex: 1,
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

