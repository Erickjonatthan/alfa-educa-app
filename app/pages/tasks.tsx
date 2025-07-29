import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import Task from '@/context/Task';
import TaskModal from '@/components/TaskModal';
import styles from '../styles/tasks';
import useFetchTasks from '@/hooks/useFetchTasks';
import TaskList from '@/components/TaskList';

export default function TasksScreen() {
  const { atividades, respostas, isLoading, fetchAtividades } = useFetchTasks();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

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
        <TaskList
          tasks={atividades}
          isTaskFinalizada={isTaskFinalizada}
          openModal={openModal}
        />
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