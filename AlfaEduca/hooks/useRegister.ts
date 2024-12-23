import { useState } from 'react';
import { Alert } from 'react-native';
import { useLogin } from './useLogin'; // Importe a função useLogin

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useLogin(); // Obtenha a função handleLogin

  const isPasswordStrong = (password: string) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleRegister = async (nome: string, email: string, password: string, confirmPassword: string) => {
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!isPasswordStrong(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não são iguais.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://alfa-educa-server.onrender.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha: password }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.status === 201) {
        await handleLogin(email, password); // Chame a função handleLogin após o cadastro
      } else {
        console.log('Falha no cadastro:', response.status);
        switch (response.status) {
          case 400:
            Alert.alert('Erro', 'Requisição inválida. Verifique os dados e tente novamente.');
            break;
          case 409:
            Alert.alert('Erro', 'Email já cadastrado. Tente novamente com outro email.');
            break;
          case 500:
            Alert.alert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
            break;
        }
        console.log('Falha no cadastro:', data.message || data);
      }
    } catch (error) {
      console.log('Erro durante o cadastro:', error);
      Alert.alert('Erro', 'Ocorreu um erro durante o cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}