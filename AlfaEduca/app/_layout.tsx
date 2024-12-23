import { useBackRedirect } from '@/hooks/useBackRedirect';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {

  useBackRedirect();

  return (
    <Stack screenOptions={ {headerShown: false, animation: 'none' }}>
      <Stack.Screen name="pages"/>
      <Stack.Screen name="user-pages"/>
      <Stack.Screen name="index"/>
      <Stack.Screen name="cadastro" />
    </Stack>
  );
}