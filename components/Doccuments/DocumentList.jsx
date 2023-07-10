import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { doclist } from '../Objects';
import DocumentItem from './DocumentItem';
import { useNavigation } from '@react-navigation/native';
import { getCountries, getDocumentsByUserID, getFlags } from '../../util/documentApis';
const { width, height } = Dimensions.get('window');
const docslist = doclist;
import { AuthContext } from '../../store/auth-context';
import { DocContext } from '../../store/doc-context';
import LoadingOverlay from '../ui/LoadingOverlay';

export default function DocumentList({route,navigation}) {

	const authctx = useContext(AuthContext);
	const docContext = useContext(DocContext);
	const [isFetching, setIsFetching] = useState(false);

    let countriesList =  [{name: 'All'},...docContext.countries];
	let AllDocuments = docContext.docs;
	let [documentsList, setDocumentsList] = useState(AllDocuments);

	useEffect(() =>{
		async function fetchDocuments() {
			setIsFetching(true)
			try {
				let documents = await getDocumentsByUserID(authctx.userId, authctx.token)
				let countries = await getCountries();
				// let flags =await getFlags(documents.map(doc => doc.flagPath), authctx.token);
				// console.log(flags)
				docContext.storeCountries(countries);
				setDocumentsList(documents);
				docContext.storeDocs(documents);
			} catch (error) {
				console.log('error is', error)
				Alert.alert('Error', 'Unable to fetch documents')
			}
			setIsFetching(false)	
		}

		fetchDocuments()
	},[route,navigation])

	function onSelectCountry(country) {
		let tempDocs = AllDocuments.filter(document =>{
			return document.country == country.name
		})
		if(country.name == 'All'){
			setDocumentsList(AllDocuments)
		} else {
			setDocumentsList(tempDocs);
		}
	}
	
	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
		<ScrollView style={{ marginBottom:12, paddingLeft:10}}
		horizontal={true}
		showsHorizontalScrollIndicator={false}>
			{
				countriesList.map(country=>{
					return (
						<TouchableOpacity style={styles.button} onPress={() =>{onSelectCountry(country)}} key={country.name}>
							<Text style={{fontWeight:500,color:'#2C160C', marginVertical:10, marginHorizontal:20 ,height:20}}>{country.name}</Text>
						</TouchableOpacity>
					)
				})
			}
		</ScrollView>

		<FlatList
		style={{paddingHorizontal:10, }}
		data={documentsList}
		keyExtractor={(item)=>item.id}
		renderItem={({item})=> <DocumentItem item={item} navigation={navigation}/>
		}
		/>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        paddingBottom:height*0.07
    },
    button: {
        backgroundColor:'#2C9CCC99',
        borderRadius:20,
        marginHorizontal:5,
        minWidth:50,
        textAlignVertical:'center',
        textAlign:'center'
        // paddingVertical:10,
        // paddingHorizontal:20,
    }
})