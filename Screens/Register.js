//imports StyleSheet, ActivityIndicator, TextInput, Text, View, ScrollView, 
//useWindowDimensions, Image, KeyboardAvoidingView components from 'react-native'
import { StyleSheet, ActivityIndicator, TextInput, Text, View, 
  ScrollView, useWindowDimensions, Image, KeyboardAvoidingView} from 'react-native'
//imports React and useState, Component, useEffect components from react
import React, {useState, Component, useEffect} from 'react'
// imports CustomInput from components that allows
// input to be customized when user input information
import CustomInput from '../Components/CustomInput'
//imports CustomButton that holds CustomInput
import CustomButton from '../Components/CustomButton'
//imports Coyote Carpool Logo
import Logo from '../assets/images/Logo.png';
//imports useNavigation() hook
//useNavigation() is a hook which gives access to navigation object
import { useNavigation } from '@react-navigation/core'
//imports useRoute() hook
//useRoute() returns the route prop of the screen it's inside.
import { useRoute } from '@react-navigation/native';
//imports firestore
import firestore from '@react-native-firebase/firestore';
//imports auths feature from firebase
import { auths } from 'firebase'
//imports FLatList
import { FlatList } from 'react-native-gesture-handler';
//imports authentification feature from firebase
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export let tempid = '';

//create Register account feature
const Register = () => {
  const navigation = useNavigation()

  //const GoogleEmail = navigation.getParams('Register','default'); ???
  //Constant variable to check if user is signed in??

  //useState is a Hook that allows you to have state variables in 
  //functional components. You pass the initial state to this function 
  //and it returns a variable with the current state value 
  //(not necessarily the initial state) and another function to update this value.
  const [isSignedIn, setIsSignedIn] = useState(false);

  // pass setUsername to username
  const [username, setUsername] = useState('');
  //pass setPassword to pasword
  const [password, setPassword] = useState('');
  //pass setconfirm to confirm
  const [Confirm, setConfirm] = useState('');
  //pass setid to id
  const [id, setid] = useState('');
  //pass setAddress to address
  const [Address, setAddress] = useState('');
  //pass setMon to Monday
  const [Monday, setMon] = useState('');
  //pass setTue to Tuesday
  const [Tuesday, setTue] = useState('');
  //pass setWed to Wednesday
  const [Wednesday, setWed] = useState('');
  //pass setThur to Thursday
  const [Thursday, setThur] = useState('');
  //pass setFri to Friday
  const [Friday, setFri] = useState('');
  //pass setMon2 to Monday2
  const [Monday2, setMon2] = useState('');
  //pass setTue2 to Tuesday2
  const [Tuesday2, setTue2] = useState('');
  //pass setWed2 to Wednesday2
  const [Wednesday2, setWed2] = useState('');
  //pass setThur2 to Thursday2
  const [Thursday2, setThur2] = useState('');
  //pass setFri2 to Friday2
  const [Friday2, setFri2] = useState('');
  //pass setLicense to License
  const [License, setLicense] = useState('');
  //pass setNumber to Number
  const [Number, setNumber] = useState('');
  //The useWindowDimensions hook from the community React Native hooks library
  // aims to make handling screen/window size changes easier to work with.
  //set height to Window Dimensions
  const {height} = useWindowDimensions();
  //pass setLoading to loading
  const [loading, setLoading] = useState(true);
  //pass setUsers to users
  const [users, setUsers] = useState([]);
  //pass setue to ue
  const [ue, setue] = useState('');

//const userkey = 'Test123'
const array = [];

tempid = id;
//const userkey = 'Test123'??

//When a new user signs up using Coyote Carpool sign-up form,
// const handleSignUp completes any new account validation steps that
// Coyote Carpool app requires, such as verifying that the new account's password 
//was correctly typed and meets your complexity requirements.
//Creates a new account by passing the new user's email address and 
//password to createUserWithEmailAndPassword:
const handleSignUp = () => {
  auth()
      .createUserWithEmailAndPassword(temp, password)
      .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.temp);
          setIsSignedIn(true)
      })
      .catch(error => alert(error.message))
} 


// ??????????????????????????????????????
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
}><ActivityIndicator size="large" color= 'white'/></View>;;
}

const temp = users.map(({email}) => `${email}`).join('');

// Adds new User and user account info and components into 
//firestore database in users collection
const AddUser = async () => {
  //const user = await firestore().collection('users').get();?????
  //const userE = await firestore().collection('users').doc(user).doc('email').get();?????
  firestore()
  .collection('users')
  //.doc(user)???
  //.doc(userE)???
  .add({
    email: temp,
    username: username,
    password: password,
    Address: Address,
    ID: id,
    License: License,
    phonenumber: Number,
    MondayStart: Monday,
    MondayEnd: Monday2,
    TuesdayStart: Tuesday,
    TuesdayEnd: Tuesday2,
    WednesdayStart: Wednesday,
    WednesdayEnd: Wednesday2,
    ThursdayStart: Thursday,
    ThursdayEnd: Thursday2,
    FridayStart: Friday,
    FridayEnd: Friday2,
    Account_Created: firestore.Timestamp.fromDate(new Date()), //timestamps accoutn creation
  })
  .then(() => {
    console.log('User Added!'); //dispays a User Added message after successful registration
  })
  .catch((error) => {
    //displays "Something went wrong when adding user to firestore" errore message
    console.log('Something went wrong when adding user to firestore.', error);
  });
  //
  
  //
  //navigation.navigate
  alert('You Have Succesfully Registered')

  //allows user to navigate to homepage
  navigation.navigate('Home');
}
//allows AddUser and handleSignup to be passed when Signin button pressed
const onSignInPressed = () => {
  AddUser();
  handleSignUp();
}

