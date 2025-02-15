import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { listarAtividades } from "@/controllers/atividade/listarAtividades";
import { listarResposta } from "@/controllers/resposta/listarResposta";
import { ThemedView } from "@/components/ThemedView";
import Task from "@/context/Task";
import Answer from "@/context/Answer";
import TaskModal from "@/components/TaskModal";
import styles from "../styles/tasks";

export default function TasksScreen() {
  const [atividades, setAtividades] = useState<Task[]>([]);
  const [respostas, setRespostas] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();

  const fetchAtividades = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const data = await listarAtividades(token);
        setAtividades(data);
        const respostasData = await listarResposta(token);
        setRespostas(respostasData);
      }
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAtividades();
    }, [])
  );

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handlePlay = () => {
    if (selectedTask) {
      closeModal();
      router.push({
        pathname: "/task-page/task",
        params: { task: JSON.stringify(selectedTask) },
      });
    }
  };

  const isTaskFinalizada = (taskId: string) => {
    return respostas.some(
      (resposta) => resposta.atividadeId === taskId && resposta.finalizada
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
        ]}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.welcomeMessage}>
            Atividades
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Aqui você encontra todas as atividades disponíveis para você.
          </ThemedText>
        </ThemedView>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingContainer}
          />
        ) : (
          <>
            {atividades.map((item) => {
              const finalizada = isTaskFinalizada(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.taskContainer,
                    finalizada && styles.taskContainerFinalizada,
                  ]}
                  onPress={() => !finalizada && openModal(item)}
                  disabled={finalizada}
                >
                  <View style={styles.taskInfoContainer}>
                    <ThemedText>{item.titulo}</ThemedText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
      <TaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={closeModal}
        onPlay={handlePlay}
      />
    </ScrollView>
  );
}