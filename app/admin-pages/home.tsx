import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import styles from '../styles/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/context/UserContext';

export default function HomeScreen() {
  const { user, setUser } = useUser(); 
  const [initialLoading, setInitialLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/admin-pages/manage-tasks');
  };

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
        setUser(userData);
      } else {
        console.log('Falha ao buscar dados do administrador:', response.status);
      }
    } catch (error) {
      console.log('Erro ao buscar dados do administrador:', error);
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
        console.log('Token ou userId é nulo');
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  if (initialLoading) {
    return (
      <ThemedView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/alfaeduca-lateral.png')}
          style={styles.logoImage}
        />
      </View>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.welcomeMessage}>Bem vindo, {user ? user.nome : 'Administrador'}!</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Gerencie as atividades e usuários no AlfaEduca
        </ThemedText>
      </ThemedView>
      <TouchableOpacity
        style={[styles.startButton, isDarkMode ? styles.startButtonDark : styles.startButtonLight]}
        onPress={handleStartLearning}
      >
        <IconSymbol name="play" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.startButtonIcon} />
        <ThemedText style={[styles.startButtonText, isDarkMode ? styles.startButtonTextDark : styles.startButtonTextLight]}>
          Gerenciar Atividades
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}