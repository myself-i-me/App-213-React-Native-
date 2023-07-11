import { View, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native";
import QuizCategory from "../../components/Quiz/Quiz-category";
import { quizData } from "../../components/Objects";

const { width, height } = Dimensions.get("window");
import { useEffect } from "react";
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf')
};


const QuizHomeScreen = ({navigation}) => {

  console.log('navigation is', navigation);


    const categories = [
        {
            id:1,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },
        {
            id:2,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },
        {
            id:3,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },
        {
            id:4,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },
        {
            id:5,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },
        {
            id:6,
            title: 'Basic fundamentals of wildlife in Kenya',
            questions: 25,
            duration: 30,
            qualifyScore: 75,
            difficulty: 'moderate'
        },

    ]
    return (
      <SafeAreaView style= {{paddingTop:10, paddingHorizontal:width*0}}>
        <FlatList
          data={quizData}
          renderItem={({ item }) => (
            <QuizCategory item={item} navigation={navigation}/>
          )}
          keyExtractor={(item) => item.id}
          scrollb
        />
      </SafeAreaView>
    );
}

export default QuizHomeScreen;

const styles = StyleSheet.create({})