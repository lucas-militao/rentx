import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

const Home: React.FC = () => {
  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  };

  const carDataTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail: 'https://i.pinimg.com/originals/b3/12/53/b31253a815e632ef08ffb569e79436b8.png'
  };

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

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne}/>
      <Car data={carDataTwo}/>
    </Container>
  );
}

export default Home;