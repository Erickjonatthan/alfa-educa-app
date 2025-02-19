import BackButton from '@/components/BackButton';
import UserProvider, { useUser } from '@/context/UserContext';
import { Stack, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { pegarInfoUsuario } from '@/controllers/usuario/pegarInfoUsuario';

function TabLayoutContent() {
  const { setUser } = useUser();
  const [initialLoading, setInitialLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (token && userId && pathname === '/profile-pages/edit-profile') {
        const userData = await pegarInfoUsuario(token, userId);
        if (userData) {
          setUser(userData);
        }
      }
      setInitialLoading(false);
    };

    fetchData();
  }, [pathname]);

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#280F2BFF' }}>
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#490053FF' }, animation: 'none' }}>
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
      <Stack.Screen
        name="edit-profile"
        options={{
          title: 'Editar Perfil',
          headerLeft: () => <BackButton />
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <TabLayoutContent />
    </UserProvider>
  );
}