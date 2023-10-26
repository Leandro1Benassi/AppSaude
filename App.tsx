import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect} from "react";
import Routes from './src/routes';
import 'react-native-gesture-handler';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import AppLoading from 'expo-app-loading';
import * as Updates from "expo-updates";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }

    updateApp();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Routes />
  );

}
