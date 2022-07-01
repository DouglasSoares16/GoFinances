import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title
} from "./styles";

interface TransactionData {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function handleDateChange(action: "next" | "prev") {
    if (action === "next")
      setSelectedDate(addMonths(selectedDate, 1));

    else
      setSelectedDate(subMonths(selectedDate, 1));

  }

  async function loadData() {
    setIsLoading(true);

    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];

    const expensives = responseFormated
      .filter((expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensivesTotal = expensives.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key)
          categorySum += Number(expensive.amount);
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted,
          total: categorySum,
          color: category.color,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setTimeout(() => setIsLoading(false), 1000);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) :
        (
          <Container>
            <Content>
              <MonthSelect>
                <MonthSelectButton onPress={() => handleDateChange("prev")}>
                  <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>

                <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>

                <MonthSelectButton onPress={() => handleDateChange("next")}>
                  <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
              </MonthSelect>

              <ChartContainer>
                <VictoryPie
                  colorScale={totalByCategories.map(category => category.color)}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape
                    }
                  }}
                  labelRadius={50}
                  data={totalByCategories}
                  x="percent"
                  y="total" />
              </ChartContainer>

              {
                totalByCategories.map(item => (
                  <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color} />
                ))
              }
            </Content>
          </Container>
        )
      }
    </>
  )
}