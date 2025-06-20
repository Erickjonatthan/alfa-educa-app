import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressBar } from 'react-native-paper';
import User from '@/context/User';
import styles from '../app/styles/profile';

// Importações dos ícones SVG
import GearIcon from '@/assets/images/icons/mdi--gear.svg';
import TrophyIcon from '@/assets/images/icons/fluent-emoji-flat--trophy.svg';
import UserEditIcon from '@/assets/images/icons/mingcute--user-edit-fill.svg';

interface ProfilePageProps {
  user: User | null;
  handleEditProfile: () => void;
  handleAchievements: () => void;
  handleSettings: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, handleEditProfile, handleAchievements, handleSettings }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const totalXp = user?.pontos ?? 0;
  const level = Math.floor(totalXp / 100);
  const xp = totalXp % 100;
  const xpPercentage = xp / 100;

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
      <ThemedText type="subtitle" style={styles.userLevel}>
        {' '}
        Nível: {level}{' '}
      </ThemedText>
      <ProgressBar
        progress={xpPercentage}
        color={'#FF9500FF'}
        style={styles.progressBar}
      />
      <ThemedText type="subtitle" style={styles.xpText}>
        {' '}
        XP: {xp}/100{' '}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleEditProfile}
      >
        <UserEditIcon
          width={24}
          height={24}
          style={styles.optionIcon}
        />
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
        <TrophyIcon
          width={24}
          height={24}
          style={styles.optionIcon}
        />
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
        <GearIcon
          width={24}
          height={24}
          style={styles.optionIcon}
        />
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