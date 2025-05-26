import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  useColorScheme,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { listarTodosUsuarios } from "@/controllers/usuario/listarTodosUsuarios";
import User from "@/context/User";
import { deletarConta } from "@/controllers/usuario/deletarConta";
import { editarConta } from "@/controllers/usuario/editarConta";
import styles from "../styles/users";
import { ThemedView } from "@/components/ThemedView";
import { mudarRole } from "@/controllers/usuario/mudarRole";
import { useFocusEffect } from "expo-router";

export default function UsersScreen() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const fetchUsuarios = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (token) {
        const data = await listarTodosUsuarios(token);
        const sortedData = data.sort((a, b) => (a.id === userId ? -1 : b.id === userId ? 1 : 0));
        setUsuarios(sortedData);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      setCurrentUserId(userId);
    } catch (error) {
      console.error("Erro ao buscar ID do usuário:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsuarios();
      fetchCurrentUserId();
    }, [])
  );

  const handleDeleteUser = async (userId: string) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja excluir este usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (token) {
                await deletarConta(userId, token);
                await fetchUsuarios(); // Recarrega a lista de usuários após deletar
              }
            } catch (error) {
              console.error("Erro ao excluir usuário:", error);
            }
          },
        },
      ]
    );
  };
  const handleEditUser = (user: User) => {
    setEditingUserId(user.id ?? null);
    setEditedUser(user);
  };

  const handleCancelEdit = () => {
    const originalUser = usuarios.find((user) => user.id === editingUserId);
    const hasChanges =
      originalUser &&
      (originalUser.nome !== editedUser.nome ||
        originalUser.email !== editedUser.email);

    if (hasChanges) {
      Alert.alert(
        "Confirmação",
        "Tem certeza de que deseja descartar as alterações?",
        [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => {
              setEditingUserId(null);
              setEditedUser({});
            },
          },
        ]
      );
    } else {
      setEditingUserId(null);
      setEditedUser({});
    }
  };

  const handleSaveEdit = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja salvar as alterações?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Salvar",
          onPress: async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
              await editarConta(token, editedUser as User);
            }
            setEditingUserId(null);
            setEditedUser({});
            await fetchUsuarios(); // Recarrega a lista de usuários após salvar
          },
        },
      ]
    );
  };

  const handlePromoteUser = async (userId: string) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja promover este usuário a administrador?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Promover",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (token) {
                const result = await mudarRole(userId, token);
                if (!result) {
                  Alert.alert("Falha", "Usuário já é um administrador.");
                } else {
                  await fetchUsuarios();
                }
              }
            } catch (error) {
              Alert.alert(
                "Erro",
                "Ocorreu um erro ao tentar promover o usuário."
              );
            }
          },
        },
      ]
    );
  };

  const handleRevokeAdmin = async (userId: string) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja revogar o status de administrador deste usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Revogar",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (token) {
                await mudarRole(userId, token);
                await fetchUsuarios(); // Recarrega a lista de usuários após revogar
              }
            } catch (error) {
              Alert.alert(
                "Erro",
                "Ocorreu um erro ao tentar revogar o status de administrador."
              );
            }
          },
        },
      ]
    );
  };

  const handleRemovePhoto = () => {
    setEditedUser((prev) => ({ ...prev, imgPerfil: "" }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/alfaeduca-lateral.png")}
            style={styles.logoImage}
          />
        </View>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.welcomeMessage}>
            Usuários cadastrados no sistema
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Gerencie os usuários do AlfaEduca.
          </ThemedText>
        </ThemedView>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#FFFFFFFF"
            style={styles.loadingContainer}
          />
        ) : (
          <>
            {usuarios.map((item) => (
              <View key={item.id} style={styles.userContainer}>
                <Image
                  source={
                    item.imgPerfil
                      ? { uri: `data:image/png;base64,${item.imgPerfil}` }
                      : require("@/assets/images/default-profile.png")
                  }
                  style={styles.profileImage}
                />
                <View style={styles.userInfoContainer}>
                  {editingUserId === item.id ? (
                    <>
                      <TextInput
                        style={styles.input}
                        value={editedUser.nome}
                        onChangeText={(text) =>
                          setEditedUser((prev) => ({ ...prev, nome: text }))
                        }
                      />
                      <TextInput
                        style={styles.input}
                        value={editedUser.email}
                        onChangeText={(text) =>
                          setEditedUser((prev) => ({ ...prev, email: text }))
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Nova senha"
                        secureTextEntry
                        onChangeText={(text) =>
                          setEditedUser((prev) => ({ ...prev, senha: text }))
                        }
                      />
                      {editedUser.imgPerfil && (
                        <TouchableOpacity
                          onPress={handleRemovePhoto}
                          style={styles.button}
                        >
                          <Text style={styles.buttonText}>Remover Foto</Text>
                        </TouchableOpacity>
                      )}
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          onPress={handleCancelEdit}
                          style={[
                            styles.button,
                            { backgroundColor: "#C02401FF" },
                          ]}
                        >
                          <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleSaveEdit}
                          style={[
                            styles.button,
                            { backgroundColor: "#00A849FF" },
                          ]}
                        >
                          <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <ThemedText
                        style={item.isAdmin ? styles.adminText : null}
                      >
                        {item.nome} {item.id === currentUserId ? "(você)" : ""}
                      </ThemedText>
                      <ThemedText>{item.email}</ThemedText>
                      <ThemedText>Nível: {item.nivel}</ThemedText>
                      <ThemedText>Pontos: {item.pontos}</ThemedText>
                      <View style={styles.buttonContainer}>
                        {item.id !== currentUserId && (
                          <>
                            {!item.isAdmin ? (
                              <TouchableOpacity
                                onPress={() => handlePromoteUser(item.id ?? "")}
                                style={[
                                  styles.button,
                                  { 
                                    backgroundColor: "#00A849FF",
                                    minWidth: 90,
                                    paddingHorizontal: 8
                                  },
                                ]}
                              >
                                <Text style={styles.buttonText}>Promover</Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => handleRevokeAdmin(item.id ?? "")}
                                style={[
                                  styles.button,
                                  { 
                                    backgroundColor: "#FF7B00FF",
                                    minWidth: 90,
                                    paddingHorizontal: 8
                                  },
                                ]}
                              >
                                <Text style={styles.buttonText}>Revogar</Text>
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity
                              onPress={() => handleEditUser(item)}
                              style={[
                                styles.button,
                                { 
                                  backgroundColor: "#004B7DFF",
                                  minWidth: 90,
                                  paddingHorizontal: 8
                                },
                              ]}
                            >
                              <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleDeleteUser(item.id ?? "")}
                              style={[
                                styles.button,
                                { 
                                  backgroundColor: "#C02401FF",
                                  minWidth: 90,
                                  paddingHorizontal: 8
                                },
                              ]}
                            >
                              <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}
