import React from "react";
import LottieView from "lottie-react-native";

import load_animation from "../../assets/load_animation.json";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={load_animation}
        style={{ height: 200 }}
        autoPlay
        loop
      />
    </Container>
  );
}
