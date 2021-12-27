import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FormOption = ({ optionValue, onPress, isActive }) => {

  // Pick from RecipeCrwatePage from table Preparetion, Ingrediants, Spices
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.box}>
        <View style={styles.circle}>
          {isActive && <View style={styles.indicator}></View>}
        </View>
        <Text>{optionValue}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormOption;

const styles = StyleSheet.create({
  main: { marginBottom: 5 },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
  },
  indicator: {
    width: "70%",
    height: "70%",
    borderRadius: 100,
    backgroundColor: "black",
  },
});
