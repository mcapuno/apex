import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchScreen } from "./src/screens/SearchScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SearchScreen />
    </SafeAreaProvider>
  );
}

