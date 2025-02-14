export interface User {
  id?: string;
  nome: string;
  email: string;
  imgPerfil?: string;
  nivel?: number;
  pontos?: number;
  isAdmin?: boolean;
  senha?: string;
}

export default User;