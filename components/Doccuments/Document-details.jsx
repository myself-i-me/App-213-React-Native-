import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../store/auth-context';
import { sendRequestAccess } from '../../util/documentApis';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Image } from 'expo-image';
import { DocContext } from '../../store/doc-context';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'Fraunces': require('../../assets/fonts/Fraunces.ttf'),
  'Poppins': require('../../assets/fonts/Poppins.ttf'),
  'Fraunces-regular': require('../../assets/fonts/FrauncesRegular.ttf'),
  'Fraunces-semibold': require('../../assets/fonts/Fraunces_72pt-SemiBold.ttf')
};

const { width, height } = Dimensions.get('window');

export default function DocumentDetails({route, navigation}) {

    const authctx = useContext(AuthContext);
    const docContext = useContext(DocContext);
    const accessData = docContext.accessData;
    const currentItem = route.params.item;
    const role = authctx.role;
    const currentItemAccessData = accessData.find((i) =>{
        return currentItem.id == i.documentId
    })
    const accessable = currentItem.accessable;
    const [requestedAccess, setRequestedAccess] = useState(false);
    const [isSending, setIssending] = useState(false);

    const [reason, setReason] = useState('');

    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    useEffect(() =>{
        async function  loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setIsFontsLoaded(true);
        SplashScreen.hideAsync()
        }
        loadFontsAsync()
    },[])
    
    if(!isFontsLoaded){
        SplashScreen.preventAutoHideAsync();
        return null
    }

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
                setIssending(true)
                setRequestedAccess(false)
                try {
                    sendRequestAccess(authctx.userId, currentItem.id,reason,authctx.token);
                    setIssending(false);
                    docContext.updateAccessData(currentItem.id)
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
       <SafeAreaView style={{flex:1}}>
         <View style={{paddingHorizontal:width*0.0,marginHorizontal:0 ,flex:1,alignItems:'center' , justifyContent:'center', paddingTop:10}}>
        <ScrollView style={{}} keyboardShouldPersistTaps='handled'>
                <View style={{ flex:1 ,justifyContent:'center', alignItems:'flex-start' ,paddingHorizontal:width*0.05}}>
                <Text style={{fontSize:22, alignSelf:'center',fontFamily:'Fraunces-semibold'}}>{currentItem.title}</Text>
                <Image
                source={{
                    uri: "http://ihiapps.com:8080/wildbase/downloadFile/images/" + currentItem.image,
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + authctx.token,
                    },
                  }}
                style={{height:height*0.6,width:'100%' , resizeMode:'stretch', alignSelf:'center', borderColor:'#145C7B',marginVertical:10, borderRadius:8 ,borderWidth:1.3}}
                />
                <Text style={{color:'grey', alignSelf:'center', fontSize:15, lineHeight:20, fontFamily:'Poppins', marginBottom:5}}>{currentItem.description}</Text>
                {!requestAccess && <Text style={{fontSize:18, fontWeight:600, marginVertical:15}}>Foreword Acknowledgement</Text>}
                { accessable && 
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10, alignSelf:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Explore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Download pdf</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        role !== 'ROLE_USER' ? navigation.navigate('Quiz',{documentId: currentItem.id, documentTitle:currentItem.title}) : navigation.navigate('Quiz Management', {})
                    }}>
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
                            paddingBottom:10,
                            paddingLeft:10,
                            // flex:1,
                            fontFamily:'Poppins',
                            backgroundColor:'white',
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
                        <TouchableOpacity style={styles.button} onPress={() =>{!currentItemAccessData.isRequestAccessSent && requestAccess()}}>
                        <Text style={styles.buttonText}>{currentItemAccessData.isRequestAccessSent ? 'Request Sent': 'Request Access' }</Text>
                        </TouchableOpacity>
                    </View>
                }
                
                </View>
        </ScrollView>
        </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonText:{
        marginVertical:10,
        textAlign:'center',
        color:'white',
        fontWeight:700,
        fontFamily:'Poppins'
    },
    button:{
        minWidth:width*0.4,
        backgroundColor:'#145C7B',
        margin:height*0.005,
        borderRadius:8,
        fontFamily:'Poppins'
    }
})