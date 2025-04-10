import { Achievement } from "@/context/Achievement";

export const criarConquista = async (token: string, conquista: Achievement): Promise<Achievement> => {
    try {
        const response = await fetch("http://69.62.97.224:8081/conquista", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(conquista),
        });

        if (!response.ok) {
            let errorMessage = "Erro ao criar conquista";
            if (response.status === 401) {
                errorMessage = "Não autorizado. Verifique suas credenciais.";
            } else if (response.status === 500) {
                errorMessage = "Erro no servidor. Tente novamente mais tarde.";
            }
            throw new Error(errorMessage);
        }

        const conquistaCriada: Achievement = await response.json();
        return conquistaCriada;
    } catch (error) {
        console.error("Erro ao criar conquista:", error);
        throw error;
    }
};