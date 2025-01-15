import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { TextInput, ActivityIndicator, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRegister } from '@/hooks/useRegister';
import styles from './styles/register';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const { handleRegister, loading } = useRegister();
  const router = useRouter();

  const handleRegisterPress = () => {
    handleRegister(nome, email, password, confirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/alfaeduca-logo.jpg')}
          contentFit="cover"
        />

        <ThemedText type="title" style={styles.title}> Cadastro </ThemedText>
        <ThemedText type='default' style={styles.subtitle}>Bem-vindo ao AlfaEduca, aqui nós ajudamos você a explorar o mundo da alfabetização com motivação e criatividade.</ThemedText>
        <ThemedText type='default' style={styles.registerPrompt}>Nome de usuário</ThemedText>
        <TextInput
          style={[
            styles.input,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Digite seu nome e sobrenome"
          placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF89' : '#0000009C'}
          value={nome}
          onChangeText={setNome}
          keyboardType="default"
          autoCapitalize="words"
          editable={!loading}
        />
        <ThemedText type='default' style={styles.registerPrompt}>Email</ThemedText>
        <TextInput
          style={[
            styles.input,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Digite o email que você mais usa"
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
        <ThemedText type='default' style={styles.registerPrompt}>Confirmar Senha</ThemedText>
        <TextInput
          style={[
            styles.input,
            colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
          ]}
          placeholder="Confirme sua senha"
          placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF89' : '#0000009C'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          editable={!loading}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
              <ThemedText style={styles.loginButtonText}>Cadastrar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
              <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}