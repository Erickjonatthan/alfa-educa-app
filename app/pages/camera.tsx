import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import styles from "../styles/camera";
import { extractText } from "@/controllers/camera/cameraController";
import * as Speech from "expo-speech";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [syllabifiedText, setSyllabifiedText] = useState<string | null>(null);
  const [showCameraWithText, setShowCameraWithText] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const [showResetButton, setShowResetButton] = useState<boolean>(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

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
          await extractText(
            manipulatedImage,
            setLoading,
            setExtractedText,
            setSyllabifiedText
          );
        }
      }
    }
  };

  const resetCamera = () => {
    setPhoto(null);
    setLoading(false);
    setExtractedText(null);
    setSyllabifiedText(null);
    setShowCameraWithText(false);
    setShowResetButton(false);
  };

  const goBack = () => {
    setShowCameraWithText(false);
  };

  const spellOut = (text: string) => {
    Speech.speak(text, { language: "pt-BR", pitch: 1, rate: 1 });
  };

  const spellOutSyllabified = (text: string) => {
    const syllables = text.split("-");
    let index = 0;

    const speakNextSyllable = () => {
      if (index < syllables.length) {
        Speech.speak(syllables[index], {
          language: "pt-BR",
          pitch: 1,
          rate: 0.8, // Ligeiramente mais devagar para melhor compreensão
          onDone: () => {
            index++;
            setTimeout(speakNextSyllable, 500); // Pausa de 0.5s entre sílabas
          },
        });
      }
    };

    // Começa a falar as sílabas
    speakNextSyllable();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/alfaeduca-lateral.png")}
          style={styles.logoImage}
        />
      </View>
      <ThemedView style={styles.contentContainer}>
        {!photo ? (
          <>
            <ThemedText type="title" style={styles.centerText}>
              Que palavra é essa?
            </ThemedText>
            <ThemedText type="subtitle" style={styles.centerText}>
              Tire foto do que você está com dificuldade de ler ou escrever.
            </ThemedText>
            <View style={styles.cameraContainer}>
              <CameraView style={styles.camera} ref={cameraRef} />
              {showCameraWithText && (
                <View style={styles.overlay}>
                  {extractedText?.split("").map((char, index) => (
                    <Text
                      key={index}
                      style={
                        extractedText.length > 10
                          ? styles.smallLetter
                          : styles.letter
                      }
                    >
                      {char}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
              disabled={loading}
            >
              <Text style={styles.text}>Pronto</Text>
            </TouchableOpacity>
          </>
        ) : showCameraWithText ? (
          <>
            <ThemedText type="title" style={styles.centerText}>
              Caligrafia
            </ThemedText>
            <ThemedText type="subtitle" style={styles.centerText}>
              Apoie seu celular de forma que você consiga escrever o que está
              escrito na câmera:
            </ThemedText>
            <View style={styles.cameraContainer}>
              <CameraView style={styles.camera} ref={cameraRef} />
              <View style={styles.overlay}>
                {extractedText
                  ?.split(" ")[0]
                  .split("")
                  .map((char, index) => (
                    <Text
                      key={index}
                      style={
                        extractedText.length > 10
                          ? styles.smallLetter
                          : styles.letter
                      }
                    >
                      {char}
                    </Text>
                  ))}
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={goBack}>
              <Text style={styles.text}>Voltar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ThemedText type="title" style={styles.centerText}>
              Sua foto:
            </ThemedText>
            <Image
              source={{ uri: `data:image/jpeg;base64,${photo.base64}` }}
              style={styles.manipulatedImage}
            />
            {loading && (!extractText || !syllabifiedText) && (
              <>
                <ActivityIndicator size="large" color="#FFAA00FF" />
                <Text style={styles.loadingText}>Extraindo texto...</Text>
              </>
            )}

            {extractedText && syllabifiedText && (
              <>
                {extractedText === "erro" || syllabifiedText === "erro" ? (
                  <ThemedText type="title" style={styles.errorText}>
                    Erro ao extrair texto, tente novamente.
                  </ThemedText>
                ) : (
                  <>
                    <ThemedText type="title" style={styles.centerText}>
                      Essa é a palavra:
                    </ThemedText>
                    <View style={styles.textContainer}>
                      <ThemedText type="subtitle" style={styles.centerText}>
                        {extractedText}
                      </ThemedText>
                      <TouchableOpacity
                        onPress={() => extractedText && spellOut(extractedText)}
                      >
                        <Text style={styles.icon}>🔊</Text>
                      </TouchableOpacity>
                    </View>
                    {syllabifiedText && (
                      <View style={styles.textContainer}>
                        <ThemedText type="subtitle" style={styles.centerText}>
                          {syllabifiedText}
                        </ThemedText>
                        <TouchableOpacity
                          onPress={() =>
                            syllabifiedText &&
                            spellOutSyllabified(syllabifiedText)
                          }
                        >
                          <Text style={styles.icon}>🔊</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.iconContainer}>
                      <TouchableOpacity
                        onPress={() => setShowCameraWithText(true)}
                      >
                        <Text style={styles.icon}>✏️</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </>
        )}
        {loading && photo && (extractedText || syllabifiedText) && (
          <TouchableOpacity style={styles.button} onPress={resetCamera}>
            <Text style={styles.text}>Tentar Novamente</Text>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ScrollView>
  );
}
