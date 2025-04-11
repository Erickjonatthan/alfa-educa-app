import Answer from "@/context/Answer";
import { API_URL } from "@/constants/ApiUrl";

export const listarResposta = async (
    token: string,
): Promise<any> => {
    try {
        const response = await fetch(
            `${API_URL}/resposta/usuario/respostas`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            let errorMessage = "Erro ao listar resposta";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }
        const respostas: Answer[] = await response.json();
        return respostas;
    } catch (error) {
        console.error("Erro ao listar resposta:", error);
        throw error;
    }
};