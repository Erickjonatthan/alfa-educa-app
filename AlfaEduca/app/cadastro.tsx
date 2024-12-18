import { router, Stack } from 'expo-router';
import { StyleSheet, TextInput, Button, ActivityIndicator, View, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();

  const handleRegister = async () => {
    if (!nome || !email || !password) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://alfa-educa-server.onrender.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome, email: email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        console.log('Falha no cadastro:', data.message);
      }
    } catch (error) {
      console.log('Erro durante o cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Cadastro', headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Cadastro</ThemedText>
        <TextInput
          style={[
            styles.input,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Nome"
          placeholderTextColor={colorScheme === 'dark' ? '#000' : '#fff'}
          value={nome}
          onChangeText={setNome}
        />
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
          <Button title="Cadastrar" onPress={handleRegister} />
          <Button title="Voltar" onPress={() => router.push('./')} />
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