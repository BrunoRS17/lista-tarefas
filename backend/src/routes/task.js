const express = require("express")
const prisma = require("../lib/prisma")

const validate = require("../middleware/validate.middleware")

const { createTaskSchema } = require("../schemas/task")

const router = express.Router();

//Criar uma tarefa
router.post("/tasks", validate(createTaskSchema), async (req, res) => {
    const {task, due_date} = req.body;

    const tasks = await prisma.task.create({
        data:{
            task,
            due_date: new Date(due_date)
        }
    });

    res.status(200).json(tasks)
});


//Leitura das tasks
router.get("/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks)
    
});


//Deletar uma tarefa
router.delete("/tasks/:id", async (req, res) => {
    
    try{
        const { id } = req.params

        const task = await prisma.task.findUnique({
            where: {id: Number(id)}
        })

        if (!task){
            return res.status(404).json({message: "Tarefa não econtrada"})
        }

        await prisma.task.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Tarefa excluída com sucesso"})
    }
    catch (error) {
        return res.status(500).json({
            message: "Erro ao excluir tarefa",
            error: error.message
        })
    }
});


module.exports = router