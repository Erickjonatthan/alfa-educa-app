import Answer from "@/context/Answer";
import { API_URL } from "@/constants/ApiUrl";

export const criarResposta = async (
    token: string,
    resposta: string,
    atividadeId: string,
    usuarioId: string
): Promise<Answer> => {
    try {
        console.log("Iniciando a criação da resposta...");
        console.log("Token:", token);
        console.log("Resposta:", resposta);
        console.log("Atividade ID:", atividadeId);
        console.log("Usuário ID:", usuarioId);

        const response = await fetch(
            `${API_URL}/resposta`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ resposta, atividadeId, usuarioId }),
            }
        );

        console.log("Resposta do servidor recebida:", response);

        if (!response.ok) {
            let errorMessage = "Erro ao criar resposta";
            if (response.status === 400) {
                const errorResponse = await response.json();
                errorMessage = `Erro na requisição: ${errorResponse.message}`;
                console.error("Erro na resposta do servidor:", response.status, response.statusText, errorResponse);
            } else if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            } else {
                console.error("Erro na resposta do servidor:", response.status, response.statusText);
            }
            throw new Error(errorMessage);
        }

        const respostaCriada: Answer = await response.json();
        console.log("Resposta criada com sucesso:", respostaCriada);
        return respostaCriada;
    } catch (error) {
        console.error("Erro ao criar resposta:", error);
        throw error;
    }
};