import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { SvgUri } from 'react-native-svg'
import { DocContext } from '../../store/doc-context'
const { width, height} = Dimensions.get('window')
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function CertificateItem() {
  const shareIcon = require('../../assets/share-line-icon.png')
  const emailIcon = require('../../assets/envelope-line-icon.png')
  const downloadIcon = require('../../assets/download-icon.png')
  return(
  <View style={{ justifyContent:'space-between',borderColor:'#08B783', borderWidth:1, borderRadius:8, width:'100%', height:height*0.15, marginVertical:height*0.01, paddingHorizontal:width*0.04, paddingVertical:width*0.01}}>
    <Text style={{backgroundColor:'white', fontSize:20,fontWeight:'bold',}}>Basic Fundamentals of wildlife in Kenya</Text>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{textAlignVertical:'center'}}>12 July 2023</Text>
      <View style={{flexDirection:'row', backgroundColor:'white', width:'45%', justifyContent:'space-evenly'}}>
      
      
      

      <TouchableOpacity><EvilIcons name="share-google" size={44} color="black" /></TouchableOpacity>
      <TouchableOpacity><EvilIcons name="envelope" size={44} color="black" /></TouchableOpacity>
      <TouchableOpacity><Ionicons name="cloud-download-outline" size={34} color="black" /></TouchableOpacity>
      </View> 
    </View>
  </View>
  )
  
}

export default function Certificates() {
  const data = [1,2,3,4,5,6,7,8,9]
  return (
    <View style={{paddingHorizontal:width*0.02, backgroundColor:'white'}}>
      <FlatList
      data={data}
      keyExtractor={item=>item}
      renderItem={CertificateItem}
      showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon:{
    width:height*0.049, 
    height:height*0.034,
    margin:10,
  }
})