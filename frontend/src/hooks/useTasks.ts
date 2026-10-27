import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";


//Consulta a lista
export function useTasks(){
    return useQuery({
        queryKey: ["tasks"],
        queryFn: ({signal}) => taskService.list(signal)
    })
}

//Cria uma tarefa
export function useCreateTask(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: taskService.create,
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })

}