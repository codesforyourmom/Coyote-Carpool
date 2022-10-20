//import React and component from reeact
import React, { Component } from "react";
//import  View, Text, StyleSheet, ActivityIndicato from react-native
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
//import firebase
import firebase from '../firebase'
//import Dashboard from "./Dashboard";
//import Google from "./Google";

//Component that loads while system
//authorizes if the user is logged in or not
//checks user account info through firebase
//lines 14 - 42
class Loading extends Component{
    
    componentDidMount() {
        this.checkIfLoggedIn();
    }
    

    checkIfLoggedIn = () => {
        firebase.auth.onAuthStateChanged(function(user) 
        {
            if(user) {
                this.props.navigation.navigate('Dashboard');
            } else {
                this.props.navigation.navigate('Google');
            }
        }.bind(this)
        );
    };

    render() {
        return (
            <View style={StyleSheet.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

export default Loading;

//styles loading container
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});