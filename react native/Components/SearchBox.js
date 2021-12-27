import React, { useEffect, useState } from "react";
import { TextInput, View, Image } from "react-native";
import Search from "../assets/Images/Search.png";

//A function that gets a name and a filter for the name.
//In order to find users by their first name.
// We will represent all users with the same name
const SearchBox = ({ User, setFiltereUser }) => {

  const [currSearch, setCurrSearch] = useState("");

  useEffect(() => {
    const newFilteredUser = User.filter((currRecipe) => {
      const isSearchIncludingCurrUsername =
        currRecipe.FirstName.includes(currSearch);
      if (!isSearchIncludingCurrUsername) {
        return false;
      }
      return true;
    });
    setFiltereUser(newFilteredUser);
  }, [currSearch]);

  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 2,
        marginTop: 30,
        borderRadius: 50,
        width: 250,
        height: 40,
        marginLeft: 15,
        marginBottom: 30,
        alignSelf: "center",
      }}
    >
      <Image
        source={Search}
        style={{
          width: 20,
          height: 40,
          resizeMode: "contain",
          margin: 30,
          marginTop: 0,
          marginLeft: 10,
        }}
      />
      <TextInput
        style={{ marginTop: -65, marginLeft: 50, fontSize: 20 }}
        value={currSearch}
        onChangeText={(text) => setCurrSearch(text)}
        placeholder="Search..."
      />
      {/* <Text>{JSON.stringify(filteredUsers)}</Text> */}
    </View>
  );
};

export default SearchBox;
