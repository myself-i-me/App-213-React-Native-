import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthcontextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForotPasswordScreen from './screens/forgotPassword';
import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen'
import LandingPage from './screens/IntialScreen';
import OtpScreen from './screens/otpScreen'
import { refreshTokenFunction } from './util/auth';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import CustomSidebarMenu from './customSideBarMenu';
import DocumentList from './components/Doccuments/DocumentList';
import DocumentManagement from './components/Doccuments/Doc-management-list';
import DocumentItem from './components/Doccuments/DocumentItem';
import Users from './components/users/users'
import DocumentDetails from './components/Doccuments/Document-details';
import DocContextProvider from './store/doc-context';
import { getDocumentsByUserID } from './util/documentApis';
import QuizScreen from './screens/Quiz/QuizScreen';
import Certificates from './screens/Certificates';
import DashBoard from './screens/DashBoard';


function AuthStack() {
  const navigator = useNavigation();
  return (
    <>
    <StatusBar  style='auto' />
    <Stack.Navigator
      initialRouteName='Landing'
    >
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
      <Stack.Screen name="SignUp" component={RegisterScreen} options={{ headerShown: false}} />
      <Stack.Screen name = "Otp" component={OtpScreen} options={{ headerShown: false}}/>
      <Stack.Screen name = "ForgotPassword" component={ForotPasswordScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
    </>
  );
}

function TempDocs() {
  const authctx = useContext(AuthContext)
  authctx.setHeaderTitles('Home')
  return (
    <Stack.Navigator>
      <Stack.Screen name= "Documents" component={DocumentList} options={{headerShown: false}}/>
      <Stack.Screen name = "docdetails" component={DocumentDetails} options={{headerShown: false}}/>
      <Stack.Screen name='Quiz' component={QuizScreen} options={{headerShown:false, drawerLabel:'Quiz'}}  />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authctx = useContext(AuthContext)

  return (
    <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{ headerShown:authctx.headerShown,unmountOnBlur:true,headerTintColor:'white', headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitle:authctx.headerTitle}}
          component={TempDocs}
        />
        <Drawer.Screen
          name="Documents"
          options={{headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}}}
          component={DocumentManagement}
        />
        <Drawer.Screen
          name="User Management"
          options={{headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}}}
          component={Users}
        />
        <Drawer.Screen 
          name='Certificates'
          options={{headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}}}
          component={Certificates}
        />
        <Drawer.Screen
        name='DashBoard'
        options={{headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}}}
        component={DashBoard}
        />
         <Drawer.Screen
          name="Logout"
          options={{headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}}}
          component={WelcomeScreen}
        />
      </Drawer.Navigator>
  );
}

function Navigation() {
  const authctx = useContext(AuthContext);
  const isAuthenticated = authctx.isAuthenticated
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && (
        <DocContextProvider>
          <AuthenticatedStack />
        </DocContextProvider>
      )}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryinglogin] = useState(true);
  const authctx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("quickref_token");
      const refreshToken = await AsyncStorage.getItem("quickref_refresh_token");
      const userId = await AsyncStorage.getItem("quickref_userid");
      console.log('token is ', storedToken,'ref is', refreshToken, 'userid', userId)
      if (storedToken && refreshToken && userId) {
        console.log('userid is', userId)
        try {
				  let documents = await getDocumentsByUserID(userId, storedToken)
          console.log('documents are fetched', storedToken);
          authctx.authenticate(storedToken,refreshToken);
          setIsTryinglogin(false);
        } catch (error) {
          try {
            let {newToken,newRefreshToken} = await refreshTokenFunction(refreshToken);
            authctx.authenticate(newToken,newRefreshToken);
            setIsTryinglogin(false);
          } catch (error) {
            authctx.logout()
            setIsTryinglogin(false);
          }
        }
      } else {
        console.log('No token or auth token or userid')
      }
      setIsTryinglogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthcontextProvider>
        <Root />
      </AuthcontextProvider>
    </>
  );
}
