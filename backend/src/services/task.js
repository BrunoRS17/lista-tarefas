const { da } = require("zod/locales")
const taskRepository = require("../repository/task")


class TaskService {
    

    //metodo privado para encontrar ou falhar um tarefa
    async #findOrFail(id){
        const task = await taskRepository.findUnique(id)
        if(!task){
            throw new Error('Tarefa não encontrada')
        }
        return task

    }


    //Cria uma tarefa
    async createTask({task, due_date}){
        return await taskRepository.create({task, due_date})
    }

    //Busca todas as tarefas
    async getAllTasks(){
        return await taskRepository.findAll()
    }

    //busca única por id
    async getTaskById(id){
        return this.#findOrFail(id)

    }

    //Atualiza uma tarefa
    async updateTask(id, data){
        await this.#findOrFail(id)
        return await taskRepository.update(id, data)
    }

    //Deleta uma tarefa
    async deleteTask(id){
        await this.#findOrFail(id)
        return await taskRepository.delete(id)
    }

}

module.exports = new TaskService()