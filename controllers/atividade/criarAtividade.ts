import Task from "@/context/Task";

export const criarAtividade = async (
    token: string,
    task: Task
): Promise<Task> => {
    try {
        const response = await fetch(
            "http://69.62.97.224:8081/atividade",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            }
        );
        if (!response.ok) {
            let errorMessage = "Erro ao criar atividade";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }
        const atividadeCriada: Task = await response.json();
        return atividadeCriada;
    } catch (error) {
        console.error("Erro ao criar atividade:", error);
        throw error;
    }
};