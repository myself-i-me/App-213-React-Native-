import { View, StyleSheet, Text, SafeAreaView, Pressable, TouchableOpacity, } from "react-native";

import { useNavigation } from "@react-navigation/native";
import React from "react";

const QuizCategory = ({item}) =>{

    const navigation = useNavigation();
    const goToDetails = () =>{
        navigation.navigate('Details',{
            item:item
        })
    }
    return (
        <View style = {styles.container}>         
            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.title}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    <Text>Questions    </Text>
                    <Text>{item.questions}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Duration    </Text>
                    <Text>{item.duration}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Text>Qualify score</Text>
                    <Text>{item.qualify}</Text>
                </View>
                <Text style={{marginRight:20}}>{item.level}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={goToDetails}>
                <Text style={{color:'white'}}>Attempt now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuizCategory;

const styles = StyleSheet.create({
    container:{
        padding:10,
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 7,
        borderColor:'#145C7BBA',
        borderWidth:1,
        backgroundColor:'#D9FFFF57'
    },
    button: {
        backgroundColor:'#145C7B',
        alignSelf:'flex-end',
        padding:10,
        borderRadius:8,
        paddingHorizontal:15,
        marginTop:10
    }
})