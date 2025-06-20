import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { listarAtividades } from '@/controllers/atividade/listarAtividades';
import { listarResposta } from '@/controllers/resposta/listarResposta';
import Task from '@/context/Task';
import Answer from '@/context/Answer';
import TaskModal from '@/components/TaskModal';
import styles from '../styles/tasks';

export default function TasksScreen() {
  const [atividades, setAtividades] = useState<Task[]>([]);
  const [respostas, setRespostas] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const fetchAtividades = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const [data, respostasData] = await Promise.all([
          listarAtividades(token),
          listarResposta(token),
        ]);
        setAtividades(data);
        setRespostas(respostasData);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
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
    if (selectedTask && selectedTask.id && !isTaskFinalizada(selectedTask.id)) {
      closeModal();
      router.push({
        pathname: '/task-page/task',
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
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        isDarkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/alfaeduca-lateral.png')}
          style={styles.logoImage}
        />
        <ThemedText type="title" style={styles.welcomeMessage}>
          Atividades
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Aqui você encontra todas as atividades disponíveis para você.
        </ThemedText>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#FFFFFF' : '#0000ff'}
          style={styles.loadingContainer}
        />
      ) : (
        <View style={styles.tasksContainer}>
          {atividades.map((item) => {
            const finalizada = item.id ? isTaskFinalizada(item.id) : false;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.taskContainer,
                  finalizada && styles.taskContainerFinalizada,
                ]}
                onPress={() => openModal(item)}
              >
                <ThemedText style={styles.taskTitle}>{item.titulo}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <TaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={closeModal}
        onPlay={handlePlay}
        isFinalizada={
          selectedTask && selectedTask.id ? isTaskFinalizada(selectedTask.id) : false
        }
      />
    </ScrollView>
  );
}