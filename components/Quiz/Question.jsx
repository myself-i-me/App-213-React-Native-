import { View, StyleSheet, Text, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

const QuestionScreen = (props) => {
    return (
      <View style= {styles.container}>
        <Text style= {styles.question}>{props.question.replace(/&quot;|#039;/g,'')}</Text>
      </View>
    )
}

export default QuestionScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:height*0.04
    },
    question:{
        fontSize:20
    }
})