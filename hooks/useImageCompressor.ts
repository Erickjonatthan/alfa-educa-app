import * as ImageManipulator from "expo-image-manipulator";

export const useImageCompressor = () => {
  const compressImage = async (uri: string, quality: number = 0.5): Promise<string> => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );
      return result.uri;
    } catch (error) {
      console.error("Erro ao comprimir a imagem:", error);
      throw error;
    }
  };

  return { compressImage };
};