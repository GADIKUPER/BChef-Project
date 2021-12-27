import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import TrashIcon from '../assets/Images/TrashIcon.png'
import Editicon from '../assets/Images/EditIcon.png'
const Edit = ({onPressHandler, isActive,item }) => {
  //Create a change button that 
  //will display inside a table of 
  //preparation bikes, ingredients, spices
  return (
    <TouchableOpacity style={styles.main}>
      <View style={styles.box}>
        <View >
          <TouchableOpacity onPress={onPressHandler}>
            <Image source={Editicon} style={{ width: 20, height: 20 }} />

            {isActive && <View style={styles.indicator}></View>}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Edit;

const styles = StyleSheet.create({
  main: { 
    //marginBottom: -20 
  },
  box: {
    //flexDirection: "row",
   // alignItems: "center",

  },
  indicator: {
    width: "70%",
    height: "70%",
    borderRadius: 100,
    backgroundColor: "black",
  },
});
