const prisma = require("../lib/prisma")

class TaskRepository {

    //Cria uma nova tarefa
    async create(data){
        return await prisma.task.create({
            data
        })
    }

    //Retorna todos os registros 
    async findAll(){
     return await prisma.task.findMany()   
    }

    //Retorna um único registro
    async findUnique(id){
        return await prisma.task.findUnique({
            where: { id }
        })
    }

    //Deleta uma task do database
    async delete(id){
        return await prisma.task.delete({
            where: { id }
        });
    }

    //Atualizar uma tarefa
    async update(id, data){
        return await prisma.task.update({
            where: { id: id },
            data
        })
    }
}

module.exports = new TaskRepository()