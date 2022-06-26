import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/DouglasSoares16.png" }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Douglas</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 12.750,00"
          lastTransaction="Última entrada dia 13 de abril" />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.300,00"
          lastTransaction="Última saída dia 17 de abril" />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 11.450,00"
          lastTransaction="01 à 19 de abril" />
      </HighlightCards>
    </Container>
  );
}