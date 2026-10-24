import type { Task } from "../types/task";

type TaskItemProps = {
    task: Task
}

export default function TaskItem({task}: TaskItemProps) {
    return (
        <li className={`flex flex-col gap-3 rounded-lg border bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between ${ task.completed
            ? "border-green-300" : "border-slate-200"
        }`}>
            
            <label className="flex min-w-0 item-center gap-3 ">
            
            <input 
            type="checkbox" 
            checked={task.completed} 
            readOnly
            className="h-4 w-4 shrink-0 accent-green-600"
            />

            <span className={`break-words text-sm ${ task.completed ? "text-green-600 line-through": "text-slate-500"}`}>{task.title}</span>
            </label>

            <div className="flex gap-2 sm:shrink-0">
            <button type="button" disabled className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">Editar</button>
            <button type="button" disabled className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 disabled:cursor-not-allowed disabled:opacity-50">Excluir</button>
            </div>
        </li>
    );
}