import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const BackButton = () => {
  return (
    <View style={{ marginRight: 15 }}>
      <Link href={'/pages/profile'}>
        <IconSymbol name="arrow-back" size={24} color='#fff' />
      </Link>
    </View>
  );
};

export default BackButton;