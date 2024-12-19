import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, Alert, ActivityIndicator, View, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que o pacote @expo/vector-icons está instalado

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.push('/pages/home');
        setInitialLoading(false); // Define como falso se houver token
      } else {
        setInitialLoading(false); // Define como falso se não houver token
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
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

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful', `Welcome!`);
        await AsyncStorage.setItem('token', data.token);
        router.push('/pages/home');
      } else {
        console.log('Falha no login:', data.message);
      }
    } catch (error) {
      console.log('Erro durante o login:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    // Mostra um indicador de carregamento enquanto verifica o token
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar', headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Entrar</ThemedText>
        <TextInput
          style={[
            styles.input,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Email"
          placeholderTextColor={colorScheme === 'dark' ? '#000' : '#fff'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={[
          styles.passwordContainer,
          colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
        ]}>
          <TextInput
            style={[
              styles.passwordInput,
              colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
            ]}
            placeholder="Senha"
            placeholderTextColor={colorScheme === 'dark' ? '#000' : '#fff'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Entrar" onPress={handleLogin} />
            <ThemedText style={{ textAlign: 'center' }}>ou</ThemedText>
            <Button title="Cadastrar-se" onPress={() => router.push('/cadastro')} />
          </>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40, // Definindo uma altura fixa para os inputs
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputLight: {
    backgroundColor: '#000',
    color: '#fff',
  },
  inputDark: {
    backgroundColor: '#fff',
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    height: 40, // Definindo uma altura fixa para o contêiner de senha
  },
  passwordInput: {
    flex: 1, // Faz com que o input de senha ocupe o espaço restante
  },
});