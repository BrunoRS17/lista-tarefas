import type { Task } from "./types/task";
import  TaskItem  from "./components/TaskItem";


const initialTasks: Task[] = [
  {id: 1, title: "Aprender React", completed: false},
  {id: 2, title: "Estudar TypeScript", completed: true},
  {id: 3, title:"Aprender componentes", completed: false}
]


function App(){
  return (
    <main className="min-h-screen bg-slate-200 px-4 py-10">

      <div className="mx-auto max-w-2xl">

        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 ">Minha lista de tarefas</h1>
          <p className="mt-2 text-slate-500">Organize suas atividades e acompanhe seu progresso</p>
        </header>

      
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Adicionar tarefa</h2>


          <div className="flex flex-col gap-3 sm:flex-row">
            <input 
            type="text" aria-label="Titulo da nova tarefa" 
            placeholder="Digite uma tarefa"
            className="w-full flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            />
            
            <button type="button"
             disabled 
             className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
             >
              Adicionar
            </button>
          </div>

        </section>



        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-500">Minhas Tarefas</h2>

          <ul className="space-y-3">
            {initialTasks.map((task) => (
              <TaskItem key={task.id} task={task}/>
            ))}
          </ul>

        </section>

      </div>
    </main>
  )
}

export default App;