import { AuthContext } from "../store/auth-context";
import { useContext, useState, useEffect } from "react";
import { Alert, Dimensions, StyleSheet, View, Image, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { login } from '../util/auth';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

function LoginScreen({navigation}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticating, setisAuthenticating] = useState(false);
  const { email: emailIsInvalid, password: passwordIsInvalid } = credentialsInvalid;
  const leaf = require('../assets/leaf.png');
  const elephant_cropped = require('../assets/elephant-cropped.png');
  const {width, height} = Dimensions.get('window');
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


  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setisAuthenticating(true);
    try {
      const {token, refreshToken, userId, role} = await login(email, password);
      console.log(userId, role)
      authCtx.setUserDetails(userId,role);
      authCtx.authenticate(token,refreshToken);
    } catch (error) {
      if(error?.response.data.message == 'Your account has not been approved yet.Plaese contact Administrator for approval.'){
        Alert.alert(
          "Authentication failed",
          "Your account has not been approved yet.Plaese contact Administrator for approval."
        );
      } else {
        Alert.alert(
          "Authentication failed",
          "Please check your credentials or try again later"
        );
      }
      setisAuthenticating(false);
    }
  }

  function submitHandler(credentials) {
    let { email, password } = credentials;
    console.log("cred are", credentials);
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length >=5;
    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    loginHandler({ email, password });
  }

  function onSubmit() {
    submitHandler({
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  function forgotPassword() {
    console.log('forgott')
    navigation.navigate('forgotPassowrd')
  }

  return (
    <ScrollView style = {{backgroundColor: 'white'}} keyboardShouldPersistTaps='handled'>
      <View style={{backgroundColor: 'white',flex:1,paddingTop:height*0.23}}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0, width: width*1.05, height:height*0.21, left:-5}}
      resizeMode="stretch"
      />
      <View style={{width:width*0.8, alignSelf:'center'}} >
        <Image 
        source={leaf}
        style={{height:100, width:100, alignSelf:'center'}}
        />
        <Text style={{fontSize:35, fontWeight:'700', color:'#1a475c', textAlign:'center', marginBottom:10, fontFamily:'Poppins'}}>Welcome back</Text>
        <Text style={{textAlign:'center', color:"#207398", marginBottom:10,fontFamily:'Poppins'}}>Login into your account</Text>
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeHolder= 'Email Address'
        />
        <Input
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          placeHolder='password'
        />
        <Text style={{textAlign:'right', marginTop:12, marginBottom:70, color:'#207398', textDecorationLine:'underline',fontFamily:'Poppins'}} onPress={()=>navigation.navigate('ForgotPassword')}>Forgot password?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
                <Text style={{marginTop:6, color:'white', fontSize:16, fontFamily:'Poppins-SemiBold', fontWeight:600, width:width*0.75, height:30,textAlign:'center', alignSelf:'center', textAlignVertical:'center', backgroundColor:'transparent'}}>Login</Text>
            </TouchableOpacity>
        <Text style={{marginVertical:10, textAlign:'center', color:'#828080',fontFamily:'Poppins'}}>Don't have an account? 
            <Text style={{color:'#207398', textDecorationLine:'underline', fontFamily:'Poppins-SemiBold'}} onPress={()=>navigation.navigate('SignUp')}> Sign up</Text>
        </Text>
      </View>
    </View>
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  loginButton:{
    borderRadius: 11,
    backgroundColor: "#145C7B",
    alignSelf:'center',
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop:19,
    // width:270
  }
});
