import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSettingsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout', 'Você foi desconectado.');
      router.push('/'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Link href={'/pages/profile'}><IconSymbol name="arrow-back" size={24} color={isDarkMode ? "#fff" : "#000"} /></Link>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>Configurações</ThemedText>
      </ThemedView>
      <TouchableOpacity style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]} onPress={handleLogout}>
        <IconSymbol name="logout" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.optionIcon} />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>Logout</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#280F2BFF',
  },
  containerLight: {
    backgroundColor: '#FCE6FFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
  optionContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row', // Adicione esta linha para alinhar o ícone e o texto na horizontal
  },
  optionContainerDark: {
    backgroundColor: '#333',
  },
  optionContainerLight: {
    backgroundColor: '#fff',
  },
  optionText: {
    marginLeft: 8, // Adicione esta linha para adicionar espaço entre o ícone e o texto
  },
  optionTextDark: {
    color: '#fff',
  },
  optionTextLight: {
    color: '#000',
  },
  optionIcon: {
    marginRight: 8, // Adicione esta linha para adicionar espaço entre o ícone e o texto
  },
});