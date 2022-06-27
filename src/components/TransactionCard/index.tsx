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

export interface TransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: {
    name: string;
    icon: string;
  }
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />

          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}