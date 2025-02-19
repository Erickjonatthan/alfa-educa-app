import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Task from "@/context/Task";
import { criarResposta } from "@/controllers/resposta/criarResposta";
import { listarResposta } from "@/controllers/resposta/listarResposta";
import styles from "../styles/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CameraScreenFiltered from "@/components/CameraScreenFiltered"; // Importando o componente da câmera

export default function ActivityScreen() {
  const { task } = useLocalSearchParams<{ task: string }>();
  const router = useRouter();
  const parsedTask: Task = JSON.parse(task || '{}');
  const [resposta, setResposta] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);

  useEffect(() => {
    const fetchAttemptCount = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const respostas = await listarResposta(token);
          const taskRespostas = respostas.filter((resposta: any) => resposta.atividadeId === parsedTask.id);
          setAttemptCount(taskRespostas.length);
        }
      } catch (error) {
        console.error("Erro ao buscar tentativas:", error);
      }
    };

    fetchAttemptCount();
  }, [parsedTask.id]);

  useEffect(() => {
    const showAlertIfNeeded = async () => {
      const alertShown = await AsyncStorage.getItem(`alertShown_${parsedTask.id}`);
      if (attemptCount >= 3 && !alertShown) {
        Alert.alert(
          "Dificuldades?",
          "Você está com dificuldades? Volte para a tela inicial e veja a resposta correta.",
          [
            {
              text: "OK",
              onPress: () => {
                AsyncStorage.setItem(`alertShown_${parsedTask.id}`, "true");
                router.push('/pages/tasks');
              },
            },
          ]
        );
      }
    };

    showAlertIfNeeded();
  }, [attemptCount, parsedTask.id, router]);


  const handleSendResponse = async () => {
    if (resposta.trim() === "") {
      Alert.alert("Erro", "A resposta não pode estar vazia.");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    try {
      const token = await AsyncStorage.getItem("token");
      const usuarioID = await AsyncStorage.getItem("userId");
      if (token && usuarioID) {
        const respostaCriada = await criarResposta(token, resposta, parsedTask.id || '', usuarioID);
        if (respostaCriada.finalizada) {
          console.log("Tarefa finalizada!");
          router.back();
        } else {
          setIsError(true);
          setAttemptCount(prevCount => prevCount + 1);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
      setIsError(true);
      setAttemptCount(prevCount => prevCount + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCapture = (capturedText: string) => {
    setResposta(capturedText);
    setIsCaptured(true);
    console.log("Texto capturado:", capturedText);
  };

  return (
    <View style={styles.containertask}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{parsedTask.titulo}</Text>
        <Text style={styles.subtitle}>{parsedTask.subtitulo}</Text>
        <Text style={styles.description}>{parsedTask.descricao}</Text>
        {parsedTask.tipo === "CALIGRAFIA" ? (
          <>
            <CameraScreenFiltered route={{ params: { filterWord: parsedTask.descricao } }} onCapture={handleCapture} />
            {resposta !== "" && (
              <>
                <TextInput
                  style={[styles.input, isError && { borderColor: 'red', borderWidth: 1 }]}
                  placeholder="Escreva sua resposta aqui"
                  value={resposta}
                  onChangeText={setResposta}
                  editable={!isCaptured} // Desabilita o campo de entrada se a resposta for capturada
                />
                {isError && <Text style={{ color: 'red', marginTop: 5 }}>Ops! Resposta incorreta, tente novamente.</Text>}
                <TouchableOpacity style={styles.button} onPress={handleSendResponse} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Enviar Resposta</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </View>
      <Text style={{ marginTop: 10 }}>Tentativas: {attemptCount}</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={isLoading}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}