import React from "react";
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