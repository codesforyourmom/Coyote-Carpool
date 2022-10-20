import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
//import styles from './styles';
import LongButton from '../Components/LongButton';
import SmallButton from '../Components/SmallButton';
import { useNavigation } from '@react-navigation/core'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { auths } from '../firebase';
import CustomButton from '../Components/CustomButton'
import { tempid } from './SecurityCheck'
import { GoogleSignin } from '@react-native-community/google-signin';

export let usertemp = [];

const S_UserInfo = () => {
  
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
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


  const onHome = () => {
    navigation.navigate('S_Home');
  }

  const onEdit = () => {
    navigation.navigate('S_UserEdit')
  }

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
    <View style = {styles.homecontainer}>
      <Text style = {styles.title}>User Info</Text>
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
        <View >
          <View >
          <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Name: {item.username}</Text>
            </View>

            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>ID: {userkey}</Text>
            </View>

            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Email: {item.email}</Text>
            </View>

            <View style={{
            //flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>City: {item.Address}</Text>
            </View>
          
            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Monday From: {item.MondayStart}</Text>
            <Text style={styles.text}>to {item.MondayEnd}</Text>
            </View>

            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Tuesday From: {item.TuesdayStart}</Text>
            <Text style={styles.text}>to {item.TuesdayEnd}</Text>
            </View>

            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Wednesday From: {item.WednesdayStart}</Text>
            <Text style={styles.text}>to {item.WednesdayEnd}</Text>
            </View>

            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
            <Text style={styles.text}>Thursday From: {item.ThursdayStart}</Text>
            <Text style={styles.text}>to {item.ThursdayEnd}</Text>
            </View>

            <View style={{
            flexDirection:"row",
            borderColor: '#3B71F3',
            borderWidth: 3,
            //justifyContent: 'center',
            paddingHorizontal: 5,
            marginVertical: 5,}}>
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
        
      <CustomButton
      text="Sign Out"
      onPress={Logout}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    homecontainer: {
        backgroundColor: '#213B62',
        flex: 1,
        alignItems: 'center',
      },
      title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFF',
      },
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
      personal: {
        color: 'white',
        width: '100%',
        
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
        width: 60,
        height: 60,
        borderRadius: 60/2,
        //right: 10,
        top: 5,
      },
      image: {
        bottom: 40,
        width: 250,
        height: 250,
        borderRadius: 250/2,
        alignSelf: 'center',
      },
      imageList: {
        width: 50,
        height: 50,
        left: 25,
        bottom: 20,
      },
      adjust: {
        top: 100,
      },
      buttonsContainer:{
        marginTop: 25,
        flexDirection: 'row',
        //width: '100%',
        width: '90%',
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        
      },
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
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 15,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
      backgroundColor: '#0782F9',
      width: '80%',
      padding: 15,
      borderRadius: 15,
      marginVertical: 10,
    },
    inputContainer: {
      width: '80%',
      marginTop: 5,
      borderRadius: 10,
  },
});

export default S_UserInfo;