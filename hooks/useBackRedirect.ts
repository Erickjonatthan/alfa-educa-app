import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useBackRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (pathname.startsWith('/profile-pages') || 
            (pathname.startsWith('/pages') && pathname !== '/pages/home') || 
            pathname === '/cadastro' || 
            pathname === '/forgot-password' || 
            (pathname.startsWith('/admin-pages') && pathname !== '/admin-pages/home')) {
          router.back();
        } else if (pathname === '/pages/home' || pathname.startsWith('/admin-pages/home')) {
          BackHandler.exitApp();
        } else {
          AsyncStorage.removeItem('hasSeenGif');
          BackHandler.exitApp();
        }
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [pathname, router])
  );
}