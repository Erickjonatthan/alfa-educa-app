import { API_URL } from "@/constants/ApiUrl";
export const desbloquearConquistasUsuario = async (token: string, userId: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/conquista/desbloquear/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            let errorMessage = "Erro ao desbloquear conquistas para o usuário";
            if (response.status === 403) {
                errorMessage = "Acesso proibido. Você não tem permissão para acessar este recurso.";
            } else if (response.status === 404) {
                errorMessage = "Usuário não encontrado.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }

        // Se a resposta for 200 OK, as conquistas foram desbloqueadas com sucesso
        console.log("Conquistas desbloqueadas com sucesso para o usuário");
    } catch (error) {
        console.error("Erro ao desbloquear conquistas para o usuário:", error);
        throw error;
    }
};