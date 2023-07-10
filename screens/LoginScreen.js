import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { Alert, Dimensions, StyleSheet, View, Image, Text, TextInput, ScrollView } from "react-native";
import { login } from '../util/auth';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

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
      <View style={{alignItems:'center',backgroundColor: 'white',flex:1,paddingTop:height*0.27}}>
      <Image
      source={elephant_cropped}
      style={{position:'absolute', top: height*0.047, width: width*1.05, height:height*0.25}}
      />
      <View style={{width:width*0.8}} >
        <Image 
        source={leaf}
        style={{height:100, width:100, borderWidth:1, alignSelf:'center'}}
        />
        <Text style={{fontSize:35, fontWeight:'500', color:'#1a475c', textAlign:'center', marginBottom:10}}>Welcome back</Text>
        <Text style={{textAlign:'center', color:"#207398", marginBottom:10}}>Login into your account</Text>
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
        <Text style={{textAlign:'right', marginTop:10, marginBottom:150, color:'#207398', textDecorationLine:'underline'}} onPress={()=>navigation.navigate('ForgotPassword')}>Forgot password?</Text>
        <Button title='Login' backgroundColor="#207398" color="white" onPress={onSubmit}/>
        <Text style={{marginVertical:10, textAlign:'center', color:'grey'}}>Don't have an account?
            <Text style={{color:'#207398', textDecorationLine:'underline'}} onPress={()=>navigation.navigate('SignUp')}>Sign up</Text>
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
});
