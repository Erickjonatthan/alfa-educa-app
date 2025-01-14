import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { SymbolWeight } from 'expo-symbols';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'user-alt': 'user-alt',
  'logout': 'logout',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING | 'task.fill' | 'user-alt' | 'camera' | 'settings' | 'user-edit' | 'trophy' | 'arrow-back' | 'logout';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  if (name === 'task.fill') {
    return <FontAwesome5 name="tasks" size={size} color={color} style={style} />;
  }
  if (name === 'user-alt') {
    return <FontAwesome5 name="user-alt" size={size} color={color} style={style} />;
  }
  if (name === 'camera') {
    return <FontAwesome5 name="camera" size={size} color={color} style={style} />;
  }
  if (name === 'settings') {
    return <Feather name="settings" size={size} color={color} style={style} />;
  }
  if (name === 'user-edit') {
    return <FontAwesome5 name="user-edit" size={size} color={color} style={style} />;
  }
  if (name === 'trophy') {
    return <AntDesign name="Trophy" size={size} color={color} style={style} />;
  }
  if (name === 'arrow-back') {
    return <Ionicons name="arrow-back" size={size} color={color} style={style} />;
  }
  if (name === 'play') { 
    return <FontAwesome5 name="play" size={size} color={color} style={style} />;
  }
  if (name === 'logout') {
    return <MaterialIcons name="logout" size={size} color={color} style={style} />;
  }
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}