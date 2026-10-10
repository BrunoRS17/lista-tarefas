const {z} = require("zod")

const createTaskSchema = z.object({

    task: z.string()
    .min(1, 'A tarefa é obrigatória')
    .max(200, 'a tarefa dever ter no máximo 200 caracteres'),

    due_date: z.iso.datetime({error: "Formato de data e hora inválido. Utilize o padrão ISO 8601"})
});


const updateTasksSchema = createTaskSchema.extend({
    completed: z.boolean()
}).partial()


const getTaskById = z.object({
    id: z.coerce.number().int().positive()
})

module.exports = {
    createTaskSchema,
    getTaskById,
    updateTasksSchema
}