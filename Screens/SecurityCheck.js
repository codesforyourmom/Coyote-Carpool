import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState, Component, useContext } from 'react'
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { auths } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import Logo from '../assets/images/Logo.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
//import { GoogleSignin } from '@react-native-google-signin/google-signin'

export let tempid = '';

const SecurityCheck = () => {

  const [csusbid, setcsusbid] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigation = useNavigation()

  const {height} = useWindowDimensions();

  //const userInfo= [];

  tempid = csusbid;

  
useEffect (() => {
    const subscriber = firestore()
      .collection('G-users')
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
  
  const temp = users.map(({email}) => `${email}`).join('');
  //setEmail(temp)

  const handleSignin = () => {
    setEmail(temp)
    console.log('sign in email:', email)
    console.log('Sign in Password:', password)
    auths
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          setIsSignedIn(true)
      })
      .catch(error => console.warn(error.message))

      navigation.navigate('S_Home')
  }   

  
  return (
    <KeyboardAvoidingView
        style = {styles.container}
        behavior = "padding"
    >
    
       <Text style = {styles.title}>Security Check</Text>
       <Text style = {{
         fontSize: 15,
         fontWeight: '700',
         color: '#FFF',
         textAlign: 'center',
       }}>Please Enter Your Password and CSUSB ID to Continue Signing In</Text>

      <View style = {styles.inputContainer}>
        <TextInput
            placeholder = "CSUSB ID"
            value = {csusbid}
            onChangeText = {text => setcsusbid(text)}
            style = {styles.input}
        />
        <TextInput
            placeholder = "Password"
            value = {password}
            onChangeText = {text => setPassword(text)}
            style = {styles.input}
            secureTextEntry
        />

        <TouchableOpacity
            onPress={handleSignin}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
      </View>

    </KeyboardAvoidingView>
  )
}

export default SecurityCheck

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#213B62',
    },
    text: {
      fontSize: 25,
      fontWeight: '700',
      color: '#0782F9',
      //width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:{
        width : '100%',
        maxWidth: 300,
        height: 100,
    },
    inputContainer: {
        width: '100%',
        marginTop: 5,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
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
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: '700',
      color: '#FFF',
    },
})