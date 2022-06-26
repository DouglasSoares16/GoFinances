import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
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
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from "./styles";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "28/06/2022",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      }
    },
    {
      title: "Aluguel do apartamento",
      amount: "R$ 500,00",
      date: "01/06/2022",
      category: {
        name: "Casa",
        icon: "dollar-sign"
      }
    }
  ]


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

      <Transactions>
        <Title>Transações</Title>

        <TransactionList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({ item }) => <TransactionCard data={item} />
          }
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />
      </Transactions>
    </Container>
  );
}