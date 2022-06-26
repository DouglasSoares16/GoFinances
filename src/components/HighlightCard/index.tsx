import React from "react";
import { 
  Amount, 
  Container, 
  Footer, 
  Header, 
  Icon, 
  LastTransaction, 
  Title 
} from "./styles";

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>

        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 18.500,00</Amount>

        <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
}