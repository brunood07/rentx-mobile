import React from "react";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";

import {
  Container,
  Header,
  BulletContainer,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";

export function FirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
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
      </Form>
    </Container>
  );
}
