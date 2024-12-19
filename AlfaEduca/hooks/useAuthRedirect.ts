import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isAuthenticated === false && (pathname.startsWith('/pages') || pathname.startsWith('/user-pages'))) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (pathname.startsWith('/user-pages')) {
          router.push('/pages/profile');
          return true;
        } else if (pathname.startsWith('/pages') && pathname !== '/pages/home') {
          router.push('/pages/home');
          return true;
        } else if (pathname === '/pages/home') {
          BackHandler.exitApp();
          return true;
        } else {
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