import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ActivityIndicator} from 'react-native';
//import styles from './styles';
import LongButton from '../Components/LongButton';
import SmallButton from '../Components/SmallButton';
import { useNavigation } from '@react-navigation/core'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const S_RiderList = () => {
  
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

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

  const onHome = () => {
    navigation.navigate('S_Home');
  }

  return(
    <View style = {styles.homecontainer}>
      <Text style = {styles.title}>Looking For a Ride</Text>
      
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

      <View style={styles.buttonsContainer}>
        <LongButton 
          type="secondary" 
          content={"Home Page"} 
          onPress={onHome}
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
});

export default S_RiderList;