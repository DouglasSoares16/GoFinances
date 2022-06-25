import React from "react";
import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/DouglasSoares16.png" }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Douglas</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}