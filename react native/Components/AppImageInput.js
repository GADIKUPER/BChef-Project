import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import sql from '../SQL/sql'

export default function AppImageInput({ image, setImage }) {

  const [path, setPath] = useState()

  //Get the picture from a recipe upload page

  //Select an image from the cell phone 
  //gallery and make the selection of the image converted to Base: 64
  //And to keep in a bag named at the end of the
  //picture is a name that is named name1 and parent a random number
  const pickImage = async () => {
    let name1 = Math.floor(Math.random() * 100) + 1;
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
      });
      if (!result.cancelled) {
        if (Platform.OS !== 'web') {
          var content = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });
          result.uri = content
          let obj = { name: name1, folder: "ImageRecipe", base64: content }
          let image2 = await sql.UploadImageRecipe(obj)
          let imagePath = image2
          setImage(imagePath);
          setPath(imagePath)
          // console.log("imagePath=>",imagePath);
          // console.log("image.path=>",image.path);
          // console.log("image=>",image);
        }
      }
    } catch (e) {
      console.error(e);
    }
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
