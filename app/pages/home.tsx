import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import styles from '../styles/home';
import { useUser } from '@/context/UserContext';

export default function HomeScreen() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/pages/tasks');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/alfaeduca-lateral.png')}
          style={styles.logoImage}
        />
      </View>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.welcomeMessage}>Bem vindo, {user ? user.nome : 'Usuário'}!</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          O que vamos aprender hoje com o AlfaEduca?
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.progressSection}>
        <ThemedText type="subtitle" style={styles.progressTitle}>Onde você parou:</ThemedText>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressContent}>Ainda não começou com as atividades</ThemedText>
        </View>
      </ThemedView>
      <TouchableOpacity
        style={[styles.startButton, isDarkMode ? styles.startButtonDark : styles.startButtonLight]}
        onPress={handleStartLearning}
      >
        <IconSymbol name="play" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.startButtonIcon} />
        <ThemedText style={[styles.startButtonText, isDarkMode ? styles.startButtonTextDark : styles.startButtonTextLight]}>
          Começar a Aprender
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}