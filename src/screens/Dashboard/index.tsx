import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  LogoutButton,
  LoadContainer
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((transaction: DataListProps) => {
        if (transaction.type === "positive")
          entriesTotal += Number(transaction.amount);

        else
          expensiveTotal += Number(transaction.amount);

        const amount = Number(transaction.amount)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          });

        const date = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount,
          date
        }
      });

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      },
    });

    setData(transactionsFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {isLoading ?
        (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: "https://github.com/DouglasSoares16.png" }} />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Douglas</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => { }}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction="Última entrada dia 13 de abril" />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensives?.amount}
              lastTransaction="Última saída dia 17 de abril" />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
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
        </>}
    </Container>
  );
}