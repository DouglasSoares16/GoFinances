import React from "react";
import {
  Amount,
  Category,
  Date,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title
} from "./styles";

interface Props {
  data: {
    title: string;
    amount: string;
    category: {
      name: string;
      icon: string;
    }
    date: string;
  }
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />

          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}