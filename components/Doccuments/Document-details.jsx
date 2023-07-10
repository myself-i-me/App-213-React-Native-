import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { doclist } from '../Objects';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../store/auth-context';
import { sendRequestAccess } from '../../util/documentApis';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

export default function DocumentDetails({route, navigation}) {
    const { width, height } = Dimensions.get('window');

    const authctx = useContext(AuthContext);
   
    const currentItem = route.params.item;
    // const accessable = currentItem.accessable;
    const accessable = true
    const [requestedAccess, setRequestedAccess] = useState(false);
    const [isSending, setIssending] = useState(false);

    const [reason, setReason] = useState('');

    const handleTextChange = (inputText) => {
        setReason(inputText);
    };

    function requestAccess() {
        if(!requestedAccess){
            setRequestedAccess(true);
        } else{
            if(!reason){
                Alert.alert('Warning', 'Please enter a valid reason')
            } else{
                console.log(reason, currentItem.id);
                setIssending(true)
                setRequestedAccess(false)
                try {
                    sendRequestAccess(authctx.userId, currentItem.id,reason,authctx.token)
                    setIssending(false)
                } catch (error) {
                    console.log('error is', error);
                    setIssending(false)
                }
            }
        }
    }

    if(isSending){
        return <LoadingOverlay />
    }

    

    return (
        <View style={{paddingHorizontal:width*0.0,marginHorizontal:0 ,flex:1,alignItems:'center' , justifyContent:'center', paddingTop:10}}>
        <ScrollView style={{}} keyboardShouldPersistTaps='handled'>
                <View style={{ flex:1 ,justifyContent:'center', alignItems:'flex-start' ,paddingHorizontal:width*0.05}}>
                <Text style={{fontSize:25, alignSelf:'center', fontWeight:'bold'}}>{currentItem.title}</Text>
                <Image
                source={{
                    uri: "http://ihiapps.com:8080/wildbase/downloadFile/images/" + currentItem.image,
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + authctx.token,
                    },
                  }}
                style={{height:height*0.4,width:'60%' , resizeMode:'stretch', alignSelf:'center', borderColor:'#145C7B',marginVertical:10, borderRadius:8 ,borderWidth:1.3}}
                />
                <Text style={{color:'grey', alignSelf:'center', fontSize:15, lineHeight:20}}>{currentItem.description}</Text>
                {!requestAccess && <Text style={{fontSize:18, fontWeight:600, marginVertical:15}}>Foreword Acknowledgement</Text>}
                { accessable && 
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:height*0.05, alignSelf:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Explore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Download pdf</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
                        <Text style={styles.buttonText}>Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Offline</Text>
                    </TouchableOpacity>
                    </View>
                }

                {requestedAccess &&
                    <View style ={{padding:16,width:'100%'}}>
                        <TextInput
                            style ={{width: width*0.8,
                            height: 150,
                            borderWidth: 1,
                            borderColor: '#145C7B',
                            borderRadius: 8,
                            paddingBottom:120,
                            paddingLeft:10,
                            flex:1
                            }}
                            value={reason}
                            placeholder='Please provide the reason for the access'
                            onChangeText={handleTextChange}
                            multiline
                        ></TextInput>
                    </View>
                }



                { !accessable && 
                    <View style= {{alignSelf:'center'}}>
                        <TouchableOpacity style={styles.button} onPress={() =>{!currentItem.isRequestAccessSent && requestAccess()}}>
                        <Text style={styles.buttonText}>{currentItem.isRequestAccessSent ? 'Request Sent': 'Request Access' }</Text>
                        </TouchableOpacity>
                    </View>
                }
                
                </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText:{
        marginVertical:10,
        textAlign:'center',
        color:'white',
        fontWeight:700
    },
    button:{
        minWidth:width*0.4,
        backgroundColor:'#145C7B',
        margin:height*0.005,
        borderRadius:8,
    }
})