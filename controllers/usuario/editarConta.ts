import User from "@/context/User";
import { API_URL } from "@/constants/ApiUrl";

export const editarConta = async (token: string, user: User) => {
  try {
    const payload = JSON.stringify(user);
    console.log("Tamanho do payload:", payload.length, "bytes");

    const response = await fetch(
      `${API_URL}/cadastro`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: payload,
      }
    );

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`Erro ao editar conta: ${response.status} - ${responseText}`);
    }

    return response;
  } catch (error) {
    console.error("Erro ao editar conta:", error);
  }
};
