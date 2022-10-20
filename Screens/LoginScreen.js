//import Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View components from react-native
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
//import react and react components (useEffect, useState, Component, useContext) from react
import React, { useEffect, useState, Component, useContext } from 'react'
//import authentification from firebase
import { auths } from '../firebase'
//imports useNavigation hook from react navigation
import { useNavigation } from '@react-navigation/core'
//imports logo from assets folder
import Logo from '../assets/images/Logo.png';
//import auth from react-native firebase
import auth from '@react-native-firebase/auth';
//impors firestore
import firestore from '@react-native-firebase/firestore';
//import { GoogleSignin , GoogleSigninButton, statusCodes, }
//from '@react-native-google-signin/google-signin'
import {GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

//Create Login Screen
const LoginScreen = () => {

  //creates email container that user can write email into which will be
  //confirmed by google api and firestore auth
  const [email, setEmail] = useState('')

  //creates password container that user can write password into which will be
  //confirmed by google api and firestore auth
  const [password, setPassword] = useState('')

  //set user account status to signed in
  const [isSignedIn, setIsSignedIn] = useState(false);

  //set to conform user info
  const [userInfoEmail, setuserInfoEmail] = useState([])

  //allows navigation to/from login screen
  const navigation = useNavigation()
  
  //screen height = screen window dimensions
  const {height} = useWindowDimensions();

  //const userInfo= [];

  //useEffect to check if user is allready subscribed
  //if user is allready subscribed to user will be 
  //navigated to the the Home page
  useEffect(() => {
    const unsubscribe = auths.onAuthStateChanged(user => {
      if(user) {
        navigation.replace("S_Home")
      }
    })
    return unsubscribe
  }, [])

  const SignInWithGoogle = async () => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: '644690513510-18ih9jsm1kak0uqqclrm4docbh0jqiaq.apps.googleusercontent.com',
      offlineAccess: true,
      //hostedDomain: '',
      //loginHint: '',
      //forceCodeForRefreshToken: true,
      //accountName: '',
      //iosClientId: '644690513510-garnn4qmdbu7bml8c6l4c1fu065ojlus.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo });
  
      console.log("userInfo", userInfo)
      console.log("userEmail", userInfo.user.email)
      //setuserInfo{userInfo.user.email}
      
      firestore()
      .collection('G-users')
      .doc('Gmail')
      .update({
        email: userInfo.user.email,
      })
      .then(() => {
        console.log('User Updated!');
      });
      return true;
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //user cancelled
        errorMessage = 'The sign-in prompt was manually cancelled.';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //operation is in progress
        errorMessage = 'An instance of the Google-sign prompt already exists.';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //Google Play services not available
        errorMessage = 'Google Play, a necessary component of the Google sign-in function, is not supported on this device.'
      } else {
        //other error
        errorMessage = 'An unexpected error occurred.'
      }
      Alert.alert(
        'ERROR',
        errorMessage + '\n(Error Code ' + error.code + ')',
        [{
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }],
        {cancelable: true}
      );
    }
    return false;
  };
  
  const GoogleLogin = async () => {
    const signinSuccess = await SignInWithGoogle();
    if (signinSuccess) {
      navigation.navigate('SecurityCheck');
    };
  };
  
  const GoogleSignUp = async () => {
    const signinSuccess = await SignInWithGoogle();
    if (signinSuccess) {
      navigation.navigate('Register');
    };
  };

  return (
    // KeyboardAvoidingView so that whenever the keyboard opens,
    // your fields in focus will be lifted upward to appear above the keyboard.
    <KeyboardAvoidingView
      style = {styles.container}
      behavior = "padding"
    >
      {/*Displays and formats Coyote Carpool Logo */}
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />

      {/*Displays "Coyote Carpool" */}
      <Text style = {styles.title}>Coyote Carpool</Text>
        {/*Displays a text input container that reads "Email" as a placeholder
        until user replaces placeholder with coyote.csusb.edu email*/}
      <View style = {styles.inputContainer}>
        <TouchableOpacity
          onPress={GoogleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login With CSUSB Gmail Account</Text>
        </TouchableOpacity>
      </View>
      <Text style = {styles.text}> -OR- </Text>
      <View style={styles.inputContainer}>
        {/* Touchable Opacity is a wrapper for making the Google Login
        feature button respond properly to touches */}
        <TouchableOpacity
          onPress={GoogleSignUp}
          style={styles.button}
        >
          {/*Display "Sign Up With Google button" */}
          <Text style={styles.buttonText}>Sign Up With CSUSB Gmail Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

//Create constant style variable to style Login Screen
const styles = StyleSheet.create({
    //background color and alignment
    container:{
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#213B62',
    },
    //text format and placement
    text: {
        fontSize: 25,
        fontWeight: '700',
        color: '#0782F9',
        //width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //logo format and placement
    logo:{
        width : '100%',
        maxWidth: 300,
        height: 100,
    },
    //inputContainer format and placement
    inputContainer: {
        width: '100%',
        marginTop: 5,
    },
    //input format and placement
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    //buttonContainer format and placement
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    //button format and placement
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    //buttonOutline format and placement
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    //buttonText format and placement
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    //buttonOutlineText format and placement
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    //title format and placement
    title: {
      fontSize: 30,
      fontWeight: '700',
      color: '#FFF',
    },
})

//exports LoginScreen
export default LoginScreen
