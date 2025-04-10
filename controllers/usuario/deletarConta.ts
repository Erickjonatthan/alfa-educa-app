export const deletarConta = async (id: string, token: string) => {
  try {
    const response = await fetch(
      `http://69.62.97.224:8081/cadastro/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Erro ao deletar conta";
      if (response.status === 401) {
        errorMessage = "Não autorizado. Verifique suas credenciais.";
      } else if (response.status === 404) {
        errorMessage = "Usuário não encontrado.";
      } else if (response.status === 500) {
        errorMessage = "Erro no servidor. Tente novamente mais tarde.";
      }
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    throw error;
  }
};