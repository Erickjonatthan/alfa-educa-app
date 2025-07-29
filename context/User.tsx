export interface User {
  id?: string;
  nome: string;
  email: string;
  imgPerfil?: string;
  isAdmin?: boolean;
  senha?: string;
}

export default User;