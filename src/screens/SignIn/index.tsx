import React, { useState, useEffect } from "react";
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import * as Yup from 'yup';

import { useTheme } from "styled-components";

import { Button } from '../../components/Button';
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import {
  Container, 
  Header, 
  Form,
  Footer,
  SubTitle, 
  Title,
} from './styles';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const theme = useTheme();

  const navigation = useNavigation();

  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password});

      signIn({ email, password });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa ', error.message);
      }
      return Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, verifique as credenciais");
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button 
              title="Login"
              onPress={handleSignIn}
              loading={false}
            />

            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}