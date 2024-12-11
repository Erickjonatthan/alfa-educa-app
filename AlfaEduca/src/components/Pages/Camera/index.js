import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './style';
import BottomNavigation from '../../BottomNavigation';

export default function CameraUser({navigation}) {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [text, setText] = useState('');

  useEffect(() => {
    return () => {
      // Limpa a câmera quando o componente for desmontado
      setIsFrontCamera(false);
    };
  }, []);

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
          <Text key={index} style={styles.letter}>{char}</Text>
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
      <BottomNavigation navigation={navigation} />
    </View>
  );
}