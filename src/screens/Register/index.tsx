import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeToggleButton } from "../../components/Form/TransactionTypeToggleButton";
import { Container, Form, Header, Title, Fields, TransactionTypes } from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeToggleButton
              isActive={transactionType === "up"}
              title="Income"
              type="up"
              onPress={() => handleTransactionsTypeSelect("up")} />

            <TransactionTypeToggleButton
              isActive={transactionType === "down"}
              title="Outcome"
              type="down"
              onPress={() => handleTransactionsTypeSelect("down")} />
          </TransactionTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}