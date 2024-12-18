import { StyleSheet, ScrollView, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/');
  };

  const handleAchievements = () => {
    router.push('/'); 
  };

  const handleSettings = () => {
    router.navigate('/user-pages/settings');  
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Perfil</ThemedText>
      </ThemedView>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('@/assets/images/default-profile.png')}
          style={styles.profileImage}
        />
      </View>
      <ThemedText type="subtitle" style={styles.userName}>Nome do Usuário</ThemedText>
      <TouchableOpacity
        style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]}
        onPress={handleEditProfile}
      >
        <IconSymbol name="user-edit" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.optionIcon} />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>Editar perfil</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]}
        onPress={handleAchievements}
      >
        <IconSymbol name="trophy" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.optionIcon} />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>Conquistas</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]}
        onPress={handleSettings}
      >
        <IconSymbol name="settings" size={20} color={isDarkMode ? "#fff" : "#000"} style={styles.optionIcon} />
        <ThemedText style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>Configurações</ThemedText>
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
    marginBottom: 16,
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginBottom: 16,
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