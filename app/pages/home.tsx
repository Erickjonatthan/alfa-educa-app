import React from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import HomePage from '@/components/HomePage';

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/pages/tasks');
  };

  return (
    <HomePage
      user={user}
      handleStartLearning={handleStartLearning}
    />
  );
}