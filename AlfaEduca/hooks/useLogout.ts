import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const useLogout = () => {
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

  return { handleLogout };
};

export default useLogout;