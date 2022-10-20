// import react and useState, useEffect components from react
import React, {useState, useEffect} from 'react';
//import View, StyleSheet, Text, TextInput, Image, ActivityIndicator components from react-native
import {View, StyleSheet, Text, TextInput, Image, ActivityIndicator} from 'react-native';
//import LongButton from Components
import LongButton from '../Components/LongButton';
//import SmallButton from Components
import SmallButton from '../Components/SmallButton';

//import useNavigation 
import { useNavigation } from '@react-navigation/core'
//import firestore
import firestore from '@react-native-firebase/firestore';
//import FlatList
import { FlatList } from 'react-native-gesture-handler';

//create constant variable RiderList Page
const RiderList = () => {
  //allows navigation to and from RidersList
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true); //loads request
    const [users, setUsers] = useState([]);     //points to users
        //gets users information from firebase ????
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
      return <ActivityIndicator size="large"/>;
    
    }
    //navigates to home screen
  const onHome = () => {
    navigation.navigate('Home');
  }

  return(

    //create Drivers screen to insert index contents and components
    <View style = {styles.homecontainer}>
      {/*Displays "Looking for a Ride */}
      <Text style = {styles.title}>Looking For a Ride</Text>
      {/* Flatlist () Displays list of users who are looking for a ride  */}
      {/* data type displayed is users and in buttonsContainer style */}
      <FlatList
        data={users}
        renderItem={({ item }) => (
        <View style = {styles.buttonsContainer}>
          {/*Displays Profile Image */}
        <Image style={styles.profileImage} source={require('../assets/images/Profile.png')}/>
          {/*Displays Users data (username and address) in list style */}
          <View style={styles.list}>
            <Text style={styles.personal}>Name: {item.username}</Text>
            <Text style={styles.personal}>From: {item.Address}</Text>
          </View>
        </View>
        )}
      />
        {/*Display "Home Page" button, longButton type in buttonsContainer style */}
      <View style={styles.buttonsContainer}>
        <LongButton 
          type="secondary" 
          content={"Home Page"} 
          onPress={onHome}
        />
      </View>
      
    </View>
  )
}
//StyleSheet formats and margins RiderList screen
const styles = StyleSheet.create({
  //home container format and screen placement
    homecontainer: {
        backgroundColor: '#213B62',
        flex: 1,
        alignItems: 'center',
      },
      //title format and screen placement
      title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFF',
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
      //input format and screen placement
      input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        color: '#DDD',
      },
      //profileImage format and screen placement
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        //right: 10,
        top: 5,
      },
      //image format and screen placement
      image: {
        bottom: 40,
        width: 250,
        height: 250,
        borderRadius: 250/2,
        alignSelf: 'center',
      },
      //imageList format and screen placement
      imageList: {
        width: 50,
        height: 50,
        left: 25,
        bottom: 20,
      },
      //adjust screen
      adjust: {
        top: 100,
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
      //buttonStyle format and screen placement
      buttonStyle:{
        marginTop: 25,
        flexDirection: 'row',
        //width: '100%',
        width: '90%',
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
});
//exports RiderList
export default RiderList;