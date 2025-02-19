export interface Task {
    id?: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    nivel: number;
    pontos: number;
    tipo:string;
    respostaCorreta:string;
}
export default Task;