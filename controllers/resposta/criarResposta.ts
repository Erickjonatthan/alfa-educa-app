import Answer from "@/context/Answer";

export const criarResposta = async (
    token: string,
    resposta: string,
    atividadeId: string,
    usuarioID: string
): Promise<Answer> => {
    try {
        const response = await fetch(
            "https://alfa-educa-server.onrender.com/resposta",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ resposta, atividadeId, usuarioID }),
            }
        );
        if (!response.ok) {
            let errorMessage = "Erro ao criar resposta";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }
        const respostaCriada: Answer = await response.json();
        return respostaCriada;
    } catch (error) {
        console.error("Erro ao criar resposta:", error);
        throw error;
    }
};