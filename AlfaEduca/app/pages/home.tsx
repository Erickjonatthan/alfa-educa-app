import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
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
        <ThemedText type="title" style={styles.welcomeMessage}>Bem vindo, Usuário!</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>O que vamos aprender hoje com o AlfaEduca?</ThemedText>
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
        <ThemedText style={[styles.startButtonText, isDarkMode ? styles.startButtonTextDark : styles.startButtonTextLight]}>Começar a Aprender</ThemedText>
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
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  header: {
    marginBottom: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  welcomeMessage: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
    width: '100%',
  },
  progressTitle: {
    marginBottom: 8,
  },
  progressContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressContent: {
    color: '#000',
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  startButtonDark: {
    backgroundColor: '#333',
  },
  startButtonLight: {
    backgroundColor: '#fff',
  },
  startButtonText: {
    marginLeft: 8,
  },
  startButtonTextDark: {
    color: '#fff',
  },
  startButtonTextLight: {
    color: '#000',
  },
  startButtonIcon: {
    marginRight: 8,
  },
});
