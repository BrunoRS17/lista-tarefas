const taskRepository = require("../repository/task")


class TaskService {
    
    //Cria uma tarefa
    async createTask({task, due_date}){
        return await taskRepository.create({task, due_date})
    }

    //Busca todas as tarefas
    async getAllTasks(){
        return await taskRepository.findAll()
    }

    //Deleta uma tarefa
    async deleteTask(id){
        const task = await taskRepository.findUnique(id)
        
        if (!task){
            throw new Error('Tarefa não encontrada');
        }

        return await taskRepository.delete(id)
    }

}

module.exports = new TaskService()