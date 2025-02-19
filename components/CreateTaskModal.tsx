import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import styles from "@/app/styles/manage-tasks";
import Task from "@/context/Task";

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: () => Promise<void>;
  newTask: Partial<Task>;
  setNewTask: React.Dispatch<React.SetStateAction<Partial<Task>>>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onCreate,
  newTask,
  setNewTask,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (
      !newTask.titulo ||
      !newTask.subtitulo ||
      !newTask.descricao ||
      newTask.nivel === undefined ||
      newTask.pontos === undefined ||
      !newTask.respostaCorreta ||
      !newTask.tipo
    ) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    setIsCreating(true);
    await onCreate();
    setIsCreating(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText type="title" style={styles.createTaskTitle}>
            Criar Nova Atividade
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={newTask.titulo}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, titulo: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Subtítulo"
            value={newTask.subtitulo}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, subtitulo: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={newTask.descricao}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, descricao: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nível"
            value={newTask.nivel?.toString()}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, nivel: parseInt(text) }))
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Pontos"
            value={newTask.pontos?.toString()}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, pontos: parseInt(text) }))
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Resposta Correta"
            value={newTask.respostaCorreta}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, respostaCorreta: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo"
            value={newTask.tipo}
            onChangeText={(text) =>
              setNewTask((prev) => ({ ...prev, tipo: text }))
            }
          />
          {isCreating ? (
            <ActivityIndicator size="large" color="#5D0052FF" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Criar Atividade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
