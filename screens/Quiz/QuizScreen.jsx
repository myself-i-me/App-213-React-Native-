import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import QuizHomeScreen from "./QuizHomeScreen";
import ExamScreen from "./ExamScreen";
import ResultScreen from "./ResultScreen";
import QuizDetails from "./QuizDetails";
import { useEffect, useContext } from "react";
import AuthcontextProvider, { AuthContext } from '../../store/auth-context';



const Tab = createNativeStackNavigator();
const QuizScreen = ({navigation}) => {
  const authctx = useContext(AuthContext);
  authctx.setHeaderTitles('Quiz')

    // useEffect(() =>{
    //     navigation.setOptions({
    //       drawerLabel: 'Quiz'
    //     })
    //   }, [navigation])


    return (
        <Tab.Navigator>
            <Tab.Screen name= "Homes" component = {QuizHomeScreen} options={{headerShown: false}}/>
            <Tab.Screen name= "Exam" component = {ExamScreen} options={{ headerShown: false}}/>
            <Tab.Screen name= "Result" component = {ResultScreen} options={{ headerShown: false}}/>
            <Tab.Screen name="Details" component={QuizDetails} options={{headerShown:false}} />
            
        </Tab.Navigator>
    );
}

export default QuizScreen;

const styles = StyleSheet.create({

})