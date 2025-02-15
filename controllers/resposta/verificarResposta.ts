export const verificarResposta = async (
    token: string,
    respostaId: string
): Promise<any> => {
    try {
        const response = await fetch(
            `https://alfa-educa-server.onrender.com/resposta/verificar/${respostaId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            let errorMessage = "Erro ao verificar resposta";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }
        const respostaCriada = await response.json();
        return respostaCriada.isFinalizada;
    } catch (error) {
        console.error("Erro ao verificar resposta:", error);
        throw error;
    }
};