import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import User from "@/context/User";

export const enviarImagem = async (base64Image: string | null, user: User | null, setUser: (user: User) => void, setImage: (image: string | null) => void, setTempImage: (image: string | null) => void, setBase64Image: (image: string | null) => void) => {
  if (base64Image) {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = user?.id;

      const response = await fetch(
        `https://alfa-educa-server.onrender.com/cadastro`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: userId,
            imgPerfil: base64Image,
          }),
        }
      );

      if (response.ok) {
        const updatedUser: User = {
          ...user,
          id: userId as string, // Garantir que id seja uma string
          nome: user?.nome || "", // Garantir que nome seja uma string
          email: user?.email || "", // Garantir que email seja uma string
          imgPerfil: `data:image/jpeg;base64,${base64Image}`,
        };
        setUser(updatedUser); // Atualiza o contexto do usuário
        setImage(`data:image/jpeg;base64,${base64Image}`); // Atualiza a imagem de perfil permanentemente
        setTempImage(null); // Limpa a imagem temporária
        setBase64Image(null); // Limpa a imagem base64
        Alert.alert("Sucesso", "Imagem enviada com sucesso!");
      } else {
        const errorData = await response.text();
        console.error("Erro ao enviar imagem:", errorData);
        Alert.alert("Erro", "Falha ao enviar imagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    }
  } else {
    Alert.alert("Erro", "Nenhuma imagem selecionada.");
  }
};