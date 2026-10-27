import { useState, type SubmitEvent } from "react";
import { useTasks, useCreateTask } from "../hooks/useTasks";


export function TaskList(){
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<string>("")


    const {data: tasks = [], isPending, isError} = useTasks()
    const createTask = useCreateTask()




    //Criar uma tarefa
    function handleSubmit(event: SubmitEvent<HTMLFormElement>){
        event.preventDefault()

        const value = title.trim()

        if (!value) return alert("Por favor digite um nome para a tarefa");
        if (!date) return alert("Por favor selecione uma data de vencimento");

        //Alterando para o formato ISO 8601
        const isoDate = new Date(date.replace(/-/g, '/')).toISOString();

        createTask.mutate(
            {task: value, due_date: isoDate},
            {onSuccess: () => {
                setTitle("")
                setDate("")
            }}
        )
    }


    if (isPending){
        return <p>Carregando tarefas...</p>
    }
    if (isError) {
        return <p>Não foi possível carregar as tarefas</p>
    }


    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10 sm:p-6">

            <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:py-10">
                <section>

                    <header className="mb-8">
                        <h1 className="font-semibold text-3xl text-slate-900 tracking-tight">Minhas Tarefas</h1>
                        <p className="mt-2 text-sm text-slate-500">Organize suas tarefas e acompanhe prazos</p>
                    </header>

                    <form className="mb-5 flex flex-row items-center gap-3 w-full max-w-4xl" onSubmit={handleSubmit}>

                        <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <input className="w-8 h-8 bg-transparent cursor-pointer text-transparent select-none focus:outline-none [&::-webkit-datetime-edit]:hidden [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" value={date} type="date" onChange={(e) => setDate(e.target.value)}/>

                        <button className="p-2 bg-slate-50 rounded-2xl border border-slate-300 text-sm" type="submit" disabled={createTask.isPending}>{createTask.isPending ? "Salvando..." : "Adicionar"}</button>
                    </form>


                    {createTask.isError && (
                        <p>Não foi possível criar a tarefa</p>
                    )}


                    <ul>
                        {tasks.map((task) => (
                            <li className="flex items-center gap-3 bg-slate-100 mb-2 p-2 text-base rounded-lg" key={task.id}><input className="appearance-none h-5 w-5 accent-green-600 border checked:bg-green-600 checked:border-green-600 border-slate-400 cursor-pointer rounded-full checked:after:content-['✓'] checked:after:text-white checked:after:flex checked:after:items-center  checked:after:justify-center checked:after:text-xs" type="checkbox"/>{task.task}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    )
}