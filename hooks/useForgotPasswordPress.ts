import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useForgotPassword } from '@/hooks/userForgotPassword';
import { useEmailValidation } from '@/hooks/useEmailValidation';

export function useForgotPasswordPress() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { handleForgotPassword, loading } = useForgotPassword();
  const { validateEmail } = useEmailValidation();

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleForgotPasswordPress = () => {
    if (email) {
      if (!validateEmail(email)) {
        showAlert('Erro', 'Por favor, insira um email válido.');
        return;
      }
    }

    handleForgotPassword(email);
  };

  return {
    email,
    setEmail,
    handleForgotPasswordPress,
    loading,
  };
}