const Logout = async () => {
  try{
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch(error){
    console.error(error);
  }

  //navigation.navigate('Login');
};

const onCheck = () => {
  const check = 'coyote.csusb.edu';
  let valid = '';
  for (let index = temp.length - 1; index >= 0; index--) {
  const element = temp[index];
  if (element === '@') {
    break;
  } else {
    valid += element;
    console.log('pushed:',element)
    console.log('email to compare:', valid)
  }
  }

  const new_valid = valid.split("").reverse().join(""); 

  console.log('New Checked Email', new_valid)

  if (new_valid === check) {
    console.log('Everything checked out!')
    onSignInPressed();
  } else {
    console.log('Not A valid email')
    Logout();
    alert('Not A CSUSB Email')
    navigation.navigate('Login')
  }

}

//setue(users.email);

  return (
    <KeyboardAvoidingView style={styles.scrollView}> 
    <ScrollView style={styles.scrollView}>
    <View style={{
        color: '#3B71F3',
        justifyContent: 'center',
        paddingHorizontal: 10,
        //marginVertical: 5,
    }}>

      {/*View container to add index features and components to screen screen*/}
    <View style={styles.container}> 
      {/*Displays and Formats Logo */}
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.09}]}
        resizeMode="contain"
      />
    </View>
      {/* Input value that uses placeholder "Full Name"
      until user inputs username */}
      <CustomInput 
      placeholder="Full Name" 
      value={username} 
      setValue={setUsername} 
      />
      {/* Input value that uses placeholder "Password"
      until user inputs password */}
      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry
      />
      {/* Input value that uses placeholder "CSUSB ID"
      until user set value for CSUSB ID*/}
      <CustomInput 
      placeholder="CSUSB ID (Required)" 
      value={id} 
      setValue={setid} 
      />
      {/* Input value that uses placeholder "City You Live In"
      until user set value for City You Live In*/}
      <CustomInput 
      placeholder="City You Live In" 
      value={Address} 
      setValue={setAddress} 
      />
      {/* Input value that uses placeholder "Driver License Number (Optional)"
      until user set optional value for Driver License Number*/}
      <CustomInput 
      placeholder="Driver License Number (Optional)" 
      value={License} 
      setValue={setLicense} 
      />
      {/* Input value that uses placeholder "Phone Number"
      until user set value for Phone Number*/}
      <CustomInput 
      placeholder="Phone Number" 
      value={Number} 
      setValue={setNumber} 
      />
      {/*text style and format for "SCHEDULE" */}
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

       {/*text style and format for "MON" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>MON.</Text>
        {/* Input value that uses placeholder "Start Time"
      until user set value for Start time*/}
        <CustomInput 
        placeholder="Start Time" 
        value={Monday} 
        setValue={setMon} 
        />
        {/* Input value that uses placeholder "End Time"
      until user set value for End time*/}
        <CustomInput 
        placeholder="End Time" 
        value={Monday2} 
        setValue={setMon2} 
        />
      </View>
        {/*text style and format for "TUES" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>TUE. </Text>
        {/* Input value that uses placeholder "Start Time"
      until user set value for Start time*/}
        <CustomInput 
        placeholder="Start Time" 
        value={Tuesday} 
        setValue={setTue} 
        />
        {/* Input value that uses placeholder "End Time"
      until user set value for End time*/}
        <CustomInput 
        placeholder="End Time" 
        value={Tuesday2} 
        setValue={setTue2} 
        />
      </View>
      {/*text style and format for "WED" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>WED.</Text>
        {/* Input value that uses placeholder "Start Time"
      until user set value for Start time*/}
        <CustomInput 
        placeholder="Start Time" 
        value={Wednesday} 
        setValue={setWed} 
        />
        {/* Input value that uses placeholder "End Time"
      until user set value for End time*/}
        <CustomInput 
        placeholder="End Time" 
        value={Wednesday2} 
        setValue={setWed2} 
        />
      </View>
      {/*text style and format for "THURS" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>THU. </Text>
        {/* Input value that uses placeholder "Start Time"
      until user set value for Start time*/}
        <CustomInput 
        placeholder="Start Time" 
        value={Thursday} 
        setValue={setThur} 
        />
        {/* Input value that uses placeholder "End Time"
      until user set value for End time*/}
        <CustomInput 
        placeholder="End Time" 
        value={Thursday2} 
        setValue={setThur2}
        />
      </View>
      {/*text style and format for "FRI" */}
      <View style={{
        flexDirection:"row",
        borderColor: '#3B71F3',
        borderWidth: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        }}>
        <Text style={styles.text}>FRI.  </Text>
        {/* Input value that uses placeholder "Start Time"
      until user set value for Start time*/}
        <CustomInput 
        placeholder="Start Time" 
        value={Friday} 
        setValue={setFri}
        />
        {/* Input value that uses placeholder "End Time"
      until user set value for End time*/}
        <CustomInput 
        placeholder="End Time" 
        value={Friday2} 
        setValue={setFri2}
        />
      </View>

      {/*Displays register button and allows is to be pressed*/}
      <CustomButton
      text="Register"
      onPress={onCheck}
      />

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
 };

{/*style container to format and design display of screen*/}
const styles = StyleSheet.create({
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

//export {id};

//exports Register
export default Register;

