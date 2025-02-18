import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Task from "@/context/Task";
import { criarResposta } from "@/controllers/resposta/criarResposta";
import styles from "../styles/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityScreen() {
  const { task } = useLocalSearchParams<{ task: string }>();
  const router = useRouter();
  const parsedTask: Task = JSON.parse(task);

  const [resposta, setResposta] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSendResponse = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = await AsyncStorage.getItem("token");
      const usuarioID = await AsyncStorage.getItem("userId");
      if (token && usuarioID) {
        const respostaCriada = await criarResposta(token, resposta, parsedTask.id, usuarioID);
        if (respostaCriada.finalizada) {
          console.log("Tarefa finalizada!");
          router.back();
        } else {
          setIsError(true);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.createTaskTitle}>{parsedTask.titulo}</Text>
        <Text style={styles.subtitle}>{parsedTask.subtitulo}</Text>
        <TextInput
          style={[styles.input, isError && { borderColor: 'red', borderWidth: 1 }]}
          placeholder="Escreva sua resposta aqui"
          value={resposta}
          onChangeText={setResposta}
        />
        {isError && <Text style={{ color: 'red', marginTop: 5 }}>Ops! Resposta incorreta, tente novamente.</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSendResponse} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar Resposta</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={isLoading}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}