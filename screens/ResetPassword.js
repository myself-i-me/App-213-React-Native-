import React, {useState,useContext,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay"
import Input from "../components/ui/Input";
const { width, height } = Dimensions.get("window");
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { changePasswordApi, resetPasswordApi } from "../util/auth";
import { AuthContext } from "../store/auth-context";
let customFonts = {
  'Fraunces': require('../assets/fonts/Fraunces.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins600.ttf'),
  'Poppins': require('../assets/fonts/Poppins.ttf')
};

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        otp: false,
        password: false,
        confirmPassword: false,
    });
    const {
        otp: otpIsInvalid,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;
    const authctx = useContext(AuthContext)
    const navigation = useNavigation()

    useEffect(() => {
        async function loadFontsAsync() {
            await Font.loadAsync(customFonts);
            setIsFontsLoaded(true);
            SplashScreen.hideAsync();
          }
          loadFontsAsync();
    },[])

    if (!isFontsLoaded) {
        SplashScreen.preventAutoHideAsync();
        return null;
    }
    

    async function changePassword({otp,password,confirmPassword}){
      console.log('otp.........',otp,password,confirmPassword)
        setLoading(true);
        try {
            let response = await resetPasswordApi(authctx.userId,otp,password,confirmPassword,authctx.token)
            console.log('response is', response);
            navigation.navigate('Login')
        } catch(error) {
            Alert.alert('Error', 'Old Password is incorrect');
            setCredentialsInvalid({
              otp: true,
              password: false,
              confirmPassword: false,
            });
            console.log('error in resetting password', error)
        }
        setLoading(false);
    }

    function submitHandler(credentials) {
        let { otp, password, confirmPassword} = credentials;
        console.log("cred are", credentials);
        password = password.trim();
        otp = otp.trim();
        confirmPassword = confirmPassword.trim()
        const otpIsValid = !!otp
        const passwordIsValid = password.length > 5;
        const passwordsAreEqual = password === confirmPassword;
        console.log(otpIsValid,passwordIsValid,passwordsAreEqual)
        if (!otpIsValid || !passwordIsValid || !passwordsAreEqual) {
          Alert.alert("Invalid input", "Please check your entered credentials.");
          setCredentialsInvalid({
            otp: !otpIsValid,
            password: !passwordIsValid,
            confirmPassword: !passwordIsValid || !passwordsAreEqual,
          });
          return;
        }
        changePassword({
          otp,
          password,
          confirmPassword
        });
    }

    function onSubmit() {
        submitHandler({
          otp: enteredOtp,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
        });
    }

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
          case "otp":
            setEnteredOtp(enteredValue);
            break;
          case "password":
            setEnteredPassword(enteredValue);
            break;
          case "confirmPassword":
            setEnteredConfirmPassword(enteredValue);
            break;
        }
    }

    if(loading) {
        return <LoadingOverlay />
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              paddingTop: height * 0.1,
              backgroundColor: "white",
              flex: 1,
              height: height * 1,
            }}
          >
            <View style={{ width: width * 0.8, alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#1a475c",
                  textAlign: "center",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Reset Password
              </Text>
              <Input
                onUpdateValue={updateInputValueHandler.bind(this, "otp")}
                secure
                value={enteredOtp}
                isInvalid={otpIsInvalid}
                placeHolder="Otp"
              />
              <Input
                onUpdateValue={updateInputValueHandler.bind(this, "password")}
                secure
                value={enteredPassword}
                isInvalid={passwordIsInvalid}
                placeHolder="Password"
              />
              <Input
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "confirmPassword"
                )}
                secure
                value={enteredConfirmPassword}
                isInvalid={passwordsDontMatch}
                placeHolder="Confirm Password"
              />
              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontFamily: "Poppins-SemiBold",
                    fontWeight: 600,
                    width: width * 0.75,
                    height: 30,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 11,
      backgroundColor: "#145C7B",
      padding: 10,
      marginTop:26,
      // width:236,
      alignSelf:'center'
    },
    contaier: {
      paddingHorizontal: width * 0.05,
    },

    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color:'grey'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  
});