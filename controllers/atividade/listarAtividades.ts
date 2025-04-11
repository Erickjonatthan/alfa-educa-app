import Task from "@/context/Task";
import { API_URL } from "@/constants/ApiUrl";

export const listarAtividades = async (token: string): Promise<Task[]> => {
    try {
        const response = await fetch(
            `${API_URL}/atividade`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            let errorMessage = "Erro ao listar atividades";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }
        const atividades: Task[] = await response.json();
        return atividades;
    } catch (error) {
        console.error("Erro ao listar atividades:", error);
        throw error;
    }
};