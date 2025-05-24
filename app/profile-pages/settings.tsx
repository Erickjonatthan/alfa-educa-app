import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import styles from '../styles/settings';
import useLogout from '@/hooks/useLogout';
import ExitIcon from '@/assets/images/icons/vaadin--exit-o.svg';

export default function ProfileSettingsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { handleLogout } = useLogout();

  return (
    <ThemedView style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <TouchableOpacity style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]} onPress={handleLogout}>
        <ExitIcon 
          width={20} 
          height={20} 
          style={styles.optionIcon}
        />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>
          Sair
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}