export const pegarInfoUsuario = async (token: string, userId: string) => {
    try {
        const response = await fetch(
            `https://alfa-educa-server.onrender.com/cadastro/${userId}`,
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