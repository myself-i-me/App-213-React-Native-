import { View, StyleSheet, Text, SafeAreaView, Pressable, TouchableOpacity, } from "react-native";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect, useState } from "react";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';


let customFonts = {
    'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
    'Poppins': require('../../assets/fonts/Poppins.ttf'),
    'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
    'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
  };
const QuizCategory = ({item}) =>{

    const navigation = useNavigation();

    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    useEffect(() =>{
        async function  loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setIsFontsLoaded(true);
        SplashScreen.hideAsync()
        }
        loadFontsAsync()
    },[])
    
    if(!isFontsLoaded){
        SplashScreen.preventAutoHideAsync();
        return null
    }

    const goToDetails = () =>{
        navigation.navigate('Details',{
            item:item
        })
    }
    return (
        <View style = {styles.container}>         
            <Text style={{fontSize:18,fontFamily:'Poppins',fontWeight:'bold'}}>{item.title}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    <Text style = {styles.subItems}>Questions    </Text>
                    <Text style = {styles.subItems}>{item.questions}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style = {styles.subItems}>Duration    </Text>
                    <Text style = {styles.subItems}>{item.duration}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style = {styles.subItems}>Qualify score</Text>
                    <Text style = {styles.subItems}>{item.qualify}</Text>
                </View>
                <Text style={{marginRight:20,fontFamily:'Poppins'}}>{item.level}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={goToDetails}>
                <Text style={{color:'white',fontFamily:'Poppins'}}>Attempt now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizCategory;

const styles = StyleSheet.create({
    container:{
        padding:10,
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 7,
        borderColor:'#145C7BBA',
        borderWidth:1,
        backgroundColor:'#D9FFFF57'
    },
    button: {
        backgroundColor:'#145C7B',
        alignSelf:'flex-end',
        padding:10,
        borderRadius:8,
        paddingHorizontal:15,
        marginTop:10
    },
    subItems:{
        fontFamily:'Poppins'
    }
})