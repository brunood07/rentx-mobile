import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";

import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";

import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map((accessory) => {
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAcessoryIcon(accessory.type)}
            />;
          })}
        </Acessories>

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher per??odo do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
