import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image, TouchableOpacity} from 'react-native';
//import styles from './styles';
//import StyledButton from '../StyledButton';
import StyledButton from '../Components/StyledButton'
import { useNavigation } from '@react-navigation/core'
import CustomButton from '../Components/CustomButton'
import RequestPage from './RequestPage';

const S_Home = () => {
  
  const navigation = useNavigation();

  const onDrive = () => {
    navigation.navigate('RequestPage');
  }

  const onRide = () => {
    navigation.navigate('S_RiderList');
  }

  const onUserDetail = () => {
    navigation.navigate('S_UserInfo');
  }

  const onCreateNewRide  = () => {
    navigation.navigate('Request');   //navigate to RequestPage
  }


  return(
    <View style = {styles.homecontainer}>
      <TouchableOpacity onPress={onUserDetail}>
        <Image source={require('../assets/images/Profile.png')} style={styles.profileImage}/>
      </TouchableOpacity>
      
      <Image style={styles.image} source={require('../assets/images/Logo.png')} />

      <Text style = {styles.subtitle}>Why Coyote Carpool?</Text>
      
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Convenient</Text>
        <Image style={styles.imageList} source={require('../assets/images/MapLogo.png')}/>        
      </View>
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Save Gas</Text>
        <Image style={styles.imageList} source={require('../assets/images/Gas.png')}/>
      </View>
      <View style = {styles.buttonsContainer}>
        <Text style={styles.list}>Make Friends</Text>
        <Image style={styles.imageList} source={require('../assets/images/Friends.jpg')}/>
      </View>


      <Text style = {styles.question}>Would You Like to Drive or Ride?</Text>

       
      {/*<View style={styles.buttonsContainer}>
        <StyledButton 
          type="primary" 
          content={"Drive"} 
          onPress={onDrive}
        />
        <StyledButton 
          type="secondary" 
          content={"Ride"} 
          onPress={onRide}
        />
      </View>*/}

      <View style={{
        alignItems: 'center',
        width: '87%',
        paddingBottom: 100,
      }}>
      <TouchableOpacity
            onPress={RequestPage}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  homecontainer: {
      backgroundColor: '#213B62',
      flex: 1,
      alignItems: 'center',
    },
    subtitle: {
      bottom: 25,
      fontSize: 16,
      color: '#FFF',
    },
    question: {
      top: 15,
      fontSize: 16,
      color: '#FFF',
    },
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
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200,
      color: '#DDD',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50/2,
      top: 10,
      left: 150,
    },
    image: {
      bottom: 40,
      width: 250,
      height: 250,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    imageList: {
      width: 50,
      height: 50,
      left: 25,
      bottom: 20,
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

export default S_Home;
