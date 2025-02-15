export interface Answer {
    id: string;
    resposta: string;
    atividadeId: string;
    usuarioId: string;
    finalizada: boolean;
    dataResposta: Date; //Data de criação da resposta
}
export default Answer;