import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import UserItem from './UserItem';
import { DocContext } from '../../store/doc-context';
import {getUsersFunction} from '../../util/adminApis'
import { AuthContext } from '../../store/auth-context';
const { width, height } = Dimensions.get('window');


export default function Users() {
	const docContext = useContext(DocContext);
    const authctx = useContext(AuthContext)
    let countriesList =  [{name: 'All'},...docContext.countries];

    const [users, setusers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [noMoreUsers,setNoMoreUsers] = useState(false);
    const [currentCountry, setCurrentCountry] = useState('All');

    useEffect(() =>{
        async function getUsers() {
            try{
                let newUsers = await getUsersFunction(currentPage,10,authctx.token);
                if(newUsers.length ==0){
                    setNoMoreUsers(true);
                }
                console.log('new users are', newUsers.length)
                let tempUsers = newUsers.filter(user =>{
                    return user.country == currentCountry
                })
                if(currentCountry == 'All'){
                    tempUsers = newUsers
                }
                if(currentPage==0){
                    setusers([...users, ...tempUsers])
                } else {
                    setusers((prevUsers) => [...prevUsers, ...tempUsers]);
                }
                console.log('set', users.length)
            } catch(error) {
                console.log('error in getting users', error)
            }
        }
        getUsers()
    },[currentPage,currentCountry])

    function renderLoader() {
        return !noMoreUsers && (
            <View style = {{marginVertical:16, alignItems:'center'}}>
                <ActivityIndicator size = "large" color = "#aaa" />
            </View>
        )
    }

    function loadMoreItem() {
        console.log('loading more items')
        setCurrentPage(currentPage + 1)
    }

    function onSelectCountry(country) {
        setCurrentCountry(country.name);
        setCurrentPage(0);
        setusers([]);
	}

    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom:12, paddingLeft:10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
          {
              countriesList.map(country=>{
                if(country.name==currentCountry){
                    return (
                        <TouchableOpacity style={styles.selectedCountryButton} onPress={() =>{onSelectCountry(country)}} key={country.name}>
                            <Text style={{fontWeight:500,color:'white', marginVertical:10, marginHorizontal:20 ,height:20}}>{country.name}</Text>
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <TouchableOpacity style={styles.button} onPress={() =>{onSelectCountry(country)}} key={country.name}>
                            <Text style={{fontWeight:500,color:'#2C160C', marginVertical:10, marginHorizontal:20 ,height:20}}>{country.name}</Text>
                        </TouchableOpacity>
                    )
                }
              })
          }
        </ScrollView>

        <FlatList
        style={{paddingHorizontal:10}}
        data={users}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => <UserItem item={item} />}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}

        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
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
    },
    selectedCountryButton:{
		backgroundColor:'#145C7B',
        borderRadius:20,
        marginHorizontal:5,
        minWidth:50,
        textAlignVertical:'center',
        textAlign:'center',
	}
})