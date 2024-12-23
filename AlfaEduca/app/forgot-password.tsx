import { useRouter } from 'expo-router';
import { TextInput, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCheckToken } from '@/hooks/useCheckToken';
import { Image } from 'expo-image';
import styles from './styles/login';
import { useForgotPassword } from '@/hooks/userForgotPassword';
import { useEmailValidation } from '@/hooks/useEmailValidation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const initialLoading = useCheckToken();
  const { handleForgotPassword, loading } = useForgotPassword();
  const { validateEmail } = useEmailValidation();

  const handleForgotPasswordPress = () => {
    if(email){
      if (!validateEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um email válido.');
        return;
      }
    }

    handleForgotPassword(email);
  };

  if (initialLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@/assets/images/alfaeduca-logo.jpg')}
        contentFit="cover"
      />
      <ThemedText type="title" style={styles.title}> Redefinir senha </ThemedText>
      <ThemedText type='default' style={styles.subtitle}>Para redefinir sua senha, digite o email que foi cadastrado com sua conta. Você receberá uma nova senha que deve ser alterada depois.</ThemedText>

      <ThemedText type='default' style={styles.registerPrompt}>Email</ThemedText>
      <TextInput
        style={[
          styles.input,
          colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
        ]}
        placeholder="Digite seu email"
        placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF89' : '#0000009C'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={handleForgotPasswordPress}>
            <ThemedText style={styles.loginButtonText}>Enviar</ThemedText>
          </TouchableOpacity>
          <ThemedText type='default' style={styles.registerPrompt}>Voltar para login?</ThemedText>
          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/')}>
            <ThemedText style={styles.registerButtonText}>Voltar</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}