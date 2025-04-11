import { API_URL } from "@/constants/ApiUrl";

export const mudarRole = async (userId: string, token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/login/mudar-role/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Erro ao promover usuário a admin:', error);
        throw error;
    }
};