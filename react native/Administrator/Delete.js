import React from "react";
import { StyleSheet, Text, TouchableOpacity, View,Image } from "react-native";
import TrashIcon from '../assets/Images/TrashIcon.png'
import Editicon from '../assets/Images/EditIcon.png'
const Delete= ({ optionValue, onPress, isActive }) => {
  //Create a delete button that 
  //will display in the table
  // of preparation bikes, ingredients, spices
  return (
    <TouchableOpacity style={styles.main}>
      <View style={styles.box}>
       <View>
       <TouchableOpacity  onPress={onPress} > 
         <Image source={TrashIcon} style={{width:20,height:20}}/>
         {isActive && <View style={styles.indicator}></View>}
         </TouchableOpacity>
       </View>
      </View>
    </TouchableOpacity>
  );
};

export default Delete;

const styles = StyleSheet.create({
  main: { 
    //marginBottom: 5, flex:1
  },
  box: {
    //flexDirection: "row",
    //alignItems: "center",
    
  },
  indicator: {
    width: "70%",
    height: "70%",
    borderRadius: 100,
    backgroundColor: "black",
  },
});
