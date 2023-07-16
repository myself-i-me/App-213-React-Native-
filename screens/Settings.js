import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useState,useEffect, useContext } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from '@expo/vector-icons';
let customFonts = {
  'Fraunces': require("../assets/fonts/Fraunces.ttf"),
  'Poppins': require("../assets/fonts/Poppins.ttf"),
  'Poppins-Semibold': require('../assets/fonts/Poppins600.ttf'),
};

function SettingsScreen() {
 
  const authctx = useContext(AuthContext);

  const blueTheme = require('../assets/blueTheme.png');
  const greenTheme = require('../assets/greenTheme.png');
  const orangeTheme = require('../assets/orangeTheme.png');
  const grayTheme = require('../assets/grayTheme.png');

  const [languages, setLanguages] = useState([
    { id: 1, label: 'English', name: "English", selected: false },
    { id: 2, label: 'French', name: "French", selected: false },
    { id: 3, label: 'Spanish', name: "Spanish", selected: false }
  ]);
  
  const [themes,setThemes] = useState([
    { id: 1, label: 'Blue', source: blueTheme, selected: false },
    { id: 2, label: 'Green', source: greenTheme, selected: false },
    { id: 3, label: 'Orange', source: orangeTheme, selected: false },
    { id: 4, label: 'Gray', source: grayTheme, selected: false}
  ])

  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() =>{
    async function  loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync()
    }
    loadFontsAsync()
    const storedLanguage = authctx.language;
    setLanguages(languages.map(language =>{
      if(language.name == storedLanguage){
        language.selected = true;
        return language;
      }
      return language;
    }))
    const storedTheme = authctx.theme;
    setThemes(themes.map(theme =>{
      if(storedTheme === theme.label ){
        theme.selected= true ;
        return theme;
      }
      return theme;
    }))
  },[])

  if(!isFontsLoaded){
    SplashScreen.preventAutoHideAsync();
    return null
  }

  function choosen(value) {
    console.log("value is", value);
    authctx.storeLanguage(value)
  }

  const RadioButton = ({ onPress, selected, children }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
          {selected ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.radioButtonText}>{children}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const onRadioBtnClick = (item,element) => {
    if(element == 'language') {
      let updatedState = languages.map((isLikedItem) => {
        if (isLikedItem.id === item.id) {
          choosen(item.label);
          return { ...isLikedItem, selected: true };
        } else {
          return { ...isLikedItem, selected: false };
        }
      });
      setLanguages(updatedState);
    } else {
      let updatedState = themes.map((isLikedItem) => {
        if (isLikedItem.id === item.id) {
          choosen(item.label);
          return { ...isLikedItem, selected: true };
        } else {
          return { ...isLikedItem, selected: false };
        }
      });
      setThemes(updatedState);
    }
  };

  function Options({items}) {
    return items.map((item) => {
        return (
          <RadioButton
            onPress={() => onRadioBtnClick(item,'language')}
            selected={item.selected}
            key={item.id}
            children={item.label}
          >
          </RadioButton>
        );
    })
  }

  function Themes({items}) {
    return items.map((item) => {
      return (
        <RadioButton
          onPress={() => onRadioBtnClick(item,'theme')}
          selected={item.selected}
          key={item.id}
        >
        <Image source={item.source}/>
        </RadioButton>
      );
  })
  }

  return (
    <View style={styles.rootContainer}>
     <View style = {{marginBottom:0}}>
        <Text style = {styles.headings}> Language </Text>
        <Options items={languages}/>
     </View>
     <View style = {{marginBottom:0}}>
        <Text style = {styles.headings}> Theme </Text>
        <Themes items={themes}/>
     </View>
     <View style={{flexDirection:'row', justifyContent:'space-between', borderWidth:0, borderColor:'red',alignItems:'center', paddingRight:30}}>
        <Text style={[styles.headings, {marginTop:10}]}>Offline data</Text>
        <Ionicons name="eye-off-outline" size={30} color="black" />
     </View>
     
    </View>
    
  );

}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
    marginLeft:20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: width * 0,
    paddingBottom: 10,
    marginLeft:20
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "blue",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  headings:{
    fontFamily:'Poppins-semibold',
    fontSize:20,
    color:'#000',
    marginBottom:7,
  }
});
