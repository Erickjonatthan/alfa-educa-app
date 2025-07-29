import { ActivityIndicator } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { useCheckToken } from '@/hooks/useCheckToken';
import LoginForm from '@/components/LoginForm';
import styles from './styles/login';

export default function LoginScreen() {
  const initialLoading = useCheckToken();

  if (initialLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFFFF" />
      </ThemedView>
    );
  }

  return <LoginForm />;
}