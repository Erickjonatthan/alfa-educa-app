import User from "@/context/User";

export const listarTodosUsuarios = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch('https://alfa-educa-server.onrender.com/cadastro', {
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