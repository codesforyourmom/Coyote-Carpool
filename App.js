import React from 'react'; //imports react-native library
import { StyleSheet, Text, View } from 'react-native'; //imports stylesheet, text, view components from react-native
import { NavigationContainer } from '@react-navigation/native'; //imports Navigation container
//Stack Navigator provides a way for your app to transition between
//screens where each new screen is placed on top of a stack
//imports stack navigation container that will allow App.js to
// import all components/pages to create a full stack navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import Register from './Screens/Register';
import Loading from './Screens/Loading';
import UserInfo from './Screens/UserInfo';
import UserEdit from './Screens/UserEdit';
import RiderList from './Screens/RiderList';
import DriverList from './Screens/DriverList';
import RideShare from './Screens/RideShare';
import Request from './Screens/RequestPage';      
//S
import S_Home from './Screens/S_Home';
import S_UserEdit from './Screens/S_UserEdit';
import S_UserInfo from './Screens/S_UserInfo';
import SecurityCheck from './Screens/SecurityCheck';
import S_RiderList from './Screens/S_RiderList';
import S_DriverList from './Screens/S_DriverList';
import S_RideShare from './Screens/S_RideShare';

import RequestPage from './Screens/RequestPage';
const Stack = createNativeStackNavigator(); //construct Stack a NativeStackNavigator

export default function App() { //exports the Application
  return (

   // This Stack Navigation container adds the Login,Loading, Home, 
   //Register, UserInfo, UserEdit, RiderList, and DriveList to the 
   //StackNavigator Naviagation Container
   //which allows user to navigate to the various screen
   <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Request" component={Request}/>    
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="UserEdit" component={UserEdit} />
        <Stack.Screen name="RiderList" component={RiderList} />
        <Stack.Screen name="DriverList" component={DriverList} />
        <Stack.Screen name="RideShare" component={RideShare} />
        <Stack.Screen name="SecurityCheck" component={SecurityCheck} />
        <Stack.Screen name="S_Home" component={S_Home} />
        <Stack.Screen name="S_UserInfo" component={S_UserInfo} />
        <Stack.Screen name="S_UserEdit" component={S_UserEdit} />
        <Stack.Screen name="S_RiderList" component={S_RiderList} />
        <Stack.Screen name="S_DriverList" component={S_DriverList} />
        <Stack.Screen name="S_RideShare" component={S_RideShare} />
        <Stack.Screen name="RequestPage" component={RequestPage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>
</Stack.Navigator>
</NavigationContainer>
//Format style of Navigation container
const styles = StyleSheet.create({
items:{ 
  justifyContent: 'center',
  },
});
