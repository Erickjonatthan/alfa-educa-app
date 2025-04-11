import User from "@/context/User";
import { API_URL } from "@/constants/ApiUrl";

export const listarTodosUsuarios = async (token: string): Promise<User[]> => {
  try {
  const response = await fetch(`${API_URL}/cadastro`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao listar todos os usuários');
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao listar todos os usuários:', error);
    throw error;
  }
};