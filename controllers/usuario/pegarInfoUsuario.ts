export const pegarInfoUsuario = async (token: string, userId: string) => {
    try {
        const response = await fetch(
            `http://69.62.97.224:8081/cadastro/${userId}`,
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