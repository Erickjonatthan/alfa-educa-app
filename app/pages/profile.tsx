import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useFocusEffect, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useState } from "react";
import styles from "../styles/profile";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/context/User";
import { enviarImagem } from "@/controllers/usuario/usuarioController";

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const [image, setImage] = useState<string | null>(user?.imgPerfil || null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();
  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleEditProfile = () => {
    router.push("/");
  };

  const handleAchievements = () => {
    router.push("/profile-pages/achievements");
  };

  const handleSettings = () => {
    router.navigate("/profile-pages/settings");
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setTempImage(null); // Limpa a imagem temporária quando a tela perde o foco
        setBase64Image(null); // Limpa a imagem base64 quando a tela perde o foco
      };
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true, // Ativa o Base64 para facilitar o envio
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setTempImage(result.assets[0].uri); // Configura a imagem temporária para exibição
      setBase64Image(result.assets[0].base64 ?? null); // Configura a imagem em Base64
    } else {
      Alert.alert("Aviso", "Nenhuma imagem foi selecionada.");
    }
  };
  const handleEnviarImagem = () => {
    enviarImagem(base64Image, user, setUser, setImage, setTempImage, setBase64Image);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Perfil
        </ThemedText>
      </ThemedView>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            tempImage
              ? { uri: tempImage }
              : user?.imgPerfil
              ? {
                  uri: user.imgPerfil.startsWith("data:image")
                    ? user.imgPerfil
                    : `data:image/jpeg;base64,${user.imgPerfil}`,
                }
              : require("@/assets/images/default-profile.png")
          }
          style={styles.profileImage}
        />
      </View>
      <ThemedText type="subtitle" style={styles.userName}>
        {user ? user.nome : "Usuário"}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={pickImage}
      >
        <IconSymbol
          name="user-edit"
          size={20}
          color={isDarkMode ? "#fff" : "#000"}
          style={styles.optionIcon}
        />
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Editar perfil
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleEnviarImagem}
      >
        <IconSymbol
          name="user-edit"
          size={20}
          color={isDarkMode ? "#fff" : "#000"}
          style={styles.optionIcon}
        />
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Enviar Imagem
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleAchievements}
      >
        <IconSymbol
          name="trophy"
          size={20}
          color={isDarkMode ? "#fff" : "#000"}
          style={styles.optionIcon}
        />
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Conquistas
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleSettings}
      >
        <IconSymbol
          name="settings"
          size={20}
          color={isDarkMode ? "#fff" : "#000"}
          style={styles.optionIcon}
        />
        <ThemedText
          style={[
            styles.optionText,
            isDarkMode ? styles.optionTextDark : styles.optionTextLight,
          ]}
        >
          Configurações
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}