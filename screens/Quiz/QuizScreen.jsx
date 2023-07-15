import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import QuizHomeScreen from "./QuizHomeScreen";
import ExamScreen from "./ExamScreen";
import ResultScreen from "./ResultScreen";
import QuizDetails from "./QuizDetails";
import { useEffect, useContext } from "react";
import AuthcontextProvider, { AuthContext } from "../../store/auth-context";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { DocContext } from "../../store/doc-context";

let customFonts = {
  Fraunces: require("../../assets/fonts/Fraunces.ttf"),
  Poppins: require("../../assets/fonts/Poppins.ttf"),
};

const Tab = createNativeStackNavigator();
const QuizScreen = ({ navigation, route }) => {
  const docctx = useContext(DocContext);
  docctx.setHeaderTitles("Quiz");
  console.log("documentId is", route.params.documentId);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Homes"
        component={QuizHomeScreen}
        options={{ headerShown: false }}
        initialParams={{ documentId: route.params.documentId }}
      />
      <Tab.Screen
        name="Exam"
        component={ExamScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Details"
        component={QuizDetails}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
