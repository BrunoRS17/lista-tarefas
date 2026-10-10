const taskService = require("../services/task")

class TaskController {
    

    //Criar uma task
    async create(req, res) {
        try {
            const {task, due_date} = req.body
            const new_task = await taskService.createTask({task, due_date})
            return res.status(201).json(new_task)

        } catch (error){
            return res.status(400).json({error: error.message})
        }
    }

    //mostrar todas as tasks
    async index(req, res){
        try {
            const tasks = await taskService.getAllTasks()
            return res.status(200).json(tasks)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    //Mostra somente uma tarefa pelo id
    async show(req, res) {
        try{
            const { id } = req.params
            const task = await taskService.getTaskById(id)
            return res.status(200).json(task)

        } catch (error) {
            
            if(error.message === 'Tarefa não encontrada'){
                return res.status(404).json({message: error.message})
            }

            return res.status(500).json({
                message: 'Erro ao consultar tarefa',
                error: error.message
            })
        }
    }

    //Atualiza a task
    async update(req, res){
        try{
            const task = await taskService.updateTask(req.params.id, req.body);
            return res.status(200).json(task)
        } catch (error){
            
            if(error.message === 'Tarefa não encontrada'){
                return res.status(404).json({message: error.message})
            }

            return res.status(500).json({
                message: 'Erro ao consultar tarefa',
                error: error.message
            })
        }
    }

    //Deleta uma task
    async destroy(req,res){
        try {

            const { id } = req.params
            await taskService.deleteTask(id)
            return res.status(200).json({message: "Tarefa excluída com sucesso"})

        } catch (error) {

            if (error.message === 'Tarefa não encontrada'){
                return res.status(404).json({message: error.message})
            }

            return res.status(500).json({
                message: 'Erro ao excluir a tarefa',
                error: error.message
            });
            
        }
    }


}

module.exports = new TaskController()