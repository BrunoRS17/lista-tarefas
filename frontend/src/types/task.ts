
//EXLUIR DEPOIS
export type Task = {
    id: number;
    title: string,
    completed: boolean;
}


//Definição das prioridades
export const Priority = {
    Low: "LOW",
    Medium: "MEDIUM",
    High: "HIGH",
    Urgent: "URGENT"
} as const

//Pegando o tipo dos valores do objetos
export type PriorityType = typeof Priority[keyof typeof Priority]


//Retorno de uma tarefa
export interface TaskAPI {
    id: number;
    task: string;
    due_date: string;
    completed: boolean;
    priority: string;
    estimated_duration_minutes: number;
    createdAt: string;
}

//Criar uma tarefa
export interface createTaskAPI {
    task: string;
    due_date: string;
    priority?: PriorityType;
    estimated_duration_minutes?: number;
}