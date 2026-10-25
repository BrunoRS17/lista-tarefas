import { apiRequest } from "../lib/api";
import type { TaskAPI, createTaskAPI } from "../types/task";


export const taskService = {
    
    //Listar todas as tarefas
    list: (signal?: AbortSignal) => apiRequest<TaskAPI[]>("/tasks", {signal}),

    //Criar uma tarefa
    create: (data: createTaskAPI) => apiRequest<TaskAPI>("/tasks", {
        method: "POST",
        body: JSON.stringify(data)
    }),

    //Deleta uma tarefa
    remove: (id: number) => apiRequest<TaskAPI>(`/tasks/${id}`, {
        method: "DELETE"
    })

}
