import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeToggleButton } from "../../components/Form/TransactionTypeToggleButton";
import { CategorySelect } from "../CategorySelect";

import { Container, Form, Header, Title, Fields, TransactionTypes } from "./styles";

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister({ name, amount}: FormData) {
    const data = {
      name,
      amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            control={control}
            name="name"
            placeholder="Nome" />

          <InputForm
            control={control}
            name="amount"
            placeholder="Preço" />

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

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
