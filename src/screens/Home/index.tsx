import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import api from '../../services/api';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

import { LoadAnimation } from '../../components/LoadAnimation';

const Home: React.FC = () => {
  const [cars, setCars] = useState<ModelCar[]>([] as ModelCar[]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation(); 

  function handleCarDetails(car: ModelCar) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSynchronize() {
    try { 
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await api
            .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
  
          const { changes, latestVersion } = response.data;

          console.log("#### SINCRONIZAÇÃO ####");
          // console.log(changes);
          // console.log(lastPulledAt);
  
          return { changes, timestamp: latestVersion }
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users;
          await api.post('/users/sync', user).catch(console.log);
        }
      });
    } catch (error) {
      const err = error as unknown as Error;
      console.log("ERROR: " + err.message);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const cars = await database.get<ModelCar>('cars').query().fetch();

        if (isMounted) {
          setCars(cars);
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected])

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     return true;
  //   });
  // }, []);

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