import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import styles from './style';

export default function CameraUser() {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [text, setText] = useState('');
  const [fontsLoaded] = Font.useFonts({
    'DancingScript': require('./assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf'), // Substitua pelo caminho correto da fonte
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos de permissão para abrir a câmera</Text>
        <Button onPress={requestPermission} title="permitir" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setIsFrontCamera(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CameraView style={styles.camera} facing={isFrontCamera ? 'front' : 'back'} />
      <View style={styles.overlay}>
        {text.split('').map((char, index) => (
          <Text key={index} style={[styles.letter, { fontFamily: 'DancingScript' }]}>{char}</Text>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o texto aqui"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Inverter a Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}