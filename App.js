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
import Logout from './screens/Logout'
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
import DocContextProvider, { DocContext } from './store/doc-context';
import { getDocumentsByUserID } from './util/documentApis';
import QuizScreen from './screens/Quiz/QuizScreen';
import ProfileStack from './screens/profileStack/profileHome';
import DashBoard from './screens/DashBoard';
import SettingsScreen from './screens/Settings';
import * as Font from 'expo-font'
import QuizAdminList from './screens/Quiz/QuizAdminList';
import Certificates from './screens/profileStack/Certificates';
import AddNewQuiz from './screens/Quiz/AddNewQuiz';

import ResetPassword from './screens/ResetPassword';
let customFonts = {
  'Fraunces': require('./assets/fonts/Fraunces.ttf'),
  'Poppins': require('./assets/fonts/Poppins.ttf')
};
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AuthStack() {
  const navigator = useNavigation();
  return (
    <>
    {/* <StatusBar  hidden /> */}
    <Stack.Navigator
      initialRouteName='Landing'
    >
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
      <Stack.Screen name="SignUp" component={RegisterScreen} options={{ headerShown: false}} />
      <Stack.Screen name = "Otp" component={OtpScreen} options={{ headerShown: false}}/>
      <Stack.Screen name = "ForgotPassword" component={ForotPasswordScreen} options={{ headerShown: false}}/>
      <Stack.Screen name = "ResetPassword" component={ResetPassword} options={{ headerShown: false}}/>
    </Stack.Navigator>
    </>
  );
}

function TempDocs() {
  const docctx = useContext(DocContext)
  useEffect(()=>{
    docctx.setHeaderTitles('Home')
  },[])
  return (
    <Stack.Navigator>
      <Stack.Screen name= "Documents" component={DocumentList} options={{headerShown: false}}/>
      <Stack.Screen name = "docdetails" component={DocumentDetails} options={{headerShown: false}}/>
      <Stack.Screen name='Quiz' component={QuizScreen} options={{headerShown:false, drawerLabel:'Quiz'}}  />
      <Stack.Screen name='Quiz Management' component={QuizAdminList} options={{headerShown:false}} />
      <Stack.Screen name='Add Quiz' component={AddNewQuiz} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authctx = useContext(AuthContext);
  const docctx = useContext(DocContext);
  const role = authctx.role
  return (
    <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
          drawerStyle:{width:300},
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props}  />}>
        <Drawer.Screen
          name="Home"
          options={{ drawerLabelStyle:{fontFamily:'Poppins'},  headerShown:docctx.headerShown,unmountOnBlur:true,headerTintColor:'white', headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitle:docctx.headerTitle, headerTitleStyle:{fontFamily:'Fraunces',fontSize:24}, drawerIcon:({ color, size }) => (<Feather name="home" color={color} size={size} />)}}
          component={TempDocs}
        />
        {role !== 'ROLE_USER' && <Drawer.Screen
          name="Document Management"
          options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitle:'Documents' ,headerTitleStyle:{fontFamily:'Fraunces',fontSize:24}, drawerIcon:() => (<Ionicons name="documents-outline" size={24} color="black" />)}}
          component={DocumentManagement}
        />}
        {role !== 'ROLE_USER' && <Drawer.Screen
          name="User Management"
          options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitle:'Users', headerTitleStyle:{fontFamily:'Fraunces',fontSize:24},drawerIcon:({ color, size }) => (<Feather name="users" color={color} size={size} />)}}
          component={Users}
        /> }
        <Drawer.Screen 
          name='My Profile'
          options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitleStyle:{fontFamily:'Fraunces',fontSize:24}, drawerIcon:({color,size}) => (<AntDesign name="profile" size={24} color="black" />)}}
          component={ProfileStack}
        />
        {role !== 'ROLE_USER' && <Drawer.Screen
        name='DashBoard'
        options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, headerTitleStyle:{fontFamily:'Fraunces',fontSize:24}, drawerIcon:() =>(<MaterialCommunityIcons name="view-dashboard-outline" size={24} color="black" />)}}
        component={DashBoard}
        />}
        <Drawer.Screen
          name="Settings"
          options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, drawerIcon:({color,size}) => (<Feather name="settings" size={24} color="black" />)}}
          component={SettingsScreen}
        />
        <Drawer.Screen
        name="Logout"
        options={{ drawerLabelStyle:{fontFamily:'Poppins'},headerShown:true,headerTintColor:'white',unmountOnBlur:true, headerTitleAlign:'center' ,headerStyle:{backgroundColor:'#145C7B'}, drawerIcon:() =>(<MaterialIcons name="logout" size={24} color="black" />)}}
        component={Logout}
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
	const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  const authctx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      await Font.loadAsync(customFonts);
			setIsFontsLoaded(true);
      const storedToken = await AsyncStorage.getItem("quickref_token");
      const refreshToken = await AsyncStorage.getItem("quickref_refresh_token");
      const userId = await AsyncStorage.getItem("quickref_userid");
      console.log('token is ', storedToken,'ref is', refreshToken, 'userid', userId)
      if (storedToken && refreshToken && userId) {
        console.log('userid is', userId)
        try {
				  let documents = await getDocumentsByUserID(userId, storedToken)
          console.log('documents are fetched', storedToken);
          await authctx.authenticate(storedToken,refreshToken);
          console.log('setting1')
          setIsTryinglogin(false);
        } catch (error) {
          try {
            let {newToken,newRefreshToken} = await refreshTokenFunction(refreshToken);
            await authctx.authenticate(newToken,newRefreshToken);
            console.log('setting2')
            setIsTryinglogin(false);
          } catch (error) {
            await authctx.logout()
          console.log('setting3')
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

  SplashScreen.preventAutoHideAsync();
  if (isTryingLogin || !isFontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
    return <Navigation />;
  }

}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthcontextProvider>
        <Root />
      </AuthcontextProvider>
    </>
  );
}
