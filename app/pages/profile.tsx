import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useState } from "react";
import styles from "../styles/profile";
import { useUser } from "@/context/UserContext";
import { ProgressBar } from "react-native-paper";

// Importações dos ícones SVG
import GearIcon from "@/assets/images/icons/mdi--gear.svg";
import TrophyIcon from "@/assets/images/icons/fluent-emoji-flat--trophy.svg";
import UserEditIcon from "@/assets/images/icons/mingcute--user-edit-fill.svg";

export default function ProfileScreen() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/profile-pages/edit-profile");
  };

  const handleAchievements = () => {
    router.push("/profile-pages/achievements");
  };

  const handleSettings = () => {
    router.navigate("/profile-pages/settings");
  };

  const totalXp = user?.pontos ?? 0;
  const level = Math.floor(totalXp / 100);
  const xp = totalXp % 100;
  const xpPercentage = xp / 100; // Calcula a porcentagem de XP

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
            user?.imgPerfil
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
      <ThemedText type="subtitle" style={styles.userLevel}>
        {" "}
        Nível: {level}{" "}
      </ThemedText>
      <ProgressBar
        progress={xpPercentage}
        color={"#FF9500FF"}
        style={styles.progressBar}
      />
      <ThemedText type="subtitle" style={styles.xpText}>
        {" "}
        XP: {xp}/100{" "}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.optionContainer,
          isDarkMode ? styles.optionContainerDark : styles.optionContainerLight,
        ]}
        onPress={handleEditProfile}
      >
        <UserEditIcon
          width={24}
          height={24}
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
        onPress={handleAchievements}
      >
        <TrophyIcon
          width={24}
          height={24}
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
        <GearIcon
          width={24}
          height={24}
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
