import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      showAlert('Erro', 'O campo de email é obrigatório!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://alfa-educa-server.onrender.com/login/recuperar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        showAlert('Sucesso', 'Um email com instruções para redefinir sua senha foi enviado.');
        router.push('/');
      } else {
        console.log('Falha ao enviar email:', response.status);
        switch (response.status) {
          case 400:
            showAlert('Erro', 'Requisição inválida. Verifique os dados e tente novamente.');
            break;
          case 404:
            showAlert('Erro', 'Email não encontrado. Verifique o email e tente novamente.');
            break;
          case 500:
            showAlert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            showAlert('Erro', 'Ocorreu um erro. Tente novamente.');
            break;
        }
        console.log('Falha ao enviar email:', data.message || data);
      }
    } catch (error) {
      console.log('Erro durante o envio do email:', error);
      showAlert('Erro', 'Ocorreu um erro ao enviar o email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading };
}