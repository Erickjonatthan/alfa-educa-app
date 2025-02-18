import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import { useUser } from "@/context/UserContext"; // Importa o contexto do usuário

const useLogout = () => {
  const router = useRouter();
  const { setUser } = useUser(); // Usa o contexto do usuário

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null); // Limpa o estado do usuário
      showAlert('Logout', 'Você foi desconectado.');
      router.push('/'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return { handleLogout };
};

export default useLogout;