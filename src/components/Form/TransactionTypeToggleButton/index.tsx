import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Icon, Button } from "./styles";

export interface Props extends RectButtonProps {
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
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />

        <Title>{title}</Title>
      </Button>
    </Container>
  )
}