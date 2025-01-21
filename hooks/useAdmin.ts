import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdminValue = await AsyncStorage.getItem('isAdmin');
        if (isAdminValue !== null) {
          setIsAdmin(JSON.parse(isAdminValue));
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Erro ao verificar status de admin:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  return isAdmin;
}