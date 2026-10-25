const API_URL = import.meta.env.VITE_API_URL;

//Verifica se tem API URL nas variáveis de ambiente
if (!API_URL){
    throw new Error("URL de API não configurado")
}

//Erro para indentificar o erro da API
export class ApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number){
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}


// T é o tipo esperado de resposta
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    
    const headers = new Headers(options.headers)
    if(typeof options.body == "string" && !headers.has("Content-Type")){
        headers.set("Content-Type", "application/json")
    }

    const url = `${API_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`; // o primeiro replace limpa as / que pode haver no final da url e o segundo do ínicio da url.


    //Realize a requisição
    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new ApiError(
            `Falha na requisição: HTTP ${response.status}`,
            response.status
        )
    }


    //Resposta sem corpo
    if (response.status == 204) {
        return undefined as T;
    }

    
    const contentType = response.headers.get("Content-Type");

    if (!contentType?.includes("application/json")) {
        throw new Error("Resposta inesperada da API")
    }

    return (await response.json()) as T;
}