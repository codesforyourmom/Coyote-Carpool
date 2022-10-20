//import React and useState, useEffec components from react
import React, {useState, useEffect} from 'react';
//import View,styleSheet,Text, TextInput, Image, ActivityIndicator, TouchableOpacity components
import {View, StyleSheet, Text, TextInput, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
//imports LongButton Component
import LongButton from '../Components/LongButton';
//imports SmallButton Component
import SmallButton from '../Components/SmallButton';
//import useNavigation hook
import { useNavigation } from '@react-navigation/core'
//import firestore from firebsae
import firestore from '@react-native-firebase/firestore';
//import FlatList feature
import { FlatList } from 'react-native-gesture-handler';
//import useRoute hook
import { useRoute } from '@react-navigation/native';
//import auth from firebase
import { auths } from '../firebase';
//import CustomButton components
import CustomButton from '../Components/CustomButton'
import { Register, tempid } from './Register'
import { GoogleSignin } from '@react-native-community/google-signin';

export let usertemp = [];


//create UserInfo screen
const UserInfo = () => {
  //allows navigation to and from screen
  const navigation = useNavigation()
  //displays loading when app is loading
  const [loading, setLoading] = useState(true);
    //gets/sends user info from/to firebase
    const [users, setUsers] = useState([]);
    //gets/sends userid from/to firebase
    const [userid, setUsersid] = useState([]);
      
    //const usercid = firestore().collection('id').doc('CSUSBID').get();
    //const userkey = route.params.id
    const userkey = tempid;
    console.log(userkey)

    useEffect (() => {
      const subscriber = firestore()
      .collection('users')
      .where('ID', '==', userkey)
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
      
      //const userkey = userid.map(({id}) => `${id}`).join('');

    if(loading){
      return <View style={{
        justifyContent: 'center',
        backgroundColor: '#213B62',
        flex: 1,
    }
    }><ActivityIndicator size="large" color= 'white'/></View>;
    }

  usertemp = Object.assign([], users);
  console.log('Usertemp from info Page:',usertemp)

    //allows navigation to home screen
  const onHome = () => {
    navigation.navigate('Home');
  }
    //allows navigation to UserEdit Screen
  const onEdit = () => {
    navigation.navigate('UserEdit')
  }
  //displays and authorizes Logout Button and
  //displays a signout message and navigates to Login screen
  const Logout = async () => {
    auths.signOut().then(() => {
      console.log('User Signed Out Successfully!');
    }).catch(e => Alert.alert('Error', e.message));

    try{
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch(error){
      console.error(error);
    }

    navigation.navigate('Login');
  };

  return(

    //create view container thaat will hold the data and 
    //components of the User Info screen
    <View style = {styles.homecontainer}>
      {/*Displays text "User Info" */}
      <Text style = {styles.title}>User Info</Text>

        {/*The FlatList component displays the similar 
        structured data in a scrollable list. 
       The FlatList Displays user info elements on the screen.*/}
      <FlatList
        data={users}
        renderItem={({ item }) => (
        <View >
          <View >
            {/*format new row */}
          <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/* Display "Name: username" */}
            <Text style={styles.text}>Name: {item.username}</Text>
            </View>
             {/*format new row */}
            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*Displays ID: CSUSB STUDENT ID */}
            <Text style={styles.text}>ID: {userkey}</Text>
            </View>
              {/*format new row */}
            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Students Email */}
            <Text style={styles.text}>Email: {item.email}</Text>
            </View>
              {/*format new row */}
            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/* Displays "City: students city" */}
            <Text style={styles.text}>City: {item.Address}</Text>
            </View>
              {/*format new row */}
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Monday class schedule Start time to End time */}
            <Text style={styles.text}>Monday From: {item.MondayStart}</Text>
            <Text style={styles.text}>to {item.MondayEnd}</Text>
            </View>
              {/*format new row */}
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Tuesday class schedule Start time to End time */}
            <Text style={styles.text}>Tuesday From: {item.TuesdayStart}</Text>
            <Text style={styles.text}>to {item.TuesdayEnd}</Text>
            </View>
              {/*format new row */}
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Wednesday class schedule Start time to End time */}
            <Text style={styles.text}>Wednesday From: {item.WednesdayStart}</Text>
            <Text style={styles.text}>to {item.WednesdayEnd}</Text>
            </View>
              {/*format new row */}
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Thursday class schedule Start time to End time */}
            <Text style={styles.text}>Thursday From: {item.ThursdayStart}</Text>
            <Text style={styles.text}>to {item.ThursdayEnd}</Text>
            </View>
              {/*format new row */}
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>

              {/*displays Friday class schedule Start time to End time */}
            <Text style={styles.text}>Friday From: {item.FridayStart}</Text>
            <Text style={styles.text}>to {item.FridayEnd}</Text>
            </View>
          </View>
        </View>
        )}
      />

     <View style={styles.inputContainer}>
     <CustomButton
      text="Edit User Profile"
      onPress={onEdit}
      />

      <CustomButton
      text="Home"
      onPress={onHome}
      />
      {/*create Sign Out button */}
      <CustomButton
      text="Sign Out"
      onPress={Logout}
      />
      </View>
    </View>
  )
}
//create container that will hold the style and format of the UserInfo Screen
const styles = StyleSheet.create({
  //homecontainer format and screen placement
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
      //buttontyle format and screen placement
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
      //text format and screen placement
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 15,
      },
      //buttonText format and screen placement
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //button format and screen placement
    button: {
      backgroundColor: '#0782F9',
      width: '80%',
      padding: 15,
      borderRadius: 15,
      marginVertical: 10,
    },
    //inputContaienr format and screen placement
    inputContainer: {
      width: '80%',
      marginTop: 5,
      borderRadius: 10,
  },
});
  //exports UserInfo
export default UserInfo;