import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';

const Formulario = ({ 
    //Vid 188, las llamos del App
    moneda,
    criptomoneda,
    guardarMoneda,
    guardarCriptomoneda,
    guardarConsultarAPI
}) => {

    const [ criptomonedas, guardarCriptomonedas ] = useState([]);

  
    //Vid 189
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            //Vid 185, usamos axios para usar la peticion a get , aunque axios ya la hace
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
            //console.log(resultado.data.Data)
        }
        consultarAPI();
    }, []);//Queremos que se ejecute cuando este listo el componente ,por eso le pasamos un arreglo vacio.

    /********************************************************************************************** */
    
    //Vid 184, Almacena las selecciones del usuario
    const obtenerMoneda = moneda => {
        console.log(moneda)
        //Guardo la moneda para guardar el picker
        guardarMoneda(moneda)
    }
    //Vid 185 , función para obtener la criptomoneda con la que vamos a comparar el  valor.
    const obtenerCriptomoneda = cripto => {
        guardarCriptomoneda(cripto)
    }

    /********************************************************************************************** */
    //Vid 187, para cotizar las monedas.
    const cotizarPrecio = () => {
        //Vid 188
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            //Vid 188, mostramos la alerta sino seleccionaron anda 
            mostrarAlerta();
            return;
        }

        //Se paso la validación 
        console.log('cotizando...')
        // Cambiar el state de consultar api
        guardarConsultarAPI(true)
  
    }
    /********************************************************************************************** */  
    //Vid 188 Alertas   
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios', 
            [
                {text: 'OK'}
            ]
        )
    }

    return ( 

        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
            //Vid 184
                selectedValue={moneda}
                //Se ejecuta la funcion y le pasamos esa moneda 
                onValueChange={ moneda => obtenerMoneda(moneda) }
                //Vid 186 es una separacion para los selectores
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" /> 
                <Picker.Item label="Dolar de Estados Unidos" value="USD" /> 
                <Picker.Item label="Peso Mexicano" value="MXN" /> 
                <Picker.Item label="Euro" value="EUR" /> 
                <Picker.Item label="Libra Esterlina" value="GBP" /> 
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                //Vid 186 
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptomoneda(cripto) }
                //Vid 186 es una separacion para los selectores
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" /> 
                {criptomonedas.map( cripto => (//Vid 186 , accedemos a cada uno de las criptomendas de la API,coinf info es el valor de 3 dígitps
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} /> 
                ))}
            </Picker>

            <TouchableHighlight
                //Vid 186 
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
     );
}

//Vid 182 
const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});
 
export default Formulario;