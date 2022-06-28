import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeToggleButton } from "../../components/Form/TransactionTypeToggleButton";
import { CategorySelect } from "../CategorySelect";

import { Container, Form, Header, Title, Fields, TransactionTypes } from "./styles";

interface FormData {
  [name: string]: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("O nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("A quantidade é obrigatório"),

})

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister({ name, amount }: FormData) {
    if (!transactionType)
      return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    const data = {
      name,
      amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              error={errors.name && errors.name.message as string}
              autoCapitalize="sentences"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome" />

            <InputForm
              error={errors.amount && errors.amount.message as string}
              keyboardType="number-pad"
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
    </TouchableWithoutFeedback>
  );
}
