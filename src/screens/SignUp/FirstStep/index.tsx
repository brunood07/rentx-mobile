import React from "react";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import {
  Container,
  Header,
  BulletContainer,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export function FirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSecondStep() {
    navigation.navigate("SecondStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <BulletContainer>
              <Bullet active={true} />
              <Bullet active={false} />
            </BulletContainer>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button title="Próximo" onPress={handleSecondStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
