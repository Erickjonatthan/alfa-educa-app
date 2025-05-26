import { router, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import UserProvider, { useUser } from "@/context/UserContext";
import { ThemedView } from "@/components/ThemedView";
import { desbloquearConquistasUsuario } from '@/controllers/conquista/adicionarConquistaUsuario'; // Substitui o método anterior
import { API_URL } from "@/constants/ApiUrl";

// Importações dos ícones SVG
import HomeIcon from '@/assets/images/icons/fluent-color--home-16.svg';
import TaskIcon from '@/assets/images/icons/fluent-emoji-flat--pencil.svg';
import CameraIcon from '@/assets/images/icons/fluent-emoji--camera.svg';
import ProfileIcon from '@/assets/images/icons/fluent-emoji-flat--bust-in-silhouette.svg';


function TabLayoutContent() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuth();
  const pathname = usePathname();
  const isAdmin = useAdmin();
  const { setUser } = useUser();
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchUserData = async (token: string, userId: string) => {
    try {
      const response = await fetch(`${API_URL}/cadastro/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Atualize o contexto com os dados do usuário

        // Chama o método para desbloquear conquistas do usuário
        try {
          await desbloquearConquistasUsuario(token, userId);
          console.log('Conquistas desbloqueadas com sucesso');
        } catch (error) {
          console.error('Erro ao desbloquear conquistas:', error);
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
        router.push('/');
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataOnProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (token && userId && pathname === "/pages/profile") {
          fetchUserData(token, userId);
        }
      };

      fetchDataOnProfile();
    }, [pathname])
  );

  useEffect(() => {
    if (
      isAuthenticated === false &&
      (pathname.startsWith("/pages") ||
        pathname.startsWith("/admin-pages") ||
        pathname.startsWith("/profile-pages"))
    ) {
      router.push("/");
    }
    if (isAdmin && pathname.startsWith("/pages")) {
      router.push("/admin-pages/home");
    }
  }, [isAuthenticated, pathname, router]);

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
          title: " Início ",          tabBarIcon: () => (
            <HomeIcon width={32} height={32} />
          ),
        }}
      />      <Tabs.Screen        name="camera"
        options={{          title: " Câmera ",          tabBarIcon: () => (
            <View style={{ marginTop: -4 }}>
              <CameraIcon width={38} height={38} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Atividades ",          tabBarIcon: () => (
            <TaskIcon width={32} height={32} />
          ),
        }}
      />      <Tabs.Screen
        name="profile"
        options={{
          title: " Perfil ",
          tabBarIcon: () => (
            <ProfileIcon width={32} height={32} />
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