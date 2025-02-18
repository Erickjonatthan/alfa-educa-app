import React, { useState } from "react";
import {
  View,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import styles from "@/app/styles/manage-tasks";

interface CreateAchievementModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (achievement: {
    titulo: string;
    descricao: string;
    imgConquista: string;
  }) => Promise<void>;
}

const CreateAchievementModal: React.FC<CreateAchievementModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [achievement, setAchievement] = useState({
    titulo: "",
    descricao: "",
    imgConquista: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!achievement.titulo || !achievement.descricao || !base64Image) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    setIsCreating(true);
    await onCreate({ ...achievement, imgConquista: base64Image });
    setIsCreating(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true, // Ativa o Base64 para facilitar o envio
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setTempImage(result.assets[0].uri); // Configura a imagem temporária para exibição
      setBase64Image(result.assets[0].base64 ?? null); // Configura a imagem em Base64
    } else {
      Alert.alert("Aviso", "Nenhuma imagem foi selecionada.");
    }
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
            Adicionar Conquista
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={achievement.titulo}
            onChangeText={(text) =>
              setAchievement((prev) => ({ ...prev, titulo: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={achievement.descricao}
            onChangeText={(text) =>
              setAchievement((prev) => ({ ...prev, descricao: text }))
            }
          />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecionar Imagem</Text>
          </TouchableOpacity>
          {tempImage && (
            <Image source={{ uri: tempImage }} style={styles.imagePreview} />
          )}
          {isCreating ? (
            <ActivityIndicator size="large" color="#5D0052FF" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Criar Conquista</Text>
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

export default CreateAchievementModal;
