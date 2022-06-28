import React from 'react';
import { ThemeProvider } from "styled-components";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";

import theme from './src/global/styles/theme';
import { CategorySelect } from './src/screens/CategorySelect';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CategorySelect />
    </ThemeProvider>
  );
}
