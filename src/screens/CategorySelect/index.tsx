import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { Category, Container, Footer, Header, Icon, Name, Separator, Title } from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory(category: Category): void;
  closeSelectCategory(): void;
}

export function CategorySelect({ 
  category, 
  closeSelectCategory, 
  setCategory 
}: Props) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList 
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />

            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  );
}