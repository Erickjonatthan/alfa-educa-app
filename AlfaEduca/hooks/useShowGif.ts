import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useShowGif = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasSeenGif = await AsyncStorage.getItem('hasSeenGif');
      if (hasSeenGif) {
        setShowGif(false);
      } else {
        const timer = setTimeout(() => {
          setShowGif(false);
          AsyncStorage.setItem('hasSeenGif', 'true');
        }, 5000); // 5 segundos

        return () => clearTimeout(timer);
      }
    };

    checkFirstTime();
  }, []);

  return showGif;
};