import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { listarAtividades } from "@/controllers/atividade/listarAtividades";
import { criarAtividade } from "@/controllers/atividade/criarAtividade";
import { ThemedView } from "@/components/ThemedView";
import Task from "@/context/Task";
import { NewTask } from "@/context/newTask";
import CreateTaskModal from "@/components/CreateTaskModal";
import styles from "../styles/manage-tasks";
import { useFocusEffect } from "expo-router";

export default function ManageTasksScreen() {
  const [atividades, setAtividades] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Partial<NewTask>>({});
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const fetchAtividades = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const data = await listarAtividades(token);
        setAtividades(data);
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

  const handleCreateTask = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erro", "Token de autenticação não encontrado.");
      return;
    }

    const novaAtividade: NewTask = {
      titulo: newTask.titulo || "",
      subtitulo: newTask.subtitulo || "",
      descricao: newTask.descricao || "",
      nivel: newTask.nivel || 0,
      pontos: newTask.pontos || 0,
      respostaCorreta: newTask.respostaCorreta || "",
    };

    try {
      const atividadeCriada = await criarAtividade(token, novaAtividade);
      Alert.alert("Sucesso", "Atividade criada com sucesso!");
      console.log("Atividade criada:", atividadeCriada);
      setShowCreateForm(false);
      setNewTask({});
      await fetchAtividades(); // Recarrega a lista de atividades após criar
    } catch (error) {
      Alert.alert("Erro", "Erro ao criar atividade.");
      console.error("Erro ao criar atividade:", error);
    }
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
            Atividades cadastradas no sistema
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Gerencie as atividades do AlfaEduca.
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
            {atividades.map((item) => (
              <View key={item.id} style={styles.taskContainer}>
                <View style={styles.taskInfoContainer}>
                  <ThemedText>{item.titulo}</ThemedText>
                  <ThemedText>{item.subtitulo}</ThemedText>
                  <ThemedText>{item.descricao}</ThemedText>
                  <ThemedText>Nível: {item.nivel}</ThemedText>
                  <ThemedText>Pontos: {item.pontos}</ThemedText>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setShowCreateForm(true)}
            >
              <ThemedText style={styles.buttonText}>
                Adicionar
              </ThemedText>
            </TouchableOpacity>
            <CreateTaskModal
              visible={showCreateForm}
              onClose={() => setShowCreateForm(false)}
              onCreate={handleCreateTask}
              newTask={newTask}
              setNewTask={setNewTask}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
