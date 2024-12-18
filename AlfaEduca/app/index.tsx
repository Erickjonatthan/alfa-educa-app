import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TextInput, Button, Alert, ActivityIndicator, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('Token encontrado:', token);
        Alert.alert('Token encontrado', token);
        router.push('/home');
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
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
        console.log('Login bem-sucedido, navegando para /tabs');
        // Armazene o token e o contaId conforme necessário
        await AsyncStorage.setItem('token', data.token);
        console.log('Token:', data.token);
        console.log('Conta ID:', data.contaId);
        router.push('/home');
      } else {
        Alert.alert('Login Failed', data.message);
        console.log('Falha no login:', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.log('Erro durante o login:', error);
    } finally {
      setLoading(false);
      console.log('Finalizando login...');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Login</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});