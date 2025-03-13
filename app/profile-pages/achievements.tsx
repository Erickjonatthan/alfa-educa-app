import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import styles from "../styles/settings";
import { listarConquistaUsuario } from "@/controllers/conquista/listarConquistaUsuario";
import { listarTodasConquistas } from "@/controllers/conquista/listarTodasConquistas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Achievement from "@/context/Achievement";
import { useAdmin } from "@/hooks/useAdmin";
import CreateAchievementModal from "@/components/CreateAchievementModal";
import { criarConquista } from "@/controllers/conquista/criarConquista";
import { useFocusEffect } from "expo-router";

export default function ProfileAchievementsScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateAchievementForm, setShowCreateAchievementForm] = useState<boolean>(false);
  const isAdmin = useAdmin();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (token && userId) {
        const conquistas = await listarConquistaUsuario(token, userId);
        setAchievements(conquistas);

        if (isAdmin) {
          const todasConquistas = await listarTodasConquistas(token);
          setAllAchievements(todasConquistas);
        }
      } else {
        Alert.alert(
          "Erro",
          "Token de autenticação ou ID de usuário não encontrado."
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao listar conquistas do usuário.");
      console.error("Erro ao listar conquistas do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAchievements();
    }, [isAdmin])
  );

  const handleCreateAchievement = async (achievement: { titulo: string; descricao: string; imgConquista: string }) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erro", "Token de autenticação não encontrado.");
      return;
    }

    try {
      const conquistaCriada = await criarConquista(token, achievement);
      Alert.alert("Sucesso", "Conquista criada com sucesso!");
      console.log("Conquista criada:", conquistaCriada);
      setShowCreateAchievementForm(false);
      // Recarregar as conquistas após criar uma nova
      const todasConquistas = await listarTodasConquistas(token);
      setAllAchievements(todasConquistas);
    } catch (error) {
      Alert.alert("Erro", "Erro ao criar conquista.");
      console.error("Erro ao criar conquista:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingContainer}
          />
        ) : (
          <>
            {achievements.length > 0 && (
              <>
                <ThemedText
                  style={[
                    styles.sectionTitle,
                    isDarkMode ? styles.sectionTitleDark : styles.sectionTitleLight,
                  ]}
                >
                  Suas Conquistas{" "}
                </ThemedText>
                {achievements.map((item) => (
                  <View key={item.id} style={styles.taskContainer}>
                    <View style={styles.taskInfoContainer}>
                      <Image
                        source={{ uri: `data:image/png;base64,${item.imgConquista}` }}
                        style={styles.achievementImage}
                      />
                      <View>
                        <ThemedText>{item.titulo}</ThemedText>
                        <ThemedText>{item.descricao}</ThemedText>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}

            {isAdmin && allAchievements.length >= 0 && (
              <>
                <ThemedText
                  style={[
                    styles.sectionTitle,
                    isDarkMode
                      ? styles.sectionTitleDark
                      : styles.sectionTitleLight,
                  ]}
                >
                  Gerenciar Conquistas{" "}
                </ThemedText>
                {allAchievements.map((item) => (
                  <View key={item.id} style={styles.taskContainer}>
                    <View style={styles.taskInfoContainer}>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${item.imgConquista}`,
                        }}
                        style={styles.achievementImage}
                      />
                      <View>
                        <ThemedText>{item.titulo}</ThemedText>
                        <ThemedText>{item.descricao}</ThemedText>
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => setShowCreateAchievementForm(true)}
                >
                  <ThemedText style={styles.buttonText}>
                    Adicionar Conquista </ThemedText>
                </TouchableOpacity>
                <CreateAchievementModal
                  visible={showCreateAchievementForm}
                  onClose={() => setShowCreateAchievementForm(false)}
                  onCreate={handleCreateAchievement}
                />
              </>
            )}
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}