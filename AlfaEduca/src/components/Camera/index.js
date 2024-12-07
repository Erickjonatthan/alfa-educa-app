import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

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
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
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
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 0.5, // Ocupa metade da tela
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%', // Mesma altura da visualização da câmera
    flexDirection: 'row', // Alinha as letras lado a lado
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Fundo semi-transparente
  },
  letter: {
    fontSize: 100,
    color: 'black',
    opacity: 0.5, // Letras semi-transparentes

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});