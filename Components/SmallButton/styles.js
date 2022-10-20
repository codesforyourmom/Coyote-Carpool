//import StyleSheet from react-native
import { StyleSheet } from 'react-native';

//styles/formats SmallButton
const styles = StyleSheet.create({
    container:{
        width: 140,
        padding: 10,
        bottom: 5,
        left: 20,
        //alignSelf: 'center',
    },
    button:{
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
    }
});

export default styles;