import React, {useState, useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView, useWindowDimensions, StyleSheet, Text, TextInput, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
//import styles from './styles';
import LongButton from '../Components/LongButton';
import SmallButton from '../Components/SmallButton';
import { useNavigation } from '@react-navigation/core'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { auths } from '../firebase';
import CustomButton from '../Components/CustomButton'
import { tempid } from './Register'
import { usertemp } from './UserInfo'
import CustomInput from '../Components/CustomInput'


//create page features and variables for users to edit account information
const UserEdit = () => {
  
  const navigation = useNavigation()
  console.log('Usertemp from edit Page:',usertemp)

  //const [loading, setLoading] = useState(true);
   // const [users, setUsers] = useState([])
  const tusername = usertemp.map(({username}) => `${username}`).join('');
  const [username, setUsername] = useState(tusername);
  //const [password, setPassword] = useState('');
  //const [Confirm, setConfirm] = useState('');
  //const [id, setid] = useState('');
  const tAddress = usertemp.map(({Address}) => `${Address}`).join('');
  const [Address, setAddress] = useState(tAddress);
  const tMon = usertemp.map(({MondayStart}) => `${MondayStart}`).join('');
  const [Monday, setMon] = useState(tMon);
  const tTue = usertemp.map(({TuesdayStart}) => `${TuesdayStart}`).join('');
  const [Tuesday, setTue] = useState(tTue);
  const tWed = usertemp.map(({WednesdayStart}) => `${WednesdayStart}`).join('');
  const [Wednesday, setWed] = useState(tWed);
  const tThur = usertemp.map(({ThursdayStart}) => `${ThursdayStart}`).join('');
  const [Thursday, setThur] = useState(tThur);
  const tFri = usertemp.map(({FridayStart}) => `${FridayStart}`).join('');
  const [Friday, setFri] = useState(tFri);
  const tMon2 = usertemp.map(({MondayEnd}) => `${MondayEnd}`).join('');
  const [Monday2, setMon2] = useState(tMon2);
  const tTue2 = usertemp.map(({TuesdayEnd}) => `${TuesdayEnd}`).join('');
  const [Tuesday2, setTue2] = useState(tTue2);
  const tWed2 = usertemp.map(({WednesdayEnd}) => `${WednesdayEnd}`).join('');
  const [Wednesday2, setWed2] = useState(tWed2);
  const tThur2 = usertemp.map(({ThursdayEnd}) => `${ThursdayEnd}`).join('');
  const [Thursday2, setThur2] = useState(tThur2);
  const tfri2 = usertemp.map(({FridayEnd}) => `${FridayEnd}`).join('');
  const [Friday2, setFri2] = useState(tfri2);
  const tLicense = usertemp.map(({License}) => `${License}`).join('');
  const [license, setLicense] = useState(tLicense);
  const tnumber = usertemp.map(({phonenumber}) => `${phonenumber}`).join('');
  const [Number, setNumber] = useState(tnumber);
  const {height} = useWindowDimensions();
      
    //const usercid = firestore().collection('id').doc('CSUSBID').get();
    //const userkey = route.params.id
    const tkey = usertemp.map(({key}) => `${key}`).join('');
    const userkey = tempid;
   // console.log(userkey)


  const onEdit = async () => {

    firestore()
    .collection('users')
    .doc(tkey)
    .update({
      "Address": Address,
      'username': username,
      'License': license,
      'phonenumber': Number,
      'MondayStart': Monday,
      'MondayEnd': Monday2,
      'TuesdayStart': Tuesday,
      'TuesdayEnd': Tuesday2,
      'WednesdayStart': Wednesday,
      'WednesdayEnd': Wednesday2,
      'ThursdayStart': Thursday,
      'ThursdayEnd': Thursday2,
      'FridayStart': Friday,
      'FridayEnd': Friday2,
    
    })
    .then(() => {
      console.log('User updated!');
    });

    navigation.navigate('UserInfo')
  }

  return(
    <KeyboardAvoidingView style={styles.scrollView}>
    {/*Scroll View to allow scrollable screen */}
    <ScrollView style={styles.scrollView}>

    {/*view inside scrollview format */}
    <View style={{
        color: '#3B71F3',
        justifyContent: 'center',
        paddingHorizontal: 10,
        //marginVertical: 5,
    }}>

      <Text style = {{
        fontSize: 30,
        fontWeight: '700',
        color: '#FFF',
      }}>Edit User Profile</Text>

      <CustomInput 
      placeholder="Full Name" 
      value={username} 
      setValue={setUsername} 
      />
      {/*Displays container to update password */}
      <CustomInput 
      placeholder="City You Live In" 
      value={Address} 
      setValue={setAddress} 
      />
      {/*Displays container to update Drivers License number */}
      <CustomInput 
      placeholder="Driver License Number (Optional)" 
      value={license} 
      setValue={setLicense} 
      />
      {/*Displays container to update phone number*/}
      <CustomInput 
      placeholder="Phone Number" 
      value={Number} 
      setValue={setNumber} 
      />


      {/*Display text components "SCHEDULE" */}
      <Text style={{
        color: '#3B71F3',
        fontWeight: 'bold',
        fontSize: 20,
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
      }} > SCHEDULE </Text>

      {/*Displays text Mon  */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>MON.</Text>

       {/*and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="Start Time" 
        value={Monday} 
        setValue={setMon} 
        />

        {/*"End Time" asks for user input end of class to be added */}
        <CustomInput 
        placeholder="End Time" 
        value={Monday2} 
        setValue={setMon2} 
        />
      </View>
        {/*Display text "TUES" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>TUE. </Text>

        {/*a"Start Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="Start Time" 
        value={Tuesday} 
        setValue={setTue} 
        />
         {/*"End Time" asks for user input end of class to be added */}
        <CustomInput 
        placeholder="End Time" 
        value={Tuesday2} 
        setValue={setTue2} 
        />
      </View>
        {/*Displays text WED */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>WED.</Text>

        {/*"Start Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="Start Time" 
        value={Wednesday} 
        setValue={setWed} 
        />

        {/*"End Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="End Time" 
        value={Wednesday2} 
        setValue={setWed2} 
        />
      </View>
        {/*Displays text THU */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>THU. </Text>

        {/*"Start Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="Start Time" 
        value={Thursday} 
        setValue={setThur} 
        />

        {/*"End Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="End Time" 
        value={Thursday2} 
        setValue={setThur2}
        />
      </View>
        {/*Displays text FRI */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>FRI.  </Text>
        {/*"Start Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="Start Time" 
        value={Friday} 
        setValue={setFri}
        />
        {/* "End Time" and asks for user input start of class to be added */}
        <CustomInput 
        placeholder="End Time" 
        value={Friday2} 
        setValue={setFri2}
        />
      </View>

      {/*Displays register button and press feature */}
      <CustomButton
      text="Confirm Changes"
      onPress={onEdit}
      />

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
 };

//StyleSheet formats and margins UserEdit screen
const styles = StyleSheet.create({
     //root format and screen placement
    root: {
        alignItems : 'center',
        padding: 50,
        backgroundColor: '#213B62',
    },
    //text format and screen placement
    text: {
      color: '#3B71F3',
      fontWeight: 'bold',
      fontSize: 20,
      alignItems: 'center',
      paddingHorizontal: 10,
      marginVertical: 15,
    },
    //logo format and screen placement
    logo:{
      width : '100%',
      maxWidth: 80,
      height: 100,
      paddingHorizontal: 10,
      marginVertical: 1,
    },
    //container format and screen placement
    container:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: 50,
    },
    //list format and screen placement
    list: {
      width: 125,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      borderWidth: 3,
      borderColor: '#096DC6',
      color: '#FFF',
      padding: 8,
      borderRadius: 10,
      //right: 45,
      textAlignVertical: 'center',
      textAlign: 'center',
      bottom: 20,
    },
    //scrollView format and screen placement
    scrollView: {
      backgroundColor: '#213B62',
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
    //personal format and screen placement
    personal: {
      color: 'white',
      width: '100%',
      
    },

})

export default UserEdit;