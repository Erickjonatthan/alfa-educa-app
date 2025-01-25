import BackButton from '@/components/BackButton';
import UserProvider from '@/context/UserContext';
import { Stack } from 'expo-router';
import React from 'react';
export default function RootLayout() {
  
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown:true, headerTintColor: '#fff', 
        headerStyle: { backgroundColor: '#490053FF', }, animation: 'none'}}>
        <Stack.Screen 
          name="settings"
          options={{ 
            title: 'Configurações',
            headerLeft: () => <BackButton />
          }}
        />
        <Stack.Screen 
          name="achievements"
          options={{ 
            title: 'Conquistas',
            headerLeft: () => <BackButton />
          }}
        />
      </Stack>
    </UserProvider>
  );
}