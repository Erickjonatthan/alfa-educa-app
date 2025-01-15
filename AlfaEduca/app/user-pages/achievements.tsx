import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import styles from './styles/settings';
import useLogout from '@/hooks/useLogout';

export default function ProfileAchievementsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { handleLogout } = useLogout();

  return (
    <ThemedView style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <TouchableOpacity style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]} onPress={handleLogout}>
        <IconSymbol name="logout" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.optionIcon} />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}