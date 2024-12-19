import { Tabs } from 'expo-router';
import React from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function RootLayout() {
  
  useAuthRedirect();

  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'none', tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="pages" />
      <Tabs.Screen name="user-pages" />
    </Tabs>
  );
}