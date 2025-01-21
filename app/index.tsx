import { useRouter } from 'expo-router';
import { TextInput, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useLogin } from '@/hooks/useLogin';
import { useShowGif } from '@/hooks/useShowGif';
import { Image } from 'expo-image';
import styles from './styles/login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const initialLoading = useCheckToken();
  const { handleLogin, loading } = useLogin();
  const showGif = useShowGif();

  const handleLoginPress = () => {
    handleLogin(email, password);
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
      {showGif ? (
        <Image
          style={styles.logo}
          source={require('@/assets/images/alfaeduca.gif')}
          contentFit="cover"
        />
      ) : (
        <Image
          style={styles.logo}
          source={require('@/assets/images/alfaeduca-logo.jpg')}
          contentFit="cover"
        />
      )}
      <ThemedText type="title" style={styles.title}> Entrar </ThemedText>
      <ThemedText type='default' style={styles.subtitle}>Continue sua jornada de aprendizado e descubra novas conquistas hoje!</ThemedText>

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
      <ThemedText type='default' style={styles.registerPrompt}>Senha</ThemedText>
      <View style={[
        styles.passwordContainer,
        colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
      ]}>
        <TextInput
          style={[
            styles.passwordInput,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Digite sua senha"
          placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF89' : '#0000009C'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ width: '100%' }} onPress={() => router.push('/forgot-password')}>
        <ThemedText type='link' style={styles.forgotPassword}>Esqueceu sua senha?</ThemedText>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
          </TouchableOpacity>
          <ThemedText type='default' style={styles.registerPrompt}>Ainda não possui uma conta?</ThemedText>
          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/cadastro')}>
            <ThemedText style={styles.registerButtonText}>Cadastrar-se</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}