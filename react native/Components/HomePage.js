import "react-native-gesture-handler";
import React, { useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import SearchBox from "./SearchBox";
import RecipeCard from "./RecipeCard";
import sql from '../SQL/sql'
import Navbar from "../Navbar/Navbar";

const HomePage = (props) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isReady, setIsReady] = useState(false);
  const [Loading, setLoading] = useState(true)
  const [filteredRecips, setFilteredRecips] = useState([]);
  const [Recipes, setRecipes] = useState([])

  //Do Loading to page before it`s Uplaod
  function CloseLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }

  // Refresh the Page when have new Uplaod of Recipe and refersh the page if the user want 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAllRecipes().then(() => setRefreshing(false));
  }, []);

  //Show all the recipes from data
  const GetAllRecipes = async () => {
    let recipes = await sql.GetAllRecipes()
    setRecipes(recipes)
    setFilteredRecips(recipes)
  }

  useEffect(() => {
    const func = async () => {
      await GetAllRecipes()

      CloseLoading();
      setIsReady(true);
      onRefresh()
    }
    func()
  }, [])

  return (
    isReady ?
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Navbar />
          <View style={{ flex: 1, paddingHorizontal: 15, marginBottom: 10 }} >
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
                <Image source={Massege} style={{ width: 35, height: 35, marginLeft: 300 }} />
              </TouchableOpacity> */}
              <View style={{ marginLeft: -90, marginTop: -20 }}>
                <SearchBox
                  setFiltereUser={setFilteredRecips}
                  User={Recipes}
                />
              </View>
              <View>
                {filteredRecips && filteredRecips.map((currentRecipe) => (
                  <RecipeCard recipe={currentRecipe} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView >
      </SafeAreaView>
      :
      <ActivityIndicator size="large" color="#00ff00" />
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F6F2CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});