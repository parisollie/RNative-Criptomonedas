import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Header from './components/Header'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';


const App = () => {

  //Vid 184
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  //Vid 188, le ponemos false para que no se comunique luego
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  //Vid 190 
  const [resultado, guardarResultado] = useState({});
  //Vid 193 
  const [cargando, guardarCargando] = useState(false);

  // Vid 189, para consultar APIS usamos useEffect
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        //Vid 189 , ${criptomoneda}&tsyms=${moneda} para poder hacer las comparaciones de la criptomoneda 
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        //Usamos axios para usar la peticion a get , aunque axios ya la hace
        const resultado = await axios.get(url);
        console.log('resultado')

        // console.log(resultado.data.DISPLAY[criptomoneda][moneda] );
        guardarCargando(true);

        //Vid 193, Ocultar el spinner y mostrar el resultado, para ver la animacion del sppiner
        setTimeout(() => {
          //Tenemos un resultado mas dinamico de esta manera : [criptomoneda][moneda]
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          //Vid 190 
          guardarConsultarAPI(false);
          guardarCargando(false);

        }, 3000);
      }
    }
    //Mandamos a llamar la funcion 
    cotizarCriptomoneda();
  }, [consultarAPI]);

  //Vid 193, mostrar el spinner o el resultado
  //Si cargando esta como true ,mostramos el aciviti y en caso contrario mostramos la cotizacion.
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion resultado={resultado} />

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          //Vid 181 
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />

        <View style={styles.contenido}>
          <Formulario
            //Vid 188
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
          />
        </View>

        <View style={{ marginTop: 40 }}>
          {componente}
        </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
