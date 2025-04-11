import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { API_URL } from "@/constants/ApiUrl";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      showAlert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    setLoading(true);
    console.log('Iniciando login...');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email, senha: password }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        const { dadosToken, isAdmin } = data;
        await AsyncStorage.setItem('token', dadosToken.token);
        await AsyncStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        await AsyncStorage.setItem('userId', dadosToken.contaId);
        console.log('isAdmin:', isAdmin);
        if(isAdmin) {
          router.navigate('/admin-pages/home');
        } else {
          router.push('/pages/home');
        }
      } else {
        console.log('Falha no login:', response.status);
        switch (response.status) {
          case 400:
            showAlert('Erro', 'Requisição inválida. Verifique os dados e tente novamente.');
            break;
          case 401:
            showAlert('Erro', 'Email ou senha inválido. Tente novamente.');
            break;
          case 500:
            showAlert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            showAlert('Erro', 'Ocorreu um erro. Tente novamente.');
            break;
        }
        console.log('Falha no login:', data.message || data);
      }
    } catch (error) {
      console.log('Erro durante o login:', error);
      showAlert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}