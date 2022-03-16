import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { Footer, Container, Form, Header, SubTitle, Title } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth;

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Necessário informar um e-mail válido"),
        password: Yup.string().required("É necessário informar uma senha"),
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);

        signIn({ email, password });
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique o seu email e senha."
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("FirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
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
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={false}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
