import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

export interface Props extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
  type: "up" | "down";
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
}

export function TransactionTypeToggleButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Container>
  )
}