import { CameraCapturedPicture } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const extractText = async (photo: CameraCapturedPicture, setLoading: (loading: boolean) => void, setExtractedText: (text: string | null) => void, setSyllabifiedText: (text: string | null) => void) => {
  setLoading(true);
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.error("Token não encontrado");
    return;
  }

  try {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
        // ...existing code...
    reader.onloadend = async () => {
      const base64data = reader.result?.toString().split(',')[1];
    
      // Enviar a imagem codificada em base64 para o backend
      console.log("Enviando imagem para o backend...");
      const response = await fetch("https://alfa-educa-server.onrender.com/extrair-texto", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64data }),
      });
    
      const responseText = await response.text();
      console.log("Response text:", responseText); // Adicionando log para verificar o conteúdo da resposta
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${responseText}`);
      }
    
      const data = JSON.parse(responseText);
      console.log("Parsed data:", data); // Adicionando log para verificar os dados analisados
    
      // Verificar se a resposta contém {"texto":"|","textoSilabado":""}
      if (data.textoSilabado === "") {
        data.texto = "erro";
        data.textoSilabado = "erro";
      }
    
      // Limitar o texto extraído e silabado a no máximo 5 palavras
      const limitWords = (text: string, maxWords: number) => {
        const words = text.split(' ');
        return words.slice(0, maxWords).join(' ');
      };
    
      const limitedExtractedText = limitWords(data.texto, 5);
      const limitedSyllabifiedText = limitWords(data.textoSilabado, 5);
    
      setExtractedText(limitedExtractedText);
      setSyllabifiedText(limitedSyllabifiedText);
    };
    // ...existing code...
  } catch (error) {
    console.error("Erro ao extrair texto:", error);
  } finally {
    console.log("Extração de texto finalizada");
  }
};