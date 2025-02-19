import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editarConta } from "@/controllers/usuario/editarConta";
import { deletarConta } from "@/controllers/usuario/deletarConta";
import User from "@/context/User";
import styles from "../styles/edit-profile";
import { useUser } from "@/context/UserContext";
import { useEmailValidation } from "@/hooks/useEmailValidation";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { validateEmail } = useEmailValidation();
  const [nome, setNome] = useState<string>(user?.nome.trim() ?? "");
  const [email, setEmail] = useState<string>(user?.email.trim() ?? "");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [tempImage, setTempImage] = useState<string | null>(user?.imgPerfil ?? null);
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditingNome, setIsEditingNome] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingSenha, setIsEditingSenha] = useState<boolean>(false);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const originalNome = user?.nome.trim() ?? "";
    const originalEmail = user?.email.trim() ?? "";
    const originalImage = user?.imgPerfil ?? null;

    if (
      nome.trim() !== originalNome ||
      email.trim() !== originalEmail ||
      senha.trim() !== "" ||
      tempImage !== originalImage
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [nome, email, senha, tempImage, user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setTempImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 ?? undefined);
    } else {
      Alert.alert("Aviso", "Nenhuma imagem foi selecionada.");
    }
  };

  const handleSaveChanges = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }
    const id = user.id;
    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    // Remove espaços desnecessários
    const trimmedNome = nome.trim();
    const trimmedEmail = email.trim();
    const trimmedSenha = senha.trim();
    const trimmedConfirmarSenha = confirmarSenha.trim();

    if (trimmedSenha !== trimmedConfirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      Alert.alert("Erro", "Email inválido.");
      return;
    }

    const updatedUser: User = {
      id,
      nome: trimmedNome,
      email: trimmedEmail,
      imgPerfil: base64Image,
    };

    if (trimmedSenha !== "") {
      updatedUser.senha = trimmedSenha;
    }

    setIsLoading(true);
    try {
      const response = await editarConta(token, updatedUser);
      if (response && response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        setUser(updatedUser);
        router.push("/pages/profile");
      } else {
        Alert.alert("Erro", "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro ao editar conta:", error);
      Alert.alert("Erro", "Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const token = await AsyncStorage.getItem("token");
            if (!user) {
              Alert.alert("Erro", "Usuário não encontrado.");
              return;
            }
            const id = user.id;
            if (!id) {
              Alert.alert("Erro", "ID do usuário não encontrado.");
              return;
            }
            if (!token) {
              Alert.alert("Erro", "Usuário não autenticado.");
              return;
            }

            setIsLoading(true);
            try {
              const response = await deletarConta(id, token);
              if (response && response.ok) {
                Alert.alert("Sucesso", "Conta excluída com sucesso!");
                await AsyncStorage.clear();
                router.push("/");
              } else {
                Alert.alert("Erro", "Erro ao excluir conta.");
              }
            } catch (error) {
              console.error("Erro ao excluir conta:", error);
              Alert.alert("Erro", "Erro ao excluir conta.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Altere seus dados</Text>
      <Text style={styles.subtitle}>
        Preencha os campos abaixo para alterar suas informações
      </Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome:</Text>
        {isEditingNome ? (
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        ) : (
          <Text style={styles.fieldValue}>{nome}</Text>
        )}
        <TouchableOpacity onPress={() => setIsEditingNome(!isEditingNome)}>
          <Text style={styles.editButton}>
            {isEditingNome ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditingEmail ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.fieldValue}>{email}</Text>
        )}
        <TouchableOpacity onPress={() => setIsEditingEmail(!isEditingEmail)}>
          <Text style={styles.editButton}>
            {isEditingEmail ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Senha:</Text>
        {isEditingSenha ? (
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        ) : (
          <Text style={styles.fieldValue}>********</Text>
        )}
        <TouchableOpacity onPress={() => setIsEditingSenha(!isEditingSenha)}>
          <Text style={styles.editButton}>
            {isEditingSenha ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>
      {isEditingSenha && (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirme a Senha: </Text>
          <TextInput
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
      )}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Imagem:</Text>
        {isEditingImage ? (
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecionar Imagem</Text>
          </TouchableOpacity>
        ) : (
          tempImage && (
            <Image source={{ uri: tempImage }} style={styles.image} />
          )
        )}
        <TouchableOpacity onPress={() => setIsEditingImage(!isEditingImage)}>
          <Text style={styles.editButton}>
            {isEditingImage ? "Salvar" : "Editar"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveChanges}
        disabled={isLoading || !hasChanges}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Excluir Conta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}