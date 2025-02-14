import User from "@/context/User";

export const editarConta = async (token: string, user: User) => {
  try {
    const response = await fetch(
      `https://alfa-educa-server.onrender.com/cadastro`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao editar conta");
    }

    return response;
  } catch (error) {
    console.error("Erro ao editar conta:", error);
  }
};
