const express = require("express")
const prisma = require("../lib/prisma")

const validate = require("../middleware/validate.middleware")

const { createTaskSchema, getTaskById, updateTasksSchema } = require("../schemas/task")
const TaskController = require("../controller/task")

const router = express.Router();

//Criar uma tarefa
router.post('/tasks', validate(createTaskSchema), (req, res) => TaskController.create(req, res));

//Leitura das tasks
router.get('/tasks', (req, res) => TaskController.index(req, res));

//Leitura de uma tarefa filtrada pelo id
router.get('/tasks/:id', validate(getTaskById, 'params'), (req, res) => TaskController.show(req,res));

//Atualizar uma tarefa
router.patch('/tasks/:id', validate(getTaskById, 'params'), validate(updateTasksSchema, 'body'), (req, res) => TaskController.update(req,res))

//Deletar uma tarefa
router.delete("/tasks/:id", validate(getTaskById, 'params'), (req, res) => TaskController.destroy(req, res));



module.exports = router