import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  Picker,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import { Picker } from '@react-native-community/picker';
import logo from '../../assets/logo.png';
import backgroundImage from '../../assets/home-background.png';
import api from '../../services/api';
import { styles } from './styles';

interface States {
  sigla: string;
}

interface Cities {
  nome: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    api
      .get<States[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        console.log(ufInitials);
        setStates(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedState === '') {
      return;
    }
    api
      .get<Cities[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
      )
      .then((response) => {
        const citiesNames = response.data.map((city) => city.nome);

        setCities(citiesNames);
      });
  }, [selectedState]);

  function handleNavigateToPoints() {
    console.log(selectedState, selectedCity);
    if (!setSelectedState || !selectedCity) {
      Alert.alert('Oooooops...', 'Preencha todos os campos');
      return;
    }
    navigation.navigate('Points');
  }
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={logo} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <Picker
        style={styles.input}
        selectedValue={selectedState}
        onValueChange={(state) => {
          setSelectedState(state);
        }}
      >
        <Picker.Item label="Selecione um estado" value="" />
        {states.map((state) => {
          return <Picker.Item key={state} label={state} value={state} />;
        })}
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={selectedCity}
        onValueChange={(city) => {
          setSelectedCity(city);
        }}
      >
        <Picker.Item label="Selecione uma cidade" value="" />

        {cities.map((city) => {
          return <Picker.Item key={city} label={city} value={city} />;
        })}
      </Picker>

      <RectButton style={styles.button} onPress={handleNavigateToPoints}>
        <View style={styles.buttonIcon}>
          <Feather name="arrow-right" color="#FFF" size={24} />
        </View>
        <Text style={styles.buttonText}>Entrar</Text>
      </RectButton>

      <View style={styles.footer}></View>
    </ImageBackground>
  );
};

export default Home;
