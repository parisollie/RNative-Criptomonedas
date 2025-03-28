import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

//Vid 178
const Header = () => (
    <Text style={styles.encabezado}>Criptomonedas</Text>
 );

 //Vid 179,aqui importaremos una nueva fuente 
const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    }
})
 
export default Header;