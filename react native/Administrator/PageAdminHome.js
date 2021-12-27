import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import Massege from '../assets/Images/Massege.png'
import Navbar from "../Navbar/Navbar";

const PageAdminHome = (props) => {
    
    return (
        <ScrollView>
            <Navbar style={{ height: 1 }} />

            <View style={styles.main}>

                <View >
                    <TouchableOpacity onPress={() => props.navigation.navigate('MessagesScreen')}>
                        <Image source={Massege} style={{ width: 35, height: 35, marginLeft: 300 }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginVertical: 25, backgroundColor: '#add8e6', marginHorizontal: 35, borderRadius: 30, shadowRadius: 5 }}
                    onPress={() => props.navigation.navigate('ListOfPreparation')}>
                    <Text style={{ fontSize: 50, textAlign: 'center' }}>Preparation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 25, backgroundColor: '#adff2f', marginHorizontal: 35, borderRadius: 30, shadowRadius: 5 }}
                    onPress={() => props.navigation.navigate('ListOfSpices')}>
                    <Text style={{ fontSize: 50, textAlign: 'center' }}>Spices</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 25, backgroundColor: '#f08080', marginHorizontal: 35, borderRadius: 30, shadowRadius: 5 }}
                    onPress={() => props.navigation.navigate('ListOfIngredients')}>
                    <Text style={{ fontSize: 50, textAlign: 'center' }}>Ingradients</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 15
    }
})
export default PageAdminHome;