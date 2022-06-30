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
  lastTransaction: string;
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

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransactionDate = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString("pt-BR", {
      month: "long"
    })}`;
  }

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

    setData(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntries = getLastTransactionDate(transactions, "positive");
    const lastTransactionExpensives = getLastTransactionDate(transactions, "negative");
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: totalInterval
      },
    });

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
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction} />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction} />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction} />
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