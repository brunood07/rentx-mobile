import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointements,
  AppointmentsTitle,
  AppointmentsQuantity,
} from "./styles";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>Seus agendamentos,{"\n"}estão aqui.</Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <Content>
        <Appointements>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>Agendamentos feitos</AppointmentsQuantity>
        </Appointements>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
}
