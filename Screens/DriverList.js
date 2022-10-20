//imports react library, and the useState & useEffect hooks from react
import React, {useState, useEffect} from 'react';
//imports View, StyleSheet, Text, TextInput, Image, ActivityIndicator react-native components
import {View, StyleSheet, Text, TextInput, Image, ActivityIndicator} from 'react-native';
//imports LongButton from components folder
import LongButton from '../Components/LongButton';
//imports SmallButton from components folder
import SmallButton from '../Components/SmallButton';
//imports useNavigation()
import { useNavigation } from '@react-navigation/core'
//imports firestore from firebase
import firestore from '@react-native-firebase/firestore';
//imports FLatList
import { FlatList } from 'react-native-gesture-handler';
//constructs a drivers list 
const DriverList = () => {
  //create constant variable navigation that will be passed to 
  //useNavigation is a hook which gives access to navigation object
  const navigation = useNavigation(); 

  //tracks loading state
    const [loading, setLoading] = useState(true);
    //tracks if user info has changed
    const [users, setUsers] = useState([]);


      //the useEffect hook allow driverList subscriber 
      //to fetch user data from firestore
      //and return userdata as subscriber
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
    //allows navigation to home page
    const onHome = () => {
      navigation.navigate('Home');
    }

  return(
    //create View container that will hold the Data and Components of the Drivers List
    <View style = {styles.homecontainer}>
    {/* Display "Looking for a Ride" */}
      <Text style = {styles.title}>Looking For a Ride</Text>

    {/*The FlatList component displays the similar structured data in a scrollable list. 
      The FlatList shows only user elements (username/Address) which are currently 
      displaying on the screen.*/}
      <FlatList
        data={users}
        renderItem={({ item }) => (
        <View style = {styles.buttonsContainer}>
        <Image style={styles.profileImage} source={require('../assets/images/Profile.png')}/>
          <View style={styles.list}>
            <Text style={styles.personal}>Name: {item.username}</Text>
            <Text style={styles.personal}>From: {item.Address}</Text>
            
          </View>
        </View>
        )}
      />
      {/* Display Longbutton style that navigate user to the Home Page */}
      <View style={styles.buttonStyle}>
        <LongButton 
          type="secondary" 
          content={"Home Page"} 
          onPress={onHome}
        />
      </View>
      
    </View>
  );
};
//create container that will hold the style and format of the Drivers List
const styles = StyleSheet.create({
    homecontainer: {
        backgroundColor: '#213B62', //backrounds color and alignment
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
      //profile image format and screen placement
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
      //buttons container format and screen placement
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
      //loading format and screen placement
      loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
//exports DriverList
export default DriverList;