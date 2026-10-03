const express = require("express")
const prisma = require("../lib/prisma")

const router = express.Router();


router.post("/tasks", async (req, res) => {
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

module.exports = router