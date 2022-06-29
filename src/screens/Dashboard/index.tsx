import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

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
  TransactionList,
  LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "28/06/2022",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      }
    },
    {
      id: "2",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 500,00",
      date: "01/06/2022",
      category: {
        name: "Casa",
        icon: "shopping-bag"
      }
    },
    {
      id: "3",
      type: "negative",
      title: "Pizza",
      amount: "R$ 70,00",
      date: "09/06/2022",
      category: {
        name: "Alimentação",
        icon: "coffee"
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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => <TransactionCard data={item} />
          }
        />
      </Transactions>
    </Container>
  );
}