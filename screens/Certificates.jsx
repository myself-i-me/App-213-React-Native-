import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg'

const { width, height} = Dimensions.get('window')

function CertificateItem() {
  const shareIcon = require('../assets/share-line-icon.png')
  const emailIcon = require('../assets/envelope-line-icon.png')
  const downloadIcon = require('../assets/download-icon.png')
  return(
  <View style={{ justifyContent:'space-between',borderColor:'#08B783', borderWidth:1, borderRadius:8, width:'100%', height:height*0.15, marginVertical:height*0.01, paddingHorizontal:width*0.04, paddingVertical:width*0.01}}>
    <Text style={{backgroundColor:'white', fontSize:20,fontWeight:'bold',}}>Basic Fundamentals of wildlife in Kenya</Text>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{textAlignVertical:'center'}}>12 July 2023</Text>
      <View style={{flexDirection:'row', backgroundColor:'white'}}>
      <Image
      source={shareIcon}
      style={styles.icon}
      />
      <Image
      source={emailIcon}
      style={styles.icon}
      />
      <Image
      source={downloadIcon}
      style={styles.icon}
      />
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
      keyExtractor={item=>item.id}
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