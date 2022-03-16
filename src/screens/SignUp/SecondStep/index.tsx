import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import api from "../../../services/api";

import { Confirmation } from "../../Confirmation";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import {
  Container,
  Header,
  BulletContainer,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação dela");
    }

    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driverLicense: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada!",
          message: `Agora é só fazer login\ne aproveitar.`,
          nextScreenRoute: "SignIn",
        });
      })
      .catch(() => {
        Alert.alert("opa", "Não foi possível cadastrar a sua conta");
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <BulletContainer>
              <Bullet active={false} />
              <Bullet active={true} />
            </BulletContainer>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
