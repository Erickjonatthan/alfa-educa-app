import Task from "@/context/Task";

export type NewTask = Omit<Task, 'id'> & {
    respostaCorreta: string;
};