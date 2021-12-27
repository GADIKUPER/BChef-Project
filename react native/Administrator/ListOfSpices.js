import React, { useState, createRef, useEffect } from "react";
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

const ListOfSpices = (props) => {

  const [spices, setSpices] = useState([])
  const [filteredSpices, setfilteredSpices] = useState([])
  const [spicing, setSpicing] = useState("")
  const [Spices_Name, setSpices_Name] = useState("")
  const [Spices_Code, setSpices_Code] = useState(0)

  // Show all the Spices from data/server
  const GetTbSpices = async () => {
    let tbSpices = await sql.GetTbSpices()
    setSpices(tbSpices)
    setfilteredSpices(tbSpices)
  }

  // Search Spices from table and 
  //it juck with the with the name entered and code of Spices
  const searchSpice = (text, field) => {
    let filter = spices.filter(spice => spice[field].indexOf(text) != -1)
    setfilteredSpices(filter)
  }

  // Insert Spices to table
  const InsertSpicesToTBSpices = async () => {
    let insertSpice = await sql.InsertSpicesToTBSpices(Spices_Name)
    GetTbSpices()

  }

  // Update Spices from table table
  const UpdateSpicesInTBSpicesn = async () => {
    try {
      let UpdateSpice = await sql.UpdateSpicesInTBSpicesn(Spices_Code, Spices_Name)
      GetTbSpices()
    } catch (error) {
      console.log('err=>', error);
    }
  }

  // Delete Spices from table table
  const DeletSpicesFromTBSpices = async () => {
    let deleteSpice = await sql.DeletSpicesFromTBSpices(Spices_Code)
    console.log(deleteSpice);
    GetTbSpices()

  }

  // finde Specific S from table
  const FindSpecific = async () => {
    let filter = await spices.filter(spice => spice.Spices_Name.indexOf(Spices_Name) != -1)
    setSpices_Code(filter.Spices_Code)
  }

  useEffect(() => {
    FindSpecific()
    GetTbSpices()
  }, [spicing])

  return (
    <View>

      <ScrollView>

        <View style={styles.main, { marginTop: 30, marginBottom: 40 }}>
          <View style={styles.preparationBox}>
            <View style={styles.content}>
              <View style={styles.boxHead}>
                <Text style={styles.boxTitle}>Spices</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
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
                    {filteredSpices.map((currentItem) => {
                      return (
                        <View key={currentItem.Spices_Code} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                          <Text style={{ width: "50%" }}>{currentItem.Spices_Name}</Text>
                          <Edit key={`e-${currentItem.Spices_Code}`}
                            isActive={filteredSpices.includes(currentItem.Spices_Name)}
                            item={currentItem}
                            onPressHandler={() => {
                              console.log(`currentItem`, currentItem)
                              setSpices_Name(currentItem.Spices_Name)
                              setSpices_Code(currentItem.Spices_Code)
                            }}>
                          </Edit>
                          <Delete
                            key={`d-${currentItem.Spices_Code}`}
                            optionValue={currentItem.Spices_Name}
                            onPress={() => DeletSpicesFromTBSpices(setSpices_Code(currentItem.Spices_Code))}
                            isActive={filteredSpices.includes(currentItem.Spices_Code)}
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
            onChangeText={(value) => setSpices_Name(value)}
            placeholder="Add new Spice"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
          />
          <TouchableOpacity style={{
            borderWidth: 3,
            borderRadius: 30, backgroundColor: '#adff2f',
            borderColor: "grey", width: 60, marginTop: -25, marginLeft: 160
          }}
            onPress={InsertSpicesToTBSpices} >
            <Text style={{ textAlign: 'center' }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput style={styles.inputStyle}
            value={Spices_Name}
            onChangeText={(text) => setSpices_Name(text)}
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
            <Text style={{ textAlign: 'center' }} onPress={UpdateSpicesInTBSpicesn}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  )

}

export default ListOfSpices;

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

