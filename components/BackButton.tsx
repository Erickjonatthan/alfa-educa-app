import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const BackButton = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={{ marginRight: 15 }}>
      <TouchableOpacity onPress={handleBackPress}>
        <IconSymbol name="arrow-back" size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;