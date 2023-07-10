import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token, refreshToken) =>{},
    logout: () =>{},
    refreshToken: '',
    userId: '',
    role: '',
    setUserDetails:(userid, role) =>{},
    setHeaderTitles:(headr) =>{},
    setHeaderShowns:(bool)=>{},
    setHeaderColors:(clr)=>{}
});

function AuthcontextProvider({children}) {
    const [authToken, setAuthToken] = useState();
    const [refreshToken, setrefreshToken] = useState();

    const [userId, setUserId] = useState('');
    const [role,setRole] = useState('ROLE_USER');
    const [headerTitle, setHeaderTitle] = useState('Homes');
    const [headerColor, setHeaderColor] = useState('#145C7B');
    const [headerShown, setHeaderShown] = useState(true);

    function setHeaderTitles(headr){
        setHeaderTitle(headr)
    }

    function setHeaderColors(clr){
        setHeaderColor(clr);
    }

    function setHeaderShowns(bool){
        setHeaderShown(bool)
    }

    function authenticate(token, refreshToken) {
        console.log('*********************')
        setAuthToken(token);
        setrefreshToken(refreshToken);
        AsyncStorage.setItem('quickref_token',token);
        AsyncStorage.setItem('quickref_refresh_token',refreshToken);
        AsyncStorage.getItem('quickref_userid').then(userId =>{
            setUserId(String(userId));
        }).catch(err =>{
            console.log(err,'--')
        })
        AsyncStorage.getItem('quickref_role').then(role =>{
            setRole(role);
        })
    }

    function setUserDetails(userId, role) {
        setUserId(String(userId));
        setRole(role);
        AsyncStorage.setItem('quickref_userid',userId);
        AsyncStorage.setItem('quickref_role',role)
    }

    async function logout() {
        setAuthToken(null);
        setrefreshToken(null);
        await AsyncStorage.removeItem('quickref_token');
        await AsyncStorage.removeItem('quickref_refresh_token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout:logout,
        refreshToken: refreshToken,
        setUserDetails: setUserDetails,
        userId: userId,
        role:role,
        headerTitle:headerTitle,
        headerColor:headerColor,
        headerShown:headerShown,
        setHeaderTitles:setHeaderTitles,
        setHeaderColors:setHeaderColors,
        setHeaderShowns:setHeaderShowns
    }
    
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export default AuthcontextProvider;