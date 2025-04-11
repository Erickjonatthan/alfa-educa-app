import { Achievement } from "@/context/Achievement";
import { API_URL } from "@/constants/ApiUrl";

export const listarTodasConquistas = async (token: string): Promise<Achievement[]> => {
    try {
        const response = await fetch(`${API_URL}/conquista`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            let errorMessage = "Erro ao listar conquistas do usuário";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }

        const conquistas: Achievement[] = await response.json();
        return conquistas;
    } catch (error) {
        console.error("Erro ao listar conquistas do usuário:", error);
        throw error;
    }
};