import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

interface InputPros extends TextInputProps {}

export function Input({...rest}: InputPros) {
  return (
    <Container {...rest} />
  );
}