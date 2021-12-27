import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import searchImg from "../assets/Images/Search.png";

//Search for a product within a table by take that 
//it gets a name gets a list and what to return for example a name of the product
const SearchPIS = ({ value, setList, name }) => {

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setList(text, name)}
      />
      <Image source={searchImg} style={styles.image} />
    </View>
  );
};

export default SearchPIS;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: "5%",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    marginBottom: 10,
    width: "90%",
    // height: 25,
  },
  input: {
    width: "100%",
    color: 'black'
  },
  image: {
    width: 20,
    height: 20,
  },
});
