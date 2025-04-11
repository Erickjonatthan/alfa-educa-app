import { API_URL } from "@/constants/ApiUrl";

export const pegarInfoUsuario = async (token: string, userId: string) => {
    try {
        const response = await fetch(
            `${API_URL}/cadastro/${userId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            console.error('Erro ao carregar dados do usuário.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        return null;
    }
};