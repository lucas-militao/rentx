import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

import { LoadAnimation } from '../../components/LoadAnimation';

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation(); 

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars'); 
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);


  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   });
  // }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está online');
    } else {
      Alert.alert('Você está offline');
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      { loading ? <LoadAnimation /> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Car 
              data={item} 
              onPress={() => handleCarDetails(item)}
            />}
        />
      }
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;