import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CategoryTitle, Container, Icon } from "./styles";

interface Props {
  title: string;
  onPress(): void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <CategoryTitle>{title}</CategoryTitle>

      <Icon name="chevron-down" />
    </Container>
  );
}