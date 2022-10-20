// imports React and useState, Component, useEffect components from react
import React, {useState, Component, useEffect} from 'react';
//imports View, Text, TextInput, Image, StyleSheet, ActivityIndicator components from react-native
import {View, Text, TextInput, Image, StyleSheet, ActivityIndicator} from 'react-native';
//imports LongButton components
import LongButton from '../Components/LongButton';
//import useNavigation hook
import { useNavigation } from '@react-navigation/core'
//import authentification from firebase
import { auth } from '../firebase'
//import GoogleSignin, GoogleSigninButton, statusCodes from google
import {GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
//import firestore from firebase
import firestore from '@react-native-firebase/firestore';
//import flatList feature
import { FlatList } from 'react-native-gesture-handler';

//create UserDetail screen
const UserDetail = () => {
  //screen accesible if signed in
  const [isSignedIn, setIsSignedIn] = useState(false);
  //allows navigation to and from the UserDetail screen
  const navigation = useNavigation();
  //allows users to be passed to screen
  const [users, setUsers] = useState([]);
  //allows screen loading view
  const [loading, setLoading] = useState(true);

  //const data = 'Test123';

  //useEffect accesses user database in the firestore
  //and return data to UserDetail screen
  useEffect (() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if(loading){
    return <View style={{
      justifyContent: 'center',
      backgroundColor: '#213B62',
      flex: 1,
  }
  }><ActivityIndicator size="large" color= 'white'/></View>;
  }

  //if user no longer signed in, Sign in option will be displayed
  const onDrive = () => {
    //navigation.navigate('');
    console.warn('Sign in');
  }

``//button feature for user to sign out successfully
  //and upon sign out navigates to the log in screen
  const Logout =  async () => {
    auth.signOut().then(() => {
      console.log('User Signed Out Successfully!');
    }).catch(e => Alert.alert('Error', e.message));
    navigation.navigate('Login');
  };

    //varible that swith true logged in user
    //to false logged out user
  const HandleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
      setIsSignedIn(false)
  }

  return(

    //create UserDetail screen to insert index contents and components
    //create View container
    <View style = {styles.homecontainer}>
        {/*Display text "Profile" */}
          <Text style={styles.title}>Profile</Text>
        {/*Displays profile image */}
        <Image style={styles.image} source={require('../assets/images/Profile.png')} />
        {/*Displays text "temp" */}
          <Text style = {styles.title}> temp </Text>
        
      
        {/*Display FlatList feature the user data will be displayed in */}
       <FlatList
        data={users}
        renderItem={({ item }) => (
        <View style = {styles.buttonsContainer}>
          <Image style={styles.image} source={require('../assets/images/Profile.png')} />
          <View style={styles.list}>
            <Text style={styles.personal}>Name: {item.username}</Text>
            <Text style={styles.personal}>From: {item.Address}</Text>
          </View>
        </View>
        )}
      />

      <View style={styles.container}>
       

        {/*enable Longbutton for Logout */}
        <LongButton 
            type="secondary" 
            content={"Logout"} 
            onPress={Logout}
        />
        {/*Enable LongButton for Home Page */}
        <LongButton 
            type="secondary" 
            content={"Home Page"} 
            onPress={() => 
              navigation.navigate('Home')}
        />
        
      </View>
        
    </View>
    
  )
}
//StyleSheet formats and margins UserDetail screen
const styles = StyleSheet.create({
  //homecontainer format and screen placement
  homecontainer: {
      backgroundColor: '#213B62',
      //marginTop: 50,
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    //title format and screen placement
    title: {
      fontSize: 30,
      color: 'white',
      fontWeight: '600',
    },
    //input format and screen placement
    input: {
      borderWidth: 1,
      borderColor: '#777',
      borderRadius: 10,
      padding: 8,
      margin: 10,
      width: '85%',
      alignSelf: 'center',
      color: '#DDD',
    },
    //image format and screen placement
    image: {
      width: 150,
      height: 150,
      borderRadius: 150/2,
      alignSelf: 'center',
    },
    //container format and screen placement
    container: {
      marginTop: 20,
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    //buttonsContainer format and screen placement
    buttonsContainer:{
      marginTop: 25,
      flexDirection: 'row',
      //width: '100%',
      width: '90%',
      //justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    //list format and screen placement
    list: {
      width: '80%',
      height: 70,
      borderWidth: 1,
      borderColor: '#999',
      color: 'white',
      padding: 8,
      borderRadius: 10,
      left: 10,
      //alignItems: 'center',
      //textAlignVertical: 'center',
      //textAlign: 'center',
    },
    //personal format and screen placement
    personal: {
      color: 'white',
      width: '100%',
      
    },
});
//export UserDetail screen
export default UserDetail;