import Task from "@/context/Task";

export type newTask = Omit<Task, 'id'> & {
    respostaCorreta: string;
};