export const adicionarConquistaUsuario = async (token: string, userId: string, conquistaId: string): Promise<void> => {
    try {
        const response = await fetch(`https://alfa-educa-server.onrender.com/conquista/adicionar-ao-usuario/${userId}/${conquistaId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            let errorMessage = "Erro ao adicionar conquista ao usuário";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }

        // Se a resposta for 200 OK, a conquista foi adicionada com sucesso
        console.log("Conquista adicionada com sucesso");
    } catch (error) {
        console.error("Erro ao adicionar conquista ao usuário:", error);
        throw error;
    }
};