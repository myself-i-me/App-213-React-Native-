import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

const {width, height} = Dimensions.get('window');

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Poppins-semibold': require('../../assets/fonts/Poppins600.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf'),
};

export default function AddNewQuiz({ }) {
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
    <View style={styles.container}>
      <Text style={styles.header}>Basic fundamentals of wildlife in Kenya</Text>
      <View style={styles.container2}>
        <Text style={{ fontFamily:'Poppins', fontSize:15,}}>Name</Text>
        <TextInput style={[styles.input, {height:50}]} />
        <View style={styles.jcRow}>
          <Text style={styles.rowInline}>No. of Questions</Text>
          <Text style={styles.rowInline}>Duration (in min)</Text>
        </View>
        <View style={styles.jcRow}>
          <TextInput style={[styles.input, styles.rowInline,]} />
          <TextInput style={[styles.input, styles.rowInline]} />
        </View>
        <View style={styles.jcRow}>
          <Text style={styles.rowInline}>Qualifying score %</Text>
          <Text style={styles.rowInline}>Active/Inactive</Text>
        </View>
        <View style={styles.jcRow}>
          <TextInput style={[styles.input, styles.rowInline]} />
          <TextInput style={[styles.input, styles.rowInline]} />
        </View>
        <TouchableOpacity style={{backgroundColor:'#145C7B', width:'50%', alignSelf:'center', borderRadius:10, marginTop:50}}>
          <Text style={{alignSelf:'center', color:'white', marginVertical:10, fontFamily:'Poppins-semibold',  fontSize:16}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#145C7B",
    borderWidth: 1,
    // placeholder:'placeholder',
    borderRadius: 8,
    height:40,
    fontSize:20,
    paddingLeft:8,
    marginBottom:20,
    marginTop:0
  },
  header: {
    // textAlign: "center",
    backgroundColor: "#145c7b0d",
    fontFamily: "Poppins-semibold",
    fontSize: 22,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#145C7B",
    borderBottomColor: "#145C7B",
    paddingLeft:15,
    paddingVertical:8,
    // minHeight:25
  },
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  container2: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.1,
    backgroundColor:'white',
    // height:height*0.5,
    // justifyContent:'space-evenly'
  },
  jcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // marginVertical:6
  },
  rowInline: {
    width: "45%",
    fontSize:15,
    fontFamily:'Poppins'
  },
});