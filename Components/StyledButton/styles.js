//import StyledSheet from react-native
import { StyleSheet } from 'react-native';

//styles/formats StyledButton
const styles = StyleSheet.create({
    container:{
        width: 180,
        padding: 10,
        alignSelf: 'center',
    },
    button:{
        height: 50,
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
//export styles
export default styles;