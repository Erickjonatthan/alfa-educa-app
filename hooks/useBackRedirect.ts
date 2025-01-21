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
        if (pathname.startsWith('/profile-pages')) {
          router.push('/pages/profile');
          return true;
        } else if (pathname.startsWith('/pages') && pathname !== '/pages/home') {
          router.push('/pages/home');
          return true;
        } else if (pathname === '/pages/home') {
          BackHandler.exitApp();
          return true;
        } else if(pathname === '/cadastro') {
          router.push('/');
          return true;
        } else if (pathname === '/forgot-password') {
          router.push('/');
          return true;
        }
        else {
          AsyncStorage.removeItem('hasSeenGif');
          BackHandler.exitApp();
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [pathname, router])
  );
}