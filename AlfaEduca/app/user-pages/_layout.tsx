import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'none', tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="settings"/>
    </Tabs>
  );
}