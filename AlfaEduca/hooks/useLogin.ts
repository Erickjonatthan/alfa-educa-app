import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    setLoading(true);
    console.log('Iniciando login...');
    try {
      const response = await fetch('https://alfa-educa-server.onrender.com/login', {
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
        await AsyncStorage.setItem('token', data.token);
        router.push('/pages/home');
      } else {
        console.log('Falha no login:', response.status);
        switch (response.status) {
          case 400:
            Alert.alert('Erro', 'Requisição inválida. Verifique os dados e tente novamente.');
            break;
          case 401:
            Alert.alert('Erro', 'Email ou senha inválido. Tente novamente.');
            break;
          case 500:
            Alert.alert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
            break;
        }
        console.log('Falha no login:', data.message || data);
      }
    } catch (error) {
      console.log('Erro durante o login:', error);
      Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}