import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion = ({resultado}) => {

    //Vid 190 ,prevenimos que este objeto se ejecute , hasta obtener una cotizacion válida.
    if(Object.keys(resultado).length === 0 ) return null;

    return ( //Vid 191
        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                <Text style={styles.span}>{resultado.PRICE} </Text>
            </Text>
            <Text style={styles.texto}>Precio más alto del día: {' '}
                <Text style={styles.span}> {resultado.HIGHDAY} </Text>
            </Text>
            <Text style={styles.texto}>Precio más bajo del día: {' '}
                <Text style={styles.span}> {resultado.LOWDAY} </Text>
            </Text>
            <Text style={styles.texto}>Variación últimas 24 horas: {' '}
                <Text style={styles.span}> {resultado.CHANGEPCT24HOUR} % </Text>
            </Text>
            <Text style={styles.texto}>Última Actualización: {' '}
                <Text style={styles.span}> {resultado.LASTUPDATE} </Text>
            </Text>
        </View>
     );
}
//Vid 191 
const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5E49E2',
        padding: 20
    },
    texto: {
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10
    },
    precio: {
        fontSize: 38
    },
    span: {
        fontFamily: 'Lato-Black',
    }
})
 
export default Cotizacion;