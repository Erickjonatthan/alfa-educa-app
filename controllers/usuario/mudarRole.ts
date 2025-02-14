export const mudarRole = async (userId: string, token: string): Promise<boolean> => {
    try {
        const response = await fetch(`https://alfa-educa-server.onrender.com/login/mudar-role/${userId}`, {
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