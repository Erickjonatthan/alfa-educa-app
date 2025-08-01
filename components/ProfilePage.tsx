import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import User from '@/context/User';
import styles from '../app/styles/profile';

interface ProfilePageProps {
  user: User | null;
  handleEditProfile: () => void;
  handleSettings: () => void;
  handleAchievements: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, handleEditProfile, handleSettings, handleAchievements }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/alfaeduca-lateral.png')}
          style={styles.logoImage}
        />
      </View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Perfil
        </ThemedText>
      </ThemedView>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            user?.imgPerfil
              ? {
                  uri: user.imgPerfil.startsWith('data:image')
                    ? user.imgPerfil
                    : `data:image/jpeg;base64,${user.imgPerfil}`,
                }
              : require('@/assets/images/default-profile.png')
          }
          style={styles.profileImage}
        />
      </View>
      <ThemedText type="subtitle" style={styles.userName}>
        {user ? user.nome : 'Usuário'}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleEditProfile}
      >
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Editar perfil
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleAchievements}
      >
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Conquistas
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleSettings}
      >
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Configurações
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;