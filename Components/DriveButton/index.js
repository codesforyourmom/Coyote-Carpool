//import React library from React
import React from 'react';
//import View, Text, Pressable components from react-native
import {View, Text, Pressable} from 'react-native';
import styles from './styles';



//lines 14-37
//constructs pressable StyledButton
// that will be able to direct to
//other components and navigate to other screen
const DriveButton = (props) => {

    //const type = props.type;
    //const content = props.content;
    //const onPress = props.onPress;

    const {type, content, onPress} = props;
    
    const backgroundColor = type === 'primary' ? '#096D' : '#f00';
    const textColor = type === 'primary' ? '#FFFFFF' : '#FFFFFF';

    return (
        <View style={styles.container}>
            <Pressable
                //disabled= {true} 
                style={[styles.button, {backgroundColor: backgroundColor}]}
                onPress={() => onPress()}
            >
            <Text style={[styles.text, {color: textColor}]}>{content}</Text>   
            </Pressable>
        </View>
    );
};

export default DriveButton; //exports styledbutton