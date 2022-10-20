//import react and useState hook
import React, {useState} from 'react';
//import View, StyleSheet, Text, TextInput, Image, TouchableOpacity components
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';
//import StyledButton from '../StyledButton';
import StyledButton from '../Components/StyledButton'
//imports useNavigation hook
//useNavigation is a hook which gives access to navigation object
import { useNavigation } from '@react-navigation/core'
import CustomButton from '../Components/CustomButton'

 //construct constant variable HomeScreen that can navigate to other screeens
const HomeScreen = () => {

    //allows navigation from/to home screen
  const navigation = useNavigation();

//create constant variable onDrive to navigate to the Drivers List
  const onDrive = () => {
    navigation.navigate('DriverList');
  }
//create constant variable onDrive to navigate to the Riders List
  const onRide = () => {
    navigation.navigate('RiderList');
  }
//create constant variable onDrive to navigate to the UserInfo Screen
  const onUserDetail = () => {
    navigation.navigate('UserInfo');
  }

  const onCreateNewRide  = () => {
    navigation.navigate('RideShare');
  }


//create View container that will hold the style and format of the homepage
  return(
    <View style = {styles.homecontainer}>

    {/*constructs button to navigate to the user profile*/}
      <TouchableOpacity onPress={onUserDetail}>
        <Image source={require('../assets/images/Profile.png')} style={styles.profileImage}/>
      </TouchableOpacity>
      {/*dispays Coyote Carpool Logo*/ }
      <Image style={styles.image} source={require('../assets/images/Logo.png')} />
        {/*Displays "Why Coyote Carpool" */}
      <Text style = {styles.subtitle}>Why Coyote Carpool?</Text>
      {/*Displays "Convenient" */}
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Convenient</Text>
        {/* Displays MapLogo */}
        <Image style={styles.imageList} source={require('../assets/images/MapLogo.png')}/>        
      </View>
      {/*Displays "Save Gas" */}
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Save Gas</Text>
        {/*Displays Gas Image*/}
        <Image style={styles.imageList} source={require('../assets/images/Gas.png')}/>
      </View>
      {/*Displays "Make Friends"*/}
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Make Friends</Text>
        {/*Displays Friends Image */}
        <Image style={styles.imageList} source={require('../assets/images/Friends.jpg')}/>
      </View>

        {/*Displays text "Would you like to Drive or Ride?" */}
      <Text style = {styles.question}>Would You Like to Drive or Ride?</Text>

        {/*Create button container */}
      <View style={styles.buttonsContainer}>

        {/*display drive button */}
        <StyledButton  
          type="primary" 
          content={"Drive"} 
          onPress={onDrive}
        />
        {/*display ride button */}
        <StyledButton 
          type="secondary" 
          content={"Ride"} 
          onPress={onRide}
        />
      </View>

      <View style={{
        alignItems: 'center',
        width: '87%',
        paddingBottom: 100,
      }}>
      <TouchableOpacity
            onPress={RequestPage}
            style={styles.button}rr
        >
            <Text style={styles.buttonText}>New Ride</Text>
        </TouchableOpacity>
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
      top: 15,
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

export default HomeScreen;
