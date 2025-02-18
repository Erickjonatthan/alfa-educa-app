import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ActivityIndicator, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import UserProvider, { useUser } from "@/context/UserContext";
import { useBackRedirect } from "@/hooks/useBackRedirect";
import { ThemedView } from "@/components/ThemedView";
import useLogout from "@/hooks/useLogout"; // Importa o hook de logout
import { adicionarConquistaUsuario } from "@/controllers/conquista/adicionarConquistaUsuario";

const CONQUISTA_ID = 'c5c9f616-d109-4a8b-adeb-cb7db7deaacb';


function TabLayoutContent() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuth();
  const pathname = usePathname();
  const { setUser } = useUser();
  const [initialLoading, setInitialLoading] = useState(true);
  const { handleLogout } = useLogout(); // Usa o hook de logout

  useBackRedirect();

  const fetchUserData = async (token: string, userId: string) => {
    try {
      const response = await fetch(`https://alfa-educa-server.onrender.com/cadastro/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Atualize o contexto com os dados do usuário
        // Verificar se o usuário já possui a conquista
        const hasConquista = userData.conquistas?.some((conquista: { id: string; }) => conquista.id === CONQUISTA_ID);
  
        // Adicionar conquista ao usuário se ele estiver no nível 1 e não possuir a conquista
        if (userData.nivel >= 1 && !hasConquista) {
          try {
            await adicionarConquistaUsuario(token, userId, CONQUISTA_ID);
            console.log('Conquista adicionada com sucesso');
          } catch (error) {
            console.error('Erro ao adicionar conquista:', error);
          }
        }
      } else if (response.status === 403) {
        console.log('Usuário não autorizado ou não encontrado, redirecionando para login.');
        await AsyncStorage.clear();
        router.push('/');
      } else {
        console.log('Falha ao buscar dados do usuário:', response.status);
        router.push('/');
      }
    } catch (error) {
      console.log('Erro ao buscar dados do usuário:', error);
      router.push('/');
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //pega o token do AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (token && userId) {
        fetchUserData(token, userId);
      } else {
        await AsyncStorage.clear();
        setInitialLoading(false);
        router.push("/");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      isAuthenticated === false &&
      (pathname.startsWith("/pages") ||
        pathname.startsWith("/admin-pages") ||
        pathname.startsWith("/profile-pages"))
    ) {
      handleLogout(); // Chama a função de logout se não estiver autenticado
    }
  }, [isAuthenticated, pathname]);

  if (initialLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ marginTop: 10, color: '#FFFFFF' }}>Carregando Informações...</Text>
      </ThemedView>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].background,
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: " Início ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="manage-tasks"
        options={{
          title: " Atividades ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={21} name="task.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: " Usuários ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={21} name="users" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: " Perfil ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={21} name="user-alt" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <UserProvider>
      <TabLayoutContent />
    </UserProvider>
  );
}