import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { PasswordInput } from "../../../components/PasswordInput";

import { 
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpSecondStep() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }  
  
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true}/>
              <Bullet active={false}/>
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repertir senha"
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}