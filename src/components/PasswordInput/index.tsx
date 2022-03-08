import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibilityButton,
} from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({ iconName, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_details} />
      </IconContainer>

      <InputText secureTextEntry={isPasswordVisible} {...rest} />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibility}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_details}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
