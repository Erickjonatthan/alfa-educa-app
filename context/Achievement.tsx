export interface Achievement {
    id?: string;
    titulo: string;
    descricao: string;
    imgConquista: string | null;
    nivelRequerido: number | null;
    pontosRequeridos: number | null;
    atividadesRequeridas: number | null;
    primeiraRespostaCorreta: boolean | null;
    diasConsecutivosRequeridos: number | null;
}
export default Achievement;