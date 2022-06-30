import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

import { useTheme } from "styled-components";
import { Resume } from "../screens/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 50,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          paddingBottom: 10,
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => 
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color} />
        }} />

      <Screen name="Cadastrar" component={Register} options={{
          tabBarIcon: ({ size, color }) => 
            <MaterialIcons
              name="attach-money"
              size={size}
              color={color} />
        }} />

      <Screen name="Resumo" component={Resume} options={{
          tabBarIcon: ({ size, color }) => 
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color} />
        }} />
    </Navigator>
  );
}