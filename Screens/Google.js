//imports react, component and fragment from react
import React, { Component, Fragment } from "react";
//import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image,} from 'react-native';
//import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

//import GoogleSignin, GoogleSigninButton, statusCodes from react-native-community/google-signin
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';


//export class component from Google
export default class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false
    }
  }

  //lines 22-38
  //configures GoogleSignin compononets 
  //through client 1d verification
  componentDidMount() {
    GoogleSignin.configure({
      //webClientId: 'YOUR_WEB_CLIENT_ID_HERE', 
      //offlineAccess: true, 
      //hostedDomain: '', 
      //forceConsentPrompt: true,
      
      scopes: [],
      webClientId: '644690513510-18ih9jsm1kak0uqqclrm4docbh0jqiaq.apps.googleusercontent.com',
      offlineAccess: true,
      //hostedDomain: '',
      //loginHint: '',
      //forceCodeForRefreshToken: true,
      //accountName: '',
      iosClientId: '644690513510-garnn4qmdbu7bml8c6l4c1fu065ojlus.apps.googleusercontent.com',
    });
  }
  //lines 44-60
  //google sign in function
  //sign in if user info and log in is correct
  //and play services are availiable
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  
  //lines 64-77
  //syncs user account with google sign in feature
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };

  //80-89
  //function to sign out google user.
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
};