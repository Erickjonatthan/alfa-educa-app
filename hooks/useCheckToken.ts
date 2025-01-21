import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export function useCheckToken() {
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.push('/pages/home');
      }
      setInitialLoading(false); // Define como falso após verificar o token
    };

    checkToken();
  }, [router]);

  return initialLoading;
}