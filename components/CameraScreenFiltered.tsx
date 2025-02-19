import React, { useState, useRef, useCallback } from "react";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
import { extrairTextoComImagem } from "@/controllers/camera/cameraController";
import styles from "@/app/styles/CameraScreenFiltered";

interface CameraScreenFilteredProps {
  route: {
    params: {
      filterWord: string;
    };
  };
  onCapture: (capturedText: string) => void; // Adicionando a propriedade onCapture
}

export default function CameraScreenFiltered({ route, onCapture }: CameraScreenFilteredProps) {
  const { filterWord } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [syllabifiedText, setSyllabifiedText] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useFocusEffect(
    useCallback(() => {
      if (!permission) {
        requestPermission();
      }
    }, [permission])
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos de permissão para abrir a câmera
        </Text>
        <Button onPress={requestPermission} title="permitir" />
      </View>
    );
  }

  const takePicture = async () => {
    console.log("Tirando foto...");
    setLoading(true);

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });

      if (photo && photo.base64) {
        console.log(
          `Tamanho do base64 original: ${photo.base64.length} caracteres`
        );

        // Reduzir a qualidade e a resolução da imagem
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 500, height: 400 } }],
          {
            compress: 0.15,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        if (manipulatedImage && manipulatedImage.base64) {
          console.log(
            `Tamanho do base64 manipulado: ${manipulatedImage.base64.length} caracteres`
          );
          setPhoto(manipulatedImage);
          try {
            const { extractedText, syllabifiedText } = await extrairTextoComImagem(manipulatedImage);
            setExtractedText(extractedText);
            setSyllabifiedText(syllabifiedText);
            if (extractedText) {
              onCapture(extractedText); // Chame a função onCapture com o texto extraído
            }
          } catch (error) {
            console.error("Erro ao extrair texto:", error);
          }
        }
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} />
        <View style={styles.overlay}>
          {filterWord.split("").map((char, index) => (
            <Text
              key={index}
              style={
                filterWord.length > 5
                  ? styles.smallLetter
                  : styles.letter
              }
            >
              {char}
            </Text>
          ))}
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFAA00FF" />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}
        >
          <Text style={styles.text}>Tirar Foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}