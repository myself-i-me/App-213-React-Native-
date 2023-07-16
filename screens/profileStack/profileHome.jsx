import { StyleSheet, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import Certificates from "./Certificates";
import ChangePassword from "./ChangePassword";
const ProfileTab = createNativeStackNavigator();

export default function ProfileStack({navigation, route}) {
    return (
        <ProfileTab.Navigator>
            <ProfileTab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <ProfileTab.Screen name= "Certificates" component={Certificates} options={{headerShown: false}}/>
            <ProfileTab.Screen name= "changePassowrd" component={ChangePassword} options={{headerShown: false}}/>
        </ProfileTab.Navigator>
    )
}