
//import react and useState hook
import React, {useState} from 'react';
//import View, StyleSheet, Text, TextInput, Image, TouchableOpacity components
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';
//import StyledButton from '../StyledButton';
import StyledButton from '../Components/StyledButton/index'
//imports useNavigation hook
//useNavigation is a hook which gives access to navigation object
import { useNavigation } from '@react-navigation/core'
import CustomButton from '../Components/CustomButton/index'
import LongButton from '../Components/LongButton/index';
import GetLocation from 'react-native-get-location'
 //construct constant variable HomeScreen that can navigate to other screeens
const RequestPage = () => {

    //allows navigation from/to home screen
  const navigation = useNavigation();

//create constant variable onDrive to navigate to the Drivers List
  const onDrive = () => {
    navigation.navigate('S_DriverList');
  }
//create constant variable onDrive to navigate to the Riders List
  const onRide = () => {
    navigation.navigate('S_RiderList');
  }
//create constant variable onDrive to navigate to the UserInfo Screen
  const onUserDetail = () => {
    navigation.navigate('S_UserInfo');
  }

  const onCreateNewRide  = () => {
    navigation.navigate('S_Home');
  }


//create View container that will hold the style and format of the homepage
  return(
    <View style = {styles.homecontainer}>

    {/*constructs button to navigate to the user profile*/}
      {/*<TouchableOpacity onPress={onUserDetail}>
        <Image source={require('../assets/images/Profile.png')} style={styles.profileImage}/>
  </TouchableOpacity>*/}
      {/*dispays Coyote Carpool Logo*/ }
      <Image style={styles.image} source={require('../assets/images/Logo.png')} />
        {/*Displays "Why Coyote Carpool" */}
      <Text style = {styles.subtitle}>Please Choose From the Following</Text>

        {/*Create button container */}
      <View style={styles.buttonsContainer}>

        {/*display drive button */}
        <StyledButton  
          type="primary" 
          content={"Given Address"} 
          onPress={onDrive}
        />
        <Text style = {styles.question}>OR</Text>
        {/*display ride button */}
        <StyledButton 
          type="secondary" 
          content={"Current Location"} 
          onPress={onRide}
        />
      </View>

      <View style={{
        alignItems: 'center',
        width: '87%',
        paddingBottom: 100,
      }}>
        <View style={styles.buttonsContainer1}>

        {/*display drive button */}
        <StyledButton  
            type="secondary" 
            content={"Drive"} 
            onPress={onDrive}
        />
        <Text style = {styles.question}>OR</Text>
        {/*display ride button */}
        <StyledButton 
            type="primary" 
            content={"Ride"} 
            onPress={onRide}
        />
        </View>

      {<TouchableOpacity
        onPress={onCreateNewRide}
        style={styles.button}
      >
            <Text style={styles.buttonText}>Home Page</Text>
        </TouchableOpacity>}
      </View>

    </View>
  );
};
//Create constant style variable to style homepage
const styles = StyleSheet.create({
  homecontainer: {
      backgroundColor: '#213B62', //backrounds color and alignment
      flex: 1,
      alignItems: 'center',
    },
    //subtitle format and screen placement
    subtitle: {
      bottom: 25,
      fontSize: 16,
      color: '#FFF',
    },
    //question format and screen placement
    question: {
      top: 25,
      fontSize: 16,
      color: '#FFF',
    },
    //list format and screen placement
    list: {
      width: 125,
      borderWidth: 3,
      borderColor: '#096DC6',
      color: '#FFF',
      padding: 8,
      borderRadius: 10,
      right: 45,
      textAlignVertical: 'center',
      textAlign: 'center',
      bottom: 20,
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

    //profile image format and screen placement
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50/2,
      top: 10,
      left: 150,
    },

    //image format and screen placement
    image: {
        marginTop: 35,
      bottom: 40,
      width: 250,
      height: 250,
      resizeMode: 'contain',
      alignSelf: 'center',
    },

    //imageList format and screen placement
    imageList: {
      width: 50,
      height: 50,
      left: 25,
      bottom: 20,
    },

    //buttons container format and screen placement
    buttonsContainer1:{
        marginTop: 25,
        flexDirection: 'row',
      },
    buttonsContainer:{
      marginTop: 15,
      flexDirection: 'row',
    },
    button: {
      backgroundColor: '#096DC6',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
      marginTop: 100,
      alignItems: 'center',
  },
  buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
  },
});

export default RequestPage;
