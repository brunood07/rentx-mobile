import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useAuth } from "../../../hooks/auth";

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

export function FirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation();
  const { user } = useAuth();

  function handleBack() {
    navigation.goBack();
  }

  async function handleSecondStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        driverLicense: Yup.string().required("CNH é obrigatória"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
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
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleSecondStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
