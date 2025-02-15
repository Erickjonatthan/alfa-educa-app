import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Task from "@/context/Task";
import styles from "@/app/styles/tasks";

interface TaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onPlay: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, task, onClose, onPlay }) => {
  if (!task) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText type="title" style={styles.createTaskTitle} >{task.titulo}</ThemedText>
          <ThemedText type="subtitle" style={styles.createTaskSubtitle}>{task.subtitulo}</ThemedText>
          <ThemedText style={styles.adminText}>Nível: {task.nivel}</ThemedText>
          <ThemedText style={styles.adminText}>Pontos: {task.pontos}</ThemedText>
          <TouchableOpacity style={styles.button} onPress={onPlay}>
                <Text style={styles.buttonText}>Iniciar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText} >Fechar</Text>
              </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;