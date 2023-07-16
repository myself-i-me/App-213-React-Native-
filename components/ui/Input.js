import { View, Text, TextInput, StyleSheet } from "react-native";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf')
};


function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeHolder,
}) {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(()=>{
    async function  loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setIsFontsLoaded(true);
      SplashScreen.hideAsync()
    }
    loadFontsAsync()
  })
  
  if(!isFontsLoaded){
    SplashScreen.preventAutoHideAsync();
    return null
  }

  return (
    <View style={styles.inputContainer}>
      {label ? (
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
      ) : (
        ""
      )}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeHolder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 4.5,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderColor: "#207398",
    borderWidth: 1,
    color: "grey",
    fontFamily:'Poppins',
  },
  inputInvalid: {
    backgroundColor: "#8be8a4",
  },
});
