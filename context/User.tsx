export interface User {
  id?: string;
  nome: string;
  email: string;
  imgPerfil?: string;
  nivel?: number;
  pontos?: number;
  isAdmin?: boolean;
  senha?: string;
  conquistas?: string[]; // Adiciona a lista de conquistas
}

export default User;