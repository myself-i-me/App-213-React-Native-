import { View, StyleSheet, Text, Dimensions } from "react-native";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import React, {useState, useEffect} from 'react'

const {width, height} = Dimensions.get('window')

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
};

const QuestionScreen = (props) => {

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
    return (
      <View style= {styles.container}>
        <Text style= {styles.question}>{props.question.replace(/&quot;|#039;/g,'')}</Text>
      </View>
    )
}

export default QuestionScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:height*0.04,
    },
    question:{
        fontSize:20,
        fontFamily:'Poppins'
    }
